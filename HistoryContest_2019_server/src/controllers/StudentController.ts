import {Controller,Ctx,Post, UseBefore} from "routing-controllers"
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
//前端发送Username                                            {Username:String}
//后端判断是否已有得分，有则403报错
//后端随机生成选择题与判断题序号并保存，返回题目与选项           {Paper:{Choice_question:ChoiceQuestion[],Judgment_question:JudgmentQuestion[]}}
//student
    @UseBefore(verify.verifyToken_Student,verify.verifyToken_Username)
    @Post("/test")
    async post( @Ctx() ctx:Context){
        let stu:Student=await await Student.findOne({username:ctx.request.body.Username})//获取前端发送的用户名
        if(stu.score==-1){
        //生成两个随机数组，应用为选择题和判断题的序号
        const arr:number[]=await RandomArr(200,20)
        const arr2:number[]=await RandomArr(100,10)
        //通过数组获取选择题与判断题
        let questionarr1:any[]=await ChoiceQuestion.findByIds(arr,{select:["text","options","answer"]});
        let questionarr2:any[]=await JudgmentQuestion.findByIds(arr,{select:["text","answer"]});
        //将题目(包括题干，选项，答案)保存在用户的paper对象中
        stu.choice_question=arr;
        stu.judgment_question=arr2;
        ctx.body.status=200;
        //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
        ctx.body={Paper:{Choice_question:await (questionarr1.map(a=>{delete a.answer;return a})),Judgment_question:await (questionarr2.map(a=>{delete a.answer;return a}))}}
        await Student.update(stu.id,stu)}//更新用户数据
        else{ctx.body.status=403}
        return ctx;
    }

//开始答题
//前端返回用户名                      {Username:String}
//后端保存时间(s)在time_use,保存开始时间(Data)在time_start中
//student
    @Post("/start")
    async start(@Ctx() ctx:Context){
        let d=new Date()
       try{await Student.findOne({username:ctx.request.body.Username})
        .then(
            async stu =>{stu.time_use=(d.getTime()-1560000000000)/1000;
            stu.time_start=new Date;
            await Student.update(stu.id,stu);})
        ctx.body={msg:"start testing",}}
        catch(error){ctx.body=error}
        return ctx;
    }


//交卷
//前端发送用户名与答案                {Username:String,Answer:Number[]}
//后端判断当前时间(s)与开始时间(time_use)相差是否超过1800s(30min)，合法即进行改卷
//后端返回分数 
//student                      {Score:Number}
    @Post("/handin")
    async handin(@Ctx() ctx:Context){
        let d=new Date()
        let stu:Student=await Student.findOne({username:ctx.request.body.Username})
        if(((stu.time_use!=-1)&&((d.getTime()-1560000000000)/1000-stu.time_use>1800))||(stu.score!=-1))
        {ctx.body.status=403}
        else{
            stu.score=0;
            for(let i=0;i<20;i++)
            {
                if(ctx.request.body.Answer[i]==stu.answers_choice[i])
                    stu.score+=4;
            }
            for(let i=0;i<10;i++)
            {
                if(ctx.request.body.Answer[i+20]==stu.answers_judgment[i])
                    stu.score+=2;
            }
            let de=await Department.findOne({id:stu.department})
            const n:number=de.average*de.tested_number;
            de.tested_number+=1;
            de.average=(n+stu.score)/de.tested_number;
            await Department.update(de.test,de)
            await Student.update(stu.id,stu)
            ctx.body={Score:stu.score}
        }
    }

//交卷后返回答案
//前端发送用户名                   {Username:String}
//后端返回答案                    {Answer:Number[]}
//student
    @Post("/result_handin")
    async result1(@Ctx() ctx:Context){
        let stu:Student=await Student.findOne({username:ctx.request.body.Username})
        let questionarr1=await ChoiceQuestion.findByIds(stu.choice_question,{select:["answer"]});
        let questionarr2=await JudgmentQuestion.findByIds(stu.judgment_question,{select:["answer"]});
        let arr=await questionarr1.map(a=>a.answer)
        let arr2=await questionarr2.map(a=>a.answer)
        ctx.body={Answer:arr.concat(arr2)}
    }

//查分
//前端发送用户名                  {Username:String}
//后端返回整套试卷，分数与答案    {Paper:{Choice_question:ChoiceQuestion[],Judgment_question:JudgmentQuestion[]}，Score:Number,Answer:{Choice_answers:number[],Judgment_answers:number[]}}
//student,admin,counsellor
@Post("/result")
    async result(@Ctx() ctx:Context){
        let stu:Student=await Student.findOne({username:ctx.request.body.Username})
        let questionarr1:any[]=await ChoiceQuestion.findByIds(stu.choice_question,{select:["text","options","answer"]});
        let questionarr2:any[]=await JudgmentQuestion.findByIds(stu.judgment_question,{select:["text","answer"]});
        ctx.body={Paper:{Choice_question:questionarr1,Judgment_question:questionarr2},Score:stu.score,Answer:{Choice_answers:stu.answers_choice,Judgment_answers:stu.answers_judgment}}
    }
}