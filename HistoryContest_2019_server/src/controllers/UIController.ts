import {Controller,Ctx, Get,Param, Post, Body, Params, UseBefore} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import {Department} from "../entity/Department"
import { Counsellor } from "../entity/Counsellor";

import {Key} from "../utils/keys"
import * as jwt from "jsonwebtoken"
import * as verify from "../config/Verify"
import { response } from "express";
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
                const stu=await Student.findOne({username:ctx.request.body.Username});
                let department1=await Department.findOne({id:stu.department})
                if(!stu)
                {
                    ctx.status=404
                }else if(stu.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                    const payload = {identity:stu.identity,username:stu.username,score:stu.score }
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:stu.name,Score:stu.score,Token:"Bearer "+token,Department:department1.name,Id:stu.department}
                }
                break;
            case '1':
                    const admin=await Admin.findOne({username:ctx.request.body.Username});
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
                    break;
            case '2':
                    const counsellor=await Counsellor.findOne({username:ctx.request.body.Username});
                    let department=await Department.findOne({id:counsellor.department})
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
                    break;
        }
        return ctx;
    }



    @Get("/im")
    @UseBefore(verify.verifyToken_Student)
    async get_im(@Ctx() ctx:Context){
        ctx.body= {msg:"fsdafasdfa"}
        return ctx;
}

    @Get("/getadminall")
    async get_admin_all(@Ctx() ctx:Context){
        ctx.body={admin: await Admin.find({select:["name","username"]})}
        return ctx;
        // return await Admin.find()
    }

    @Get("/getstudentall")
    async get_student_all(@Ctx() ctx:Context){
        ctx.body={student:await Student.find({select:["name","username","department","score","time_use","time_start"]})}
        return ctx;
    }

    @Post("/add_department")
    async add1(@Ctx() ctx:Context){
        let department=new Department()
        department.id=ctx.request.body.Id;
        department.name=ctx.request.body.Name;
        if(ctx.request.body.Total)
        {department.total_number=ctx.request.body.Total}
        Department.save(department)
        return ctx;
    }

    @Get("/get_alld")
    async get2(@Ctx() ctx:Context)
    {
        ctx.body={department:await Department.find({order:{id:"ASC"}})}
        return ctx;
    }

    @Post("/resetd")
    async reset(@Ctx() ctx:Context){
        let department=await Department.findOne({test:ctx.request.body.test})
        department.id=ctx.request.body.id
        ctx.body=department
        Department.update(department.test,department)
        return ctx;
    }
}



