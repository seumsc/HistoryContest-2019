import {Controller,Ctx, Get,Param, Post, Body, Params, UseBefore} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import {Department} from "../entity/Department"
import { Counsellor } from "../entity/Counsellor";

import {Key} from "../utils/keys"
import * as jwt from "jsonwebtoken"
import * as verify from "../config/Verify"
import { ChoiceQuestion } from "../entity/ChoiceQuestion";
import { JudgmentQuestion } from "../entity/JudgmentQuestion";

const redis =require("../config/redis")
@Controller("/ui")
export class UIController{

//登录
//前端发送identity,username,password        {Identity:string,Username:string,Password:string}
//后端返回姓名,分数(可选，仅学生返回)        {Name:string,Score:number(required:false)}    200:登录成功,404:用户不存在,403:用户名或密码错误
//s,a,c
    @Post("/login")
    async post_login(@Ctx() ctx:Context){
        switch (ctx.request.body.Identity)
        {
            case '0':
                let student:Student=eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
                if(!student){
                    student=await Student.findOne({username:ctx.request.body.Username});
                    redis.set(`student:${ctx.request.body.Username}`,JSON.stringify(student))
                }
                if(!student)
                {
                    ctx.status=404
                }else if(student.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                   let department:Department=undefined
                    await redis.hgetall(`department:${student.department}`,(err,object)=>{department=object})
                    const payload = {identity:student.identity,username:student.username,score:student.score }
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:student.name,Score:student.score,Token:"Bearer "+token,Department:department.name,Id:student.department}
                }
                    return ctx;
            case '1':
                let admin:Admin=await redis.hgetall(`admin:${ctx.request.body.Username}`)
                if(!admin){
                    admin=(await Admin.findOne({username:ctx.request.body.Username}));
                    redis.hmset(`admin:${ctx.request.body.Username}`,admin)
                }
                if(!admin)
                {
                    ctx.status=404
                }else if(admin.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                    const payload = {identity:admin.identity,username:admin.username}
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:admin.name,Token:"Bearer "+token}
                }
                return ctx;
            case '2':
                let counsellor:Counsellor=await redis.hgetall(`counsellor:${ctx.request.body.Username}`)
                if(!counsellor){
                    counsellor=(await Counsellor.findOne({username:ctx.request.body.Username}));
                    redis.hmset(`counsellor:${ctx.request.body.Username}`,counsellor)
                }
                let department:Department=undefined
                await redis.hgetall(`department:${counsellor.department}`,async(err,object)=>{department=object;})
                if(!counsellor)
                {
                    ctx.status=404
                }else if(counsellor.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                    const payload = {identity:counsellor.identity,username:counsellor.username,department:counsellor.department}
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:counsellor.name,Token:"Bearer "+token,Department:department.name,Id:counsellor.department}
                }
                    // let counsellor=undefined
                    // redis.hgetall(`counsellor:${ctx.request.body.Username}`,async(err,object)=>{counsellor=object})
                    // if(!counsellor){
                    //         counsellor=(await Counsellor.findOne({username:ctx.request.body.Username}));
                    //         redis.hmset(`counsellor:${ctx.request.body.Username}`,counsellor)
                    // }
                    // // let department=await Department.findOne({id:counsellor.department})
                    // let department=undefined;
                    // redis.hgetall(`department:${counsellor.department}`,(err,object)=>{department=object})
                    // if(!counsellor)
                    // {
                    //     ctx.status=404
                    // }else if(counsellor.password!=ctx.request.body.Password)
                    // {
                    //     ctx.status=403
                    // }
                    // else
                    // {
                    //     const payload = {identity:counsellor.identity,username:counsellor.username,department:counsellor.department}
                    //     const token=jwt.sign(payload,Key,{expiresIn:3600});
                    //     ctx.status=200
                    //     ctx.body={Name:counsellor.name,Token:"Bearer "+token,Department:department.name,Id:counsellor.department}
                    // }
                    return ctx;
        }
    }

    @Get("/redis")
    async test(@Ctx() ctx:Context){
        //从mysql中向redis录入院系信息
        // let department=await Department.find()
        // department.forEach(element => {
        //     redis.hmset(`department:${element.id}`,element)
        //     redis.sadd(`department`,`${element.id}`)
        // });
        //从mysql中向redis录入学生信息
        // let student=await Student.find()
        // student.forEach(element =>{
        //     redis.set(`student:${element.username}`,JSON.stringify(element))
        //     redis.sadd(`student`,`${element.username}`)
        // })
        //从mysql中向redis录入辅导员信息
        // let counsellor=await Counsellor.find()
        // counsellor.forEach(element =>{
        //     redis.hmset(`counsellor:${element.username}`,element)
        //     redis.sadd(`counsellor`,`${element.username}`)
        // })
        //从mysql中向redis录入管理员信息
        // let admin=await Admin.find()
        // admin.forEach(element =>{
        //     redis.hmset(`admin:${element.username}`,element)
        //     redis.sadd(`admin`,`${element.username}`)
        // })
        //从mysql中向redis录入题目信息
        // let choice=await ChoiceQuestion.find()
        // let judge=await JudgmentQuestion.find()
        // choice.forEach(element =>{
        //     redis.hmset(`choice:${element.id}`,element)
        //     redis.sadd(`choice`,`${element.id}`)
        // })
        // judge.forEach(element =>{
        //     redis.hmset(`choice:${element.id}`,element)
        //     redis.sadd(`choice`,`${element.id}`)
        // })
        //为学生划分院系
        // let b=await Student.find();
        // b.forEach(element=>{
        //     redis.sadd(`department${element.department}`,element.username)
        // })
        ctx.body={msg:"succ"}
        return ctx;
    }
    // @Get("/getadminall")
    // async get_admin_all(@Ctx() ctx:Context){
    //     ctx.body={admin: await Admin.find({select:["name","username"]})}
    //     return ctx;
    //     // return await Admin.find()
    // }

    // @Get("/getstudentall")
    // async get_student_all(@Ctx() ctx:Context){
    //     ctx.body={student:await Student.find({select:["name","username","department","score","time_use","time_start"]})}
    //     return ctx;
    // }

    // @Post("/add_department")
    // async add1(@Ctx() ctx:Context){
    //     let department=new Department()
    //     department.id=ctx.request.body.Id;
    //     department.name=ctx.request.body.Name;
    //     if(ctx.request.body.Total)
    //     {department.total_number=ctx.request.body.Total}
    //     Department.save(department)
    //     return ctx;
    // }

}
