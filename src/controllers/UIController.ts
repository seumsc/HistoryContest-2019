import {Controller,Ctx, Get,Param, Post, Body, Params} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import { Counsellor } from "../entity/Counsellor";
import {isPasswordValid,isUsernameValid}from "../utils/isValid"
@Controller("/ui")
export class UIController{
    @Post("/login")
    async post_login(@Ctx() ctx:Context){
        switch (ctx.request.body.Identity)
        {
            case '0':
                const stu=await Student.findOne({username:ctx.request.body.Username});
                if(!stu)
                {
                    ctx.status=404
                }else if(stu.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                    ctx.status=200
                    ctx.body={Name:stu.name,Score:stu.score}
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
                        ctx.status=200
                        ctx.body={Name:admin.name}
                    }
                    break;
            case '2':
                    const counsellor=await Counsellor.findOne({username:ctx.request.body.Username});
                    if(!counsellor)
                    {
                        ctx.status=404
                    }else if(counsellor.password!=ctx.request.body.Password)
                    {
                        ctx.status=403
                    }
                    else
                    {
                        ctx.status=200
                        ctx.body={name:counsellor.name}
                    }
                    break;
        }
        return ctx;
    }
    @Post("/register")
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
    @Get("/getadminall")
    async get_admin_all(@Ctx() ctx:Context){
        ctx.body=await Admin.find()
        return ctx;
        // return await Admin.find()
    }
}
