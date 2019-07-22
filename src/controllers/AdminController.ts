import { Student } from "../entity/Student";
import {Department} from "../entity/Department"
import {Controller,Ctx,Post, Get, UseBefore} from "routing-controllers"
import { Context } from "vm";
import * as verify from "../config/Verify"
/** 
 *  前端发送院系序号                           {Department:string}
 *  后端返回该院系所有用户的姓名，用户名，得分,以及该院系的平均分，已考人数，总人数
 *  {Students:{name:string,username:string,score:number}[],Average:float,Tested:number,Total:number}
 *  @access admin,counsellor*/

 @Controller("/admin")
export class AdminController{
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/getBydepartment")
    async get_department(@Ctx() ctx:Context){
        
        let department=await Department.findOne({id:parseInt(ctx.request.body.Department)})
        ctx.body={Students:await Student.find({department:ctx.request.body.Department}),Average:department.average,Tested:department.tested_number,Total:department.total_number}
        ctx.body.Students=ctx.body.Students.map(a=>{return {name:a.name,username:a.username,score:a.score,time_use:a.time_use,password:a.password}})
        return ctx;
    }
/**
 *  前端发送用户名，姓名，密码             {Username:string,Name:string,Password:string}
 *  后端保存用户修改后信息
 *  @access  admin，counsellor*/
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset")
    async reset(@Ctx() ctx:Context){
        let student=await Student.findOne({username:ctx.request.body.Username})
        student.name=ctx.request.body.Name
        student.password=ctx.request.body.Password;
        await Student.update(student.id,student)
        return ctx.body={msg:"successfully reset"};
    }

/** 后端返回所有学生的的姓名，用户名，得分  {Students:{name:string,username:string,score:number}[]}
 * @access admin
*/  
    @UseBefore(verify.verifyToken_Admin,verify.verifyToken_Username)
    @Get("/getall")
    async get_all(@Ctx() ctx:Context)
    {
        ctx.body={Students:await Student.find()}
        ctx.body.Students=await ctx.body.Students.map(a=>{return {name:a.name,username:a.username,score:a.score,time_use:a.time_use,password:a.password}})
        return ctx
    }
}