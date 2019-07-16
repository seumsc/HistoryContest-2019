import {getRepository}from "typeorm"
import {Controller,Ctx, Get} from "routing-controllers"
import {ChoiceQuestion}from "../entity/ChoiceQuestion"
import {JudgmentQuestion}from "../entity/JudgmentQuestion"
import { Context } from "koa";
const cqRepository=getRepository(ChoiceQuestion)
const jqRepository=getRepository(JudgmentQuestion)
import {RandomArr}from "../utils/RandomArray"

@Controller("/student")
export class StudentController{
    
    @Get("/test")
    async get( @Ctx() ctx:Context){
        const arr:number[]=RandomArr(200,20)
        const arr2:number[]=RandomArr(100,10)
        const questionarr1:any[]=await cqRepository.findByIds(arr);
        const questionarr2:any[]=await jqRepository.findByIds(arr);
        ctx.status=200;
        ctx.body=questionarr1.concat(questionarr2)
    }

}