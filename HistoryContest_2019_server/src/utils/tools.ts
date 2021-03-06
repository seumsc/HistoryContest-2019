import { Student } from "../entity/Student";
import {Counsellor}from "../entity/Counsellor"
import {Admin} from "../entity/Admin"
import {Department} from "../entity/Department"
const redis=require("../config/redis")
//将所有数据从mysql同步到redis
export async function redis_all(){
    redis.flushdb();
    //初次导入 数据库初始化
    // let allStudent=await Student.find();
    // for(let stu of allStudent){
    //     stu.department = stu.username[0] + stu.username[1]
    //     await Student.update(stu.id,stu);}
    //     let Dep =await Department.findOne({id:stu.department})
    //     console.log(Dep);
        
    //     if(Dep==undefined){
    //         let newDep=new Department();
    //         newDep.id=stu.department;
    //         newDep.total_number=1;
    //         await Department.save(newDep);
    //         console.log(`add department ${newDep.id}`)
    //     }
    //     else{
    //         Dep.total_number+=1;
    //         await Department.update(Dep.test,Dep);
    //         console.log(`add student in ${Dep.id}`)
    //     }
    // }
    //从mysql中向redis录入院系信息
    let department=await Department.find()
    department.forEach(element => {
        redis.hmset(`department:${element.id}`,element)
        redis.sadd(`department`,`${element.id}`)
    });
    //从mysql中向redis录入学生信息
    let student=await Student.find()
    student.forEach(element =>{
        redis.set(`student:${element.username}`,JSON.stringify(element))
        redis.sadd(`student`,`${element.username}`)
    })
    //从mysql中向redis录入辅导员信息
    let counsellor=await Counsellor.find()
    counsellor.forEach(element =>{
        redis.hmset(`counsellor:${element.username}`,element)
        redis.sadd(`counsellor`,`${element.username}`)
    })
    //从mysql中向redis录入管理员信息
    let admin=await Admin.find()
    admin.forEach(element =>{
        redis.hmset(`admin:${element.username}`,element)
        redis.sadd(`admin`,`${element.username}`)
    })
    //为学生划分院系
    let b=await Student.find();
    b.forEach(element=>{
        redis.sadd(`department${element.department}`,element.username)
    })

    console.log("redis_all completed")
}

export async function redis_user(){
    try{//从mysql中向redis录入院系信息
    let department=await Department.find()
    department.forEach(element => {
        redis.hmset(`department:${element.id}`,element)
        redis.sadd(`department`,`${element.id}`)
    });
    //从mysql中向redis录入学生信息
    let student=await Student.find()
    student.forEach(element =>{
        redis.set(`student:${element.username}`,JSON.stringify(element))
        redis.sadd(`student`,`${element.username}`)
    })
    //从mysql中向redis录入辅导员信息
    let counsellor=await Counsellor.find()
    counsellor.forEach(element =>{
        redis.hmset(`counsellor:${element.username}`,element)
        redis.sadd(`counsellor`,`${element.username}`)
    })
    //从mysql中向redis录入管理员信息
    let admin=await Admin.find()
    admin.forEach(element =>{
        redis.hmset(`admin:${element.username}`,element)
        redis.sadd(`admin`,`${element.username}`)
    })
    //为学生划分院系
    let b=await Student.find();
    b.forEach(element=>{
        redis.sadd(`department${element.department}`,element.username)
    })}catch(err){console.log(err)}
    console.log("successfully sync")
}