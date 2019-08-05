import {Controller,Ctx,Get,Post, UseBefore} from "routing-controllers"
import * as jwt from "jsonwebtoken"
import {Key} from "../utils/keys"
//import entities
import {ChoiceQuestion}from "../entity/ChoiceQuestion"
import {JudgmentQuestion}from "../entity/JudgmentQuestion"
import {Student} from "../entity/Student"
import { Context } from "koa";
//import utils
import {RandomArr}from "../utils/RandomArray"
import * as verify from "../config/Verify"
import { Department } from "../entity/Department";
const redis =require("../config/redis")
@Controller("/student")
export class StudentController{

//获取试卷
//后端判断是否已有得分，有则403报错
//后端随机生成选择题与判断题序号并保存，返回题目与选项           {Paper:{Choice_question:ChoiceQuestion[],Judgment_question:JudgmentQuestion[]}}
//student
    // @UseBefore(verify.verifyToken_Student,verify.verifyToken_Username)
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
            //将题目id保存在用户的paper对象中
            // let Cq=await ChoiceQuestion.findByIds(choice_id,{select:["answer"]})
            // let Jq=await JudgmentQuestion.findByIds(judgment_id,{select:["answer"]})
            // student.answers_choice=Cq.map(a=>a.answer)
            // student.answers_judgment=Jq.map(a=>a.answer)
            choice_id.forEach(async element => {
                student.answers_choice.push(await redis.hget(`choice:${element}`,'answer'))
            });
            judgment_id.forEach(async element => {
                student.answers_judgment.push(await redis.hget(`judge:${element}`,'answer'))
            });
            student.choice_question=choice_id;
            student.judgment_question=judgment_id;
            ctx.status=200;
            //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
            ctx.body={Paper:{Choice_question:choice_id,Judgment_question:judgment_id}}
            await Student.update(student.id,student)
            redis.set(`student:${data.username}`,JSON.stringify(student))}//更新用户数据
            else{ctx.status=403}
            
        // if(!student){
        //         student=(await Student.findOne({username:data.username}));
        //         redis.hmset(`student:${data.username}`,student)
        // }
        // if(student.score==-1){
        // //生成两个随机数组，应用为选择题和判断题的序号
        // const choice_id:number[]=await RandomArr(20,20)
        // const judgment_id:number[]=await RandomArr(10,10)
        // //将题目id保存在用户的paper对象中
        // // let Cq=await ChoiceQuestion.findByIds(choice_id,{select:["answer"]})
        // // let Jq=await JudgmentQuestion.findByIds(judgment_id,{select:["answer"]})
        // // student.answers_choice=Cq.map(a=>a.answer)
        // // student.answers_judgment=Jq.map(a=>a.answer)
        // choice_id.forEach(element => {
        //     redis.hget(`choice:${element}`,'answer',(err,object)=>{
        //         student.answers_choice.push(object)
        //     })
        // });
        // judgment_id.forEach(element => {
        //     redis.hget(`judge:${element}`,'answer',(err,object)=>{
        //         student.answers_judgment.push(object)
        //     })
        // });
        // student.choice_question=choice_id;
        // student.judgment_question=judgment_id;
        // ctx.status=200;
        // //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
        // ctx.body={Paper:{Choice_question:choice_id,Judgment_question:judgment_id}}
        // await Student.update(student.id,student)
        // redis.hmset(`student:${data.username}`,student)}//更新用户数据
        // else{ctx.status=403}
        // console.log(ctx.body)
        return ctx;
    }

//开始答题
//前端返回用户名                      {Username:String}
//后端保存时间(s)在time_use,保存开始时间(Data)在time_start中
//student
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
        // let student=undefined
        // redis.hgetall(`student:${data.username}`,async(err,object)=>{student=object})
        // if(!student){
        //     student=(await Student.findOne({username:data.username}));
        //     redis.hmset(`student:${data.username}`,student)
        // }
        // student.time_use=(date.getTime()-1560000000000)/1000;
        // student.time_start=new Date;
        // await Student.update(student.id,student);
        // redis.hmset(`student:${data.username}`,student,(err)=>{console.log(err)})
        // ctx.body={msg:"start testing"}
        ctx.body={msg:"start testing"}
        return ctx;
    }


//交卷
//前端发送用户名与答案                {Username:String,Answer:Number[]}
//后端判断当前时间(s)与开始时间(time_use)相差是否超过1800s(30min)，合法即进行改卷
//后端返回分数 
//student                      {Score:Number}
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
        // let student:Student=undefined
        // await redis.hgetall(`student:${data.username}`,async(err,object)=>{student=object})
        // if(!student){
        //     student=(await Student.findOne({username:data.username}));
        //     redis.hmset(`student:${data.username}`,student)
        // }
        // student.time_use=(date.getTime()-1560000000000)/1000-student.time_use;
        // if(((student.time_use>1800)||(student.score!=-1)))
        // {ctx.status=403}
        // else 
        // if(student.time_use<300)
        // {
        //    ctx.body={msg:"答题时间过短,请认真答题"}; 
        // }else
        //     {
        //     student.score=0;
        //     for(let i=0;i<20;i++)
        //     {
        //         if(ctx.request.body.Answer[i]==student.answers_choice[i])
        //             student.score+=4;
        //     }
        //     for(let i=0;i<10;i++)
        //     {
        //         if(ctx.request.body.Answer[i+20]==student.answers_judgment[i])
        //             student.score+=2;
        //     }
        //     student.answers=ctx.request.body.Answer;
        //     await redis.hgetall(`department:${student.department}`,async(err,object)=>{
        //         const n:number=object.average*object.tested_number;
        //         object.tested_number+=1;
        //         object.average=(n+student.score)/object.tested_number;
        //         await redis.hmset(`department:${student.department}`,object)
        //         await Department.update(object.test,object)
        //     })
        //     await Student.update(student.id,student)
        //     redis.hmset(`student:${data.username}`,student)
        //     ctx.body={Score:student.score}
        // }
        if(!student){
            student=await Student.findOne({username:data.username});
            redis.set(`student:${data.username}`,JSON.stringify(student))
        }
        if((((date.getTime()-1560000000000)/1000-student.time_use>1800)||(student.score!=-1)))
        {ctx.status=403}
        else 
        if((date.getTime()-1560000000000)/1000-student.time_use<0)
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
                object.tested_number+=1;
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


//查分
//前端发送用户名                  {Username:String}
//后端返回整套试卷，分数与答案    {Paper:{Choice_question:number[],Judgment_question:number[]}，Score:Number,Answer:{Choice_answers:number[],Judgment_answers:number[]}}
//student,admin,counsellor
@Get("/result")
    async result(@Ctx() ctx:Context){
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        // await redis.hgetall(`student:${data.username}`,async(err,object)=>{
        //     let student:Student=object
        //     if(!student){
        //         student=(await Student.findOne({username:data.username}));
        //         await redis.hmset(`student:${data.username}`,student)
        //     }
        //     if(!ctx.request.get("If-Modified-Since")||ctx.request.get("If-Modified-Since")!=`${student.updateDate}`){
        //     ctx.body={Paper:{Choice_question:student.choice_question,Judgment_question:student.judgment_question},
        //     Score:student.score,
        //     Answer:{Choice_answers:student.answers_choice,Judgment_answers:student.answers_judgment},
        //     User_answer:student.answers}
        //     ctx.response.set({
        //         'Last-Modified':`${student.updateDate}`,
        //         'Cache-Control':"no-cache"
        //     })}
        // })
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
