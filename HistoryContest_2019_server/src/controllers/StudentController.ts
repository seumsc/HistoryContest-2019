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
@Controller("/student")
export class StudentController{

//获取试卷
//后端判断是否已有得分，有则403报错
//后端随机生成选择题与判断题序号并保存，返回题目与选项           {Paper:{Choice_question:ChoiceQuestion[],Judgment_question:JudgmentQuestion[]}}
//student
    @UseBefore(verify.verifyToken_Student,verify.verifyToken_Username)
    @Get("/test")
    async test( @Ctx() ctx:Context){
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        let student:Student=await await Student.findOne({username:data.username})//获取token中的用户名
        if(student.score==-1){
        //生成两个随机数组，应用为选择题和判断题的序号
        const choice_id:number[]=await RandomArr(20,20)
        const judgment_id:number[]=await RandomArr(10,10)
        //将题目id保存在用户的paper对象中
        let Cq=await ChoiceQuestion.findByIds(choice_id,{select:["answer"]})
        let Jq=await JudgmentQuestion.findByIds(judgment_id,{select:["answer"]})
        student.choice_question=choice_id;
        student.judgment_question=judgment_id;
        student.answers_choice=Cq.map(a=>a.answer)
        student.answers_judgment=Jq.map(a=>a.answer)
        ctx.status=200;
        //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
        ctx.body={Paper:{Choice_question:choice_id,Judgment_question:judgment_id}}
        await Student.update(student.id,student)}//更新用户数据
        else{ctx.status=403}
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
        let student=await Student.findOne({username:data.username})
        student.time_use=(date.getTime()-1560000000000)/1000;
        student.time_start=new Date;
        await Student.update(student.id,student);
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
        let student:Student=await Student.findOne({username:ctx.request.body.Username})
        student.time_use=(date.getTime()-1560000000000)/1000-student.time_use;
        if(((student.time_use>1800)||(student.score!=-1)))
        {ctx.status=403}
        else 
        if(student.time_use<0)
        {
           ctx.body={msg:"答题时间过短,请认真答题"}; 
        }else
            {
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
            let department=await Department.findOne({id:student.department})
            const n:number=department.average*department.tested_number;
            department.tested_number+=1;
            department.average=(n+student.score)/department.tested_number;
            await Department.update(department.test,department)
            await Student.update(student.id,student)
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
        let student:Student=await Student.findOne({username:data.username})
        if(!ctx.request.get("If-Modified-Since")||ctx.request.get("If-Modified-Since")!=`${student.updateDate}`){
        ctx.body={Paper:{Choice_question:student.choice_question,Judgment_question:student.judgment_question},
        Score:student.score,
        Answer:{Choice_answers:student.answers_choice,Judgment_answers:student.answers_judgment},
        User_answer:student.answers}
        ctx.response.set({
            'Last-Modified':`${student.updateDate}`,
            'Cache-Control':"no-cache"
        })   
    return ctx;
    }
}
}