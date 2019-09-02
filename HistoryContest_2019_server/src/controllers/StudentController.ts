import {Controller,Ctx,Get,Post, UseBefore} from "routing-controllers"
import * as jwt from "jsonwebtoken"
import {Key} from "../utils/keys"
//import entities
import {Student} from "../entity/Student"
import { Context } from "koa";
//import utils
import {RandomArr}from "../utils/RandomArray"
import * as verify from "../config/Verify"
import { Department } from "../entity/Department";
const redis =require("../config/redis")
let choices=require("../Data/choice_question.json")
let judgements=require("../Data/judgment_question.json")
@Controller("/student")
export class StudentController{

/**
 * @method Get
 * @access student
 * 获取试卷
 * 后端判断是否已有得分,无则返回题目的序号
 * 200:successful 403:已有得分
 */

    @UseBefore(verify.verifyToken_Student,verify.verifyToken_Username)
    @Get("/test")
    async test( @Ctx() ctx:Context){
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        let student:Student=eval(`(${await redis.get(`student:${data.username}`)})`)
        if(!student){
            student=(await Student.findOne({username:data.username}));
            redis.set(`student:${data.username}`,JSON.stringify(student))
        }
        if(student.score==-1){
        //生成两个随机数组，应用为选择题和判断题的序号
        const choice_id:number[]=await RandomArr(20,20)
        const judgment_id:number[]=await RandomArr(10,10)
        student.answers_choice=[]
        student.answers_judgment=[]
        choice_id.forEach(async element => {
            student.answers_choice.push(choices.RECORDS[element-1].answer)
        });
        judgment_id.forEach(async element => {
            student.answers_judgment.push(judgements.RECORDS[element-1].answer)
        });
        student.choice_question=choice_id;
        student.judgment_question=judgment_id;
        ctx.status=200;
        //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
        ctx.body={Paper:{Choice_question:choice_id,Judgment_question:judgment_id}}
        await Student.update(student.id,student)
        redis.set(`student:${data.username}`,JSON.stringify(student))}//更新用户数据
        else{ctx.status=403}
        return ctx;
    }

/**
 * @method Get
 * @access student
 * 开始答题
 */

    @UseBefore(verify.verifyToken_Student,verify.verifyToken_Score)
    @Get("/start")
    async start(@Ctx() ctx:Context){
        let date=new Date()
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        let student:Student=eval(`(${await redis.get(`student:${data.username}`)})`)
        if(!student){
            student=(await Student.findOne({username:data.username}));
            await redis.set(`student:${data.username}`,JSON.stringify(student))
        }
        student.time_use=(date.getTime()-1560000000000)/1000;
        student.time_start=new Date;
        Student.update(student.id,student);
        redis.set(`student:${data.username}`,JSON.stringify(student),(err)=>{console.log(err)})
        ctx.body={msg:"start testing"}
        return ctx;
    }

/**
 * @method Post
 * @access student
 * 交卷
 */
    @UseBefore(verify.verifyToken_Student,verify.verifyToken_Score)
    @Post("/handin")
    async handin(@Ctx() ctx:Context){
        let date=new Date()
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        let student:Student=eval(`(${await redis.get(`student:${data.username}`)})`)
       
        if(!student){
            student=await Student.findOne({username:data.username});
            redis.set(`student:${data.username}`,JSON.stringify(student))
        }
        if((((date.getTime()-1560000000000)/1000-student.time_use>1800)||(student.score!=-1)))
        {ctx.status=200;ctx.body={msc:(date.getTime()-1560000000000)/1000-student.time_use}}
        else 
        if((date.getTime()-1560000000000)/1000-student.time_use<0) //设置最短时间
        {
           ctx.body={msg:"答题时间过短,请认真答题"}; 
        }else
            {
            student.time_use=(date.getTime()-1560000000000)/1000-student.time_use;
            student.score=0;
            for(let i=0;i<20;i++)
            {
                if(ctx.request.body.Answer[i]==student.answers_choice[i])
                    student.score+=4;
            }
            for(let i=0;i<10;i++)
            {
                if(ctx.request.body.Answer[i+20]==student.answers_judgment[i])
                    student.score+=2;
            }
            student.answers=ctx.request.body.Answer;
            redis.hgetall(`department:${student.department}`,(err,object)=>{
                const n:number=object.average*object.tested_number;
                object.tested_number++;
                object.average=(n+student.score)/object.tested_number;
                redis.hmset(`department:${student.department}`,object)
                Department.update(object.test,object)
            })
            Student.update(student.id,student)
            redis.set(`student:${data.username}`,JSON.stringify(student))
            ctx.body={Score:student.score}
        }
        return ctx;
    }

/**
 * @method Get
 * @access student
 * 查分
 */

@Get("/result")
async result(@Ctx() ctx:Context){
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        let student:Student=eval(`(${await redis.get(`student:${data.username}`)})`)
        if(!student){
            student=(await Student.findOne({username:data.username}));
            redis.set(`student:${data.username}`,JSON.stringify(student))
        }
        if(!ctx.request.get("If-Modified-Since")||ctx.request.get("If-Modified-Since")!=`${student.updateDate}`){
        ctx.body={Paper:{Choice_question:student.choice_question,Judgment_question:student.judgment_question},
        Score:student.score,
        Answer:{Choice_answers:student.answers_choice,Judgment_answers:student.answers_judgment},
        User_answer:student.answers}
        ctx.response.set({
            'Last-Modified':`${student.updateDate}`,
            'Cache-Control':"no-cache"
        })}
        else{ctx.status=304}
    return ctx;
    }
}
