import {getRepository}from "typeorm"
import {Controller,Ctx, Get,Param, Post, Body} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import { Counsellor } from "../entity/Counsellor";

@Controller("/ui")
export class UIController{
    @Post("/login")
    async post_login(@Body(){Identity,Username,Password}:{Identity:string,Username:string,Password:string},@Ctx() ctx:Context){
        switch (Identity)
        {
            case '0':
                const stu=await Student.findOne({username:Username});
                if(!stu)
                {
                    ctx.status=404
                    ctx.message="用户不存在"
                }else if(stu.password!=Password)
                {
                    ctx.status=204
                    ctx.message="用户名或密码错误，请重新输入"
                }
                else
                {
                    ctx.status=200
                    ctx.body={name:stu.name}
                    ctx.message="登陆成功"
                }
                break;
            case '1':
                    const admin=await Admin.findOne({username:Username});
                    if(!admin)
                    {
                        ctx.status=404
                        ctx.message="用户不存在"
                    }else if(admin.password!=Password)
                    {
                        ctx.status=204
                        ctx.message="用户名或密码错误，请重新输入"
                    }
                    else
                    {
                        ctx.status=200
                        ctx.body={name:admin.name}
                        ctx.message="登陆成功"
                    }
                    break;
            case '2':
                    const counsellor=await Counsellor.findOne({username:Username});
                    if(!counsellor)
                    {
                        ctx.status=404
                        ctx.message="用户不存在"
                    }else if(counsellor.password!=Password)
                    {
                        ctx.status=204
                        ctx.message="用户名或密码错误，请重新输入"
                    }
                    else
                    {
                        ctx.status=200
                        ctx.body={name:counsellor.name}
                        ctx.message="登陆成功"
                    }
                    break;
        }
    }
    @Post("/register")
    async post_register(@Body(){Identity,Username,Password,Name}:{Identity:string,Username:string,Password:string,Name:string},@Ctx() ctx:Context){
        switch (Identity)
        {
            case '0':
                const stu=new Student();
                stu.identity='0';
                stu.username=Username
                stu.name=Name
                stu.password=Password
                stu.department=stu.username[0]+stu.username[1]
                const Stu=await Student.findOne({username:Username});
                if(!Stu){
                    Student.save(stu);
                    ctx.status=200
                    ctx.message="注册成功"
                }
                else{
                    ctx.message="用户已存在"
                }
                break;
            case '1':
                const admin=new Admin()
                admin.identity="1"
                admin.username=Username
                admin.name=Name
                admin.password=Password
                const Ad=await Admin.findOne({username:Username})
                if(!Ad){
                    Admin.save(stu);
                    ctx.status=200
                    ctx.message="注册成功"
                }
                else{
                    ctx.message="用户已存在"
                }
                break;
            case '2':
                const counsellor=new Counsellor()
                counsellor.identity="2";
                counsellor.username=Username
                counsellor.name=Name
                counsellor.password=Password
                counsellor.department=counsellor.username[0]+counsellor.username[1]
                const Cou=await Counsellor.findOne({username:Username})
                if(!Cou){
                    Counsellor.save(stu);
                    ctx.status=200
                    ctx.message="注册成功"
                }
                else{
                    ctx.message="用户已存在"
                }
                break;
        }
    }
    @Get("/getadminall")
    async get_admin_all(){
        
        return await Admin.find()
    }
}
