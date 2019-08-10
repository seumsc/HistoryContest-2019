import {Controller,Ctx, Get,Param, Post, Body, Params, UseBefore} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import {Department} from "../entity/Department"
import { Counsellor } from "../entity/Counsellor";
import {Key} from "../utils/keys"
import * as jwt from "jsonwebtoken"
const redis =require("../config/redis")
@Controller("/ui")
export class UIController{
/**
 * @method Post
 * @access open
 * 登录
 */

    @Post("/login")
    async post_login(@Ctx() ctx:Context){
        console.log(ctx.request.body)
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
                    return ctx;
        }
    }
}
