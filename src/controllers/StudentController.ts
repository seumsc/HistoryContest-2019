import {getRepository, Connection, getConnection, getManager, createConnection}from "typeorm"
import {Controller,Get,Ctx,Post} from "routing-controllers"
//import entities
import {ChoiceQuestion}from "../entity/ChoiceQuestion"
import {JudgmentQuestion}from "../entity/JudgmentQuestion"
import {Student} from "../entity/Student"
import { Context } from "koa";
import {RandomArr}from "../utils/RandomArray"

@Controller("/student")
export class StudentController{
    
    @Post("/test")
    async post( @Ctx() ctx:Context){
        const stu:Student=await await Student.findOne({username:ctx.request.body.Username})
        if(stu.score==-1){
        const arr:number[]=await RandomArr(200,20)
        const arr2:number[]=await RandomArr(100,10)
        const questionarr1:any[]=await ChoiceQuestion.findByIds(arr,{select:["id","text","a","b","c","d"]});
        const questionarr2:any[]=await JudgmentQuestion.findByIds(arr,{select:["id","text"]});
        ctx.status=200;
        ctx.body=await questionarr1.concat(questionarr2)}
        else{ctx.status=403}
        return ctx;
    }

    @Post("/start")
    async start(@Ctx() ctx:Context){
        let d=new Date()
       try{await Student.findOne({username:ctx.request.body.Username})
        .then(
            stu =>{stu.time_use=(d.getTime()-1500000000000)/1000;
            stu.time_start=new Date;
            Student.update(stu.id,stu);})
        ctx.body={msg:"start testing",}}
        catch(error){ctx.body=error}
        return ctx;
    }


//未完成
    @Post("/result")
    async result(@Ctx() ctx:Context){
        let d=new Date()
        let stu:Student=await Student.findOne({username:ctx.request.body.Username})
        if((stu.time_use!=-1)&&((d.getTime()-1500000000000)/1000-stu.time_use>1800))
        {ctx.status=403}
        else{}
    }
}