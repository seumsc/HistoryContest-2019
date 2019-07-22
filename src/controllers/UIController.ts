import {Controller,Ctx, Get,Param, Post, Body, Params, UseBefore} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import {Department} from "../entity/Department"
import { Counsellor } from "../entity/Counsellor";
import {isPasswordValid,isUsernameValid}from "../utils/isValid"
import {Key} from "../utils/keys"
import * as jwt from "jsonwebtoken"
import * as verify from "../config/Verify"
import { get } from "https";
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
                let department1=await Department.findOne({id:parseInt(stu.department)})
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
                    ctx.body={Name:stu.name,Score:stu.score,Token:"Bearer "+token,Department:department1.name}
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
                    let department=await Department.findOne({id:parseInt(counsellor.department)})
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
                        ctx.body={Name:counsellor.name,Token:"Bearer "+token,Department:department.name}
                    }
                    break;
        }
        return ctx;
    }

//注册
//前端发送Identity,Name,Username,Password              {Identity:string,Name:string,Username:string,Password:string}
//后端返回注册状况                                     200:注册成功，400:用户名或密码格式不正确，403:用户已存在
//a,c
    @Post("/register")
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    async post_register(@Ctx() ctx:Context){
        switch (ctx.request.body.Identity)
        {
            case '0':
                let stu=new Student();
                stu.identity='0';
                stu.username=ctx.request.body.Username
                stu.name=ctx.request.body.Name
                stu.password=ctx.request.body.Password
                stu.department=stu.username[0]+stu.username[1]
                stu.score=-1
                const Stu=await Student.findOne({username:ctx.request.body.Username});
                if((!isPasswordValid(stu.password))||(!isUsernameValid(stu.username))){
                    ctx.status=400
                }
                else if(!Stu)
                {
                    Student.save(stu);
                    let department=await Department.findOne({id:parseInt(stu.department)})
                    department.total_number+=1;
                    Department.update(department.test,department)
                    ctx.status=200
                }
                else {
                    ctx.status=403
                }
                break;
            case '1':
                let admin=new Admin()
                admin.identity="1"
                admin.username=ctx.request.body.Username
                admin.name=ctx.request.body.Name
                admin.password=ctx.request.body.Password
                const Ad=await Admin.findOne({username:ctx.request.body.Username})
                if((!isPasswordValid(admin.password))||(!isUsernameValid(admin.username))){
                    ctx.status=400
                }
                else if(!Ad)
                {
                    Admin.save(admin);
                    ctx.status=200
                }
                else {
                    ctx.status=403
                }
                break;
            case '2':
                let counsellor=new Counsellor()
                counsellor.identity="2";
                counsellor.username=ctx.request.body.Username
                counsellor.name=ctx.request.body.Name
                counsellor.password=ctx.request.body.Password
                counsellor.department=counsellor.username[0]+counsellor.username[1]
                const Cou=await Counsellor.findOne({username:ctx.request.body.Username})
                if((!isPasswordValid(counsellor.password))||(!isUsernameValid(counsellor.username))){
                    ctx.status=400
                }
                else if(!Cou)
                {
                    Counsellor.save(counsellor);
                    ctx.status=200
                }
                else {
                    ctx.status=403
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
        ctx.body={department:await Department.find()}
        return ctx;
    }

    @Post("/resetd")
    async reset(@Ctx() ctx:Context){
        let department=await Department.findOne({id:parseInt(ctx.request.body.Id)})
        department.total_number=ctx.request.body.total;
        ctx.body=department
        Department.update(department.test,department)
        return ctx;
    }
}



