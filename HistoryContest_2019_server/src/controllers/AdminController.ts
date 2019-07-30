import { Student } from "../entity/Student";
import {Counsellor}from "../entity/Counsellor"
import {Admin} from "../entity/Admin"
import {Department} from "../entity/Department"
import {Controller,Ctx,Post, Get, UseBefore} from "routing-controllers"
import { Context } from "vm";
import * as verify from "../config/Verify"
import {isPasswordValid,isUsernameValid}from "../utils/isValid"
const data=require("../utils/information.json")
const d=require("../Data/Student_test_2014.json")
/** 
 *  前端发送院系序号                           {Department:string}
 *  后端返回该院系所有用户的姓名，用户名，得分
 *  {Students:{name:string,username:string,score:number}[],Tested:number,Total:number,Departments:{name:string,average:number}[]}
 *  @access admin,counsellor*/

 @Controller("/admin")
export class AdminController{
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/getBydepartment")
    async get_department(@Ctx() ctx:Context){   
        let department=await Department.findOne({id:ctx.request.body.Department})
        ctx.body=require("../utils/information.json")
        ctx.body[department.name]=await Student.find({select:["name","username","score","time_use","password"],where:{department:ctx.request.body.Department}})
        // ctx.body={Students:await Student.find({select:["name","username","score","time_use","password"],where:{department:ctx.request.body.Department}}),Tested:department.tested_number,Total:department.total_number}
        return ctx;
    }
/**
 *  获取全部院系的均分，排名
 */
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Get("/get_alldepartment")
    async get_alldepartment(@Ctx() ctx:Context){
        ctx.body={Departments:await Department.find({order:{average:"DESC"},select:["name","average","tested_number","total_number"]})}
    }

//获取全部院系的学生姓名，用户名，得分
    @UseBefore(verify.verifyToken_Admin,verify.verifyToken_Username)
    @Get("/get_allstudent")
    async get_allstudent(@Ctx() ctx:Context){
        let department=await Department.find();
        ctx.body=data
        for(let i=0;i<department.length;i++){
            console.log(department[i].id)
            ctx.body[department[i].name]=await Student.find({select:["name","username","score","time_use","password"],where:{department:department[i].id}})      
        }
        return ctx;
    }




    //注册
//前端发送Identity,Name,Username,Password              {Identity:string,Name:string,Username:string,Password:string}
//后端返回注册状况                                     200:注册成功，400:用户名或密码格式不正确，403:用户已存在
//a,c
@Post("/register")
// @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
async post_register(@Ctx() ctx:Context){
    // switch (ctx.request.body.Identity)
    // {
    //     case '0':
    //         let stu=new Student();
    //         stu.identity='0';
    //         stu.username=ctx.request.body.Username
    //         stu.name=ctx.request.body.Name
    //         stu.password=ctx.request.body.Password
    //         stu.department=stu.username[0]+stu.username[1]
    //         stu.score=-1
    //         const Stu=await Student.findOne({username:ctx.request.body.Username});
    //         if((!isPasswordValid(stu.password))||(!isUsernameValid(stu.username))){
    //             ctx.status=400
    //         }
    //         else if(!Stu)
    //         {
    //             Student.save(stu);
    //             let department=await Department.findOne({id:stu.department})
    //             department.total_number+=1;
    //             Department.update(department.test,department)
    //             ctx.status=200
    //         }
    //         else {
    //             ctx.status=403
    //         }
    //         break;
    //     case '1':
    //         let admin=new Admin()
    //         admin.identity="1"
    //         admin.username=ctx.request.body.Username
    //         admin.name=ctx.request.body.Name
    //         admin.password=ctx.request.body.Password
    //         const Ad=await Admin.findOne({username:ctx.request.body.Username})
    //         if((!isPasswordValid(admin.password))||(!isUsernameValid(admin.username))){
    //             ctx.status=400
    //         }
    //         else if(!Ad)
    //         {
    //             Admin.save(admin);
    //             ctx.status=200
    //         }
    //         else {
    //             ctx.status=403
    //         }
    //         break;
    //     case '2':
    //         let counsellor=new Counsellor()
    //         counsellor.identity="2";
    //         counsellor.username=ctx.request.body.Username
    //         counsellor.name=ctx.request.body.Name
    //         counsellor.password=ctx.request.body.Password
    //         counsellor.department=counsellor.username[0]+counsellor.username[1]
    //         const Cou=await Counsellor.findOne({username:ctx.request.body.Username})
    //         if((!isPasswordValid(counsellor.password))||(!isUsernameValid(counsellor.username))){
    //             ctx.status=400
    //         }
    //         else if(!Cou)
    //         {
    //             Counsellor.save(counsellor);
    //             ctx.status=200
    //         }
    //         else {
    //             ctx.status=403
    //         }
    //         break;
    // }
    d.students.forEach(element => {
        let stu=new Student()
        stu.name=element.Name;
        stu.username=element.Username;
        stu.password=element.Password;
        stu.department=stu.username[0]+stu.username[1]
        Student.save(stu)
    });
    ctx.body={msg:"successful"}
    return ctx;
}

/**
 *  前端发送用户名，姓名            {Username:string,Name:string,Password:string}
 *  后端保存用户修改后信息
 *  @access  admin，counsellor*/
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset_name")
    async reset_name(@Ctx() ctx:Context){
    let student=await Student.findOne({username:ctx.request.body.Username})
    student.name=ctx.request.body.Name
    await Student.update(student.id,student)
    return ctx.body={msg:"successfully reset"};
    }

/**
 *  前端发送姓名，一卡通            {Username:string,Name:string,Password:string}
 *  后端保存用户修改后信息
 *  @access  admin，counsellor*/
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset_username")
    async reset_username(@Ctx() ctx:Context){
    let student=await Student.findOne({name:ctx.request.body.Name,password:ctx.request.body.Password})
    student.username=ctx.request.body.Username
    await Student.update(student.id,student)
    return ctx.body={msg:"successfully reset"};
}

/**
 *  前端发送学号            {Username:string,Name:string,Password:string}
 *  后端保存用户修改后信息
 *  @access  admin，counsellor*/
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset_password")
    async reset_password(@Ctx() ctx:Context){
    let student=await Student.findOne({username:ctx.request.body.Username})
    student.password=ctx.request.body.Password
    await Student.update(student.id,student)
    return ctx.body={msg:"successfully reset"};


}

}
