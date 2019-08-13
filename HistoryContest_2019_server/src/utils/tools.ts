import { Student } from "../entity/Student";
import {Counsellor}from "../entity/Counsellor"
import {Admin} from "../entity/Admin"
import {Department} from "../entity/Department"
import {ChoiceQuestion}from "../entity/ChoiceQuestion"
import {JudgmentQuestion}from "../entity/JudgmentQuestion"
const redis=require("../config/redis")
//将所有数据从mysql同步到redis
export async function redis_all(){
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
    //从mysql中向redis录入题目信息
    let choice=await ChoiceQuestion.find()
    let judge=await JudgmentQuestion.find()
    choice.forEach(element =>{
        redis.hmset(`choice:${element.id}`,element)
        redis.sadd(`choice`,`${element.id}`)
    })
    judge.forEach(element =>{
        redis.hmset(`judge:${element.id}`,element)
        redis.sadd(`judge`,`${element.id}`)
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