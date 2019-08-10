import { Student } from "../entity/Student";
import {Counsellor}from "../entity/Counsellor"
import {Admin} from "../entity/Admin"
import {Department} from "../entity/Department"
import {Controller,Ctx,Post, Get, UseBefore, QueryParam} from "routing-controllers"
import { Context } from "koa";
import * as verify from "../config/Verify"
import {isPasswordValid,isUsernameValid}from "../utils/isValid"
import * as jwt from "jsonwebtoken"
import {Key} from "../utils/keys"
const redis =require("../config/redis")
/** 
 * @method Get
 * @access admin,counsellor
 * 获取某院系所有用户的姓名，学号，一卡通，得分，答题用时*/

 @Controller("/admin")
 export class AdminController{
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Get("/getBydepartment")
    async get_department(@Ctx() ctx:Context){  
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        let department:Department=await redis.hgetall(`department:${data.department}`)
        if(!department){
            department=await Department.findOne({id:data.department});
            redis.hmset(`department:${data.department}`,department)
        }
        if(!ctx.request.get("If-Modified-Since")||ctx.request.get("If-Modified-Since")!=`${department.updatedDate}`)
             {ctx.body={
            "建筑学院":[],
            "吴健雄学院":[],
            "机械工程学院":[],
            "能源与环境学院":[],
            "材料科学与工程学院":[],
            "土木工程学院":[],
            "交通学院":[],
            "自动化学院":[],
            "电气工程学院":[],
            "仪器科学与工程学院":[],
            "化学化工学院":[],
            "信息科学与工程学院":[],
            "电子科学与工程学院":[],
            "计算机科学与工程学院":[],
            "软件工程学院":[],
            "网络空间安全学院":[],
            "物理学院":[],
            "经济管理学院":[],
            "公共卫生学院":[],
            "人文学院":[],
            "艺术学院":[],
            "医学院":[],
            "生物科学与医学工程学院":[],
            "外国语学院":[]
            }
            let students=await redis.smembers(`department${department.id}`)
            let arr=new Array()
            for(let i=0;i<students.length;i++)
            {   
                let object=eval(`(${await redis.get(`student:${students[i]}`)})`)
                let test={
                name:object.name,
                username:object.username,
                score:object.score,
                time_use:object.time_use,
                password:object.password
                }
                arr.push(test)
            }
        ctx.body[department.name]=arr
        ctx.response.set({
            'Last-Modified':`${department.updatedDate}`,
            'Cache-Control':"no-cache"
        })
        }
        else {
        ctx.status=304;
    }
        return ctx;
    }
/**
 * @method Get
 * @access cousellor,admin
 * 获取全部院系的均分，排名*/

    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Get("/get_alldepartments")
    async get_alldepartment(@Ctx() ctx:Context){
        ctx.body={Departments:await Department.find({order:{average:"DESC"},select:["name","average","tested_number","total_number"]})}
        return ctx;
    }
/**
 * @method Get
 * @access admin
 * 获取全部学生的姓名，学号，一卡通，得分，答题用时*/

    @UseBefore(verify.verifyToken_Admin,verify.verifyToken_Username)
    @Get("/get_allstudents")
    async get_allstudent(@Ctx() ctx:Context){
        let department=await Department.find();
        ctx.body={
            "建筑学院":[],
            "吴健雄学院":[],
            "机械工程学院":[],
            "能源与环境学院":[],
            "材料科学与工程学院":[],
            "土木工程学院":[],
            "交通学院":[],
            "自动化学院":[],
            "电气工程学院":[],
            "仪器科学与工程学院":[],
            "化学化工学院":[],
            "信息科学与工程学院":[],
            "电子科学与工程学院":[],
            "计算机科学与工程学院":[],
            "软件工程学院":[],
            "网络空间安全学院":[],
            "物理学院":[],
            "经济管理学院":[],
            "公共卫生学院":[],
            "人文学院":[],
            "艺术学院":[],
            "医学院":[],
            "生物科学与医学工程学院":[],
            "外国语学院":[]
        }
        let departments=await redis.smembers(`department`)
        for(let i=0;i<departments.length;i++)
        {
            let department=await redis.hgetall(`department:${departments[i]}`)
            let students=await redis.smembers(`department${departments[i]}`)
            let arr=new Array()
            for(let j=0;j<students.length;j++)
            {
                let object:Student=eval(`(${await redis.get(`student:${students[j]}`)})`)
                let test={
                name:object.name,
                username:object.username,
                score:object.score,
                time_use:object.time_use,
                password:object.password
                }
                arr.push(test)
            }
        ctx.body[department.name]=arr
        }
        return ctx;
    }

/**
 * @method Post
 * @access cousellor,admin
 * 注册接口
 * 前端发送Identity,Name,Username,Password
 * 后端返回注册状况                                     200:注册成功，400:用户名或密码格式不正确，403:用户已存在*/

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
            const Stu=eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
            if((!isPasswordValid(stu.password))||(!isUsernameValid(stu.username))){
                ctx.status=400
            }
            else if(!Stu)
            {
                Student.save(stu);
                redis.set(`student:${stu.username}`,JSON.stringify(stu))
                let department:Department=await redis.hgetall(`department:${stu.department}`)
                department.total_number+=1;
                Department.update(department.test,department)
                redis.hmset(`department:${department.id}`,department)
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
                redis.hmset(`admin:${admin.username}`,admin)
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
                redis.hmset(`counsellor:${counsellor.username}`,counsellor)
                ctx.status=200
            }
            else {
                ctx.status=403
            }
            break;
    }
    return ctx;
}

/**
 * @method Get
 * @access cousellor,admin
 * @param id http://host:port/api/admin/result:id
 * 通过学号获取学生的答题情况*/

@UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
@Get("/result")
    async getByUsername(@QueryParam("id") id:string,@Ctx() ctx:Context){
        let student=eval(`(${await redis.get(`student:${id}`)})`)
            if(!student){
                student=(await Student.findOne({username:id}));
                redis.set(`student:${id}`,JSON.stringify(student))
            }
        if(!ctx.request.get("If-Modified-Since")||ctx.request.get("If-Modified-Since")!=`${student.updateDate}`){
            ctx.body={Paper:{Choice_question:student.choice_question,Judgment_question:student.judgment_question},
            Score:student.score,
            Answer:{Choice_answers:student.answers_choice,Judgment_answers:student.answers_judgment},
            User_answer:student.answers}
            ctx.response.set({
            'Last-Modified':`${student.updateDate}`,
            'Cache-Control':"no-cache"
        })
        return ctx;}
        else{
            ctx.status=304;
            return ctx;
        }
    }

/**
 * @method Post 
 * @access admin，counsellor
 * 前端发送用户名，姓名            {Username:string,Name:string,Password:string}
 * 后端保存用户修改后信息*/

    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset_name")
    async reset_name(@Ctx() ctx:Context){
    let student=eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
    if(!student){
            student=(await Student.findOne({username:ctx.request.body.Username}));
            redis.set(`student:${ctx.request.body.Username}`,JSON.stringify(student))
    }
    student.name=ctx.request.body.Name
    await Student.update(student.id,student)
    redis.set(`student:${ctx.request.body.Username}`,JSON.stringify(student))
    return ctx.body={msg:"successfully reset"};
    }

/**
 * @method Post
 * @access admin，counsellor
 * 前端发送姓名，一卡通            {Username:string,Name:string,Password:string}
 * 后端保存用户修改后信息*/

    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset_username")
    async reset_username(@Ctx() ctx:Context){
    let student=await Student.findOne({name:ctx.request.body.Name,password:ctx.request.body.Password})
    student.username=ctx.request.body.Username
    await Student.update(student.id,student)
    redis.set(`student:${ctx.request.body.Username}`,JSON.stringify(student))
    return ctx.body={msg:"successfully reset"};
}

/**
 * @method Post 
 * @access admin，counsellor
 * 前端发送学号            {Username:string,Name:string,Password:string}
 * 后端保存用户修改后信息*/
    @UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    @Post("/reset_password")
    async reset_password(@Ctx() ctx:Context){
    let student=eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
    if(!student){
        student=(await Student.findOne({username:ctx.request.body.Username}));
        redis.hmset(`student:${ctx.request.body.Username}`,student)
    }
    student.password=ctx.request.body.Password
    await Student.update(student.id,student)
    redis.set(`student:${ctx.request.body.Username}`,JSON.stringify(student))
    return ctx.body={msg:"successfully reset"};
}}
