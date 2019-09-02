"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = require("../entity/Student");
const Counsellor_1 = require("../entity/Counsellor");
const Admin_1 = require("../entity/Admin");
const Department_1 = require("../entity/Department");
const redis = require("../config/redis");
//将所有数据从mysql同步到redis
function redis_all() {
    return __awaiter(this, void 0, void 0, function* () {
        let allStudent = yield Student_1.Student.find();
        allStudent.forEach((stu) => __awaiter(this, void 0, void 0, function* () {
            stu.department = stu.username[0] + stu.username[1];
            yield Student_1.Student.update(stu.id, stu);
            let Dep = yield Department_1.Department.find();
            //console.log(Dep);
            let result = Dep.filter(depart => {
                console.log(`${depart.id} / ${stu.department}`);
                if (depart.id == stu.department) {
                    console.log("o");
                    return true;
                }
                return false;
            });
            if (result.length == 0) {
                let newDep = new Department_1.Department();
                newDep.id = stu.department;
                newDep.total_number = 1;
                yield Department_1.Department.save(newDep);
                console.log(`add department ${newDep.id}`);
            }
            else {
                result[0].total_number += 1;
                Department_1.Department.update(result[0].test, result[0]);
                console.log(`add student in ${result[0].id}`);
            }
        }));
        //从mysql中向redis录入院系信息
        let department = yield Department_1.Department.find();
        department.forEach(element => {
            redis.hmset(`department:${element.id}`, element);
            redis.sadd(`department`, `${element.id}`);
        });
        //从mysql中向redis录入学生信息
        let student = yield Student_1.Student.find();
        student.forEach(element => {
            redis.set(`student:${element.username}`, JSON.stringify(element));
            redis.sadd(`student`, `${element.username}`);
        });
        //从mysql中向redis录入辅导员信息
        let counsellor = yield Counsellor_1.Counsellor.find();
        counsellor.forEach(element => {
            redis.hmset(`counsellor:${element.username}`, element);
            redis.sadd(`counsellor`, `${element.username}`);
        });
        //从mysql中向redis录入管理员信息
        let admin = yield Admin_1.Admin.find();
        admin.forEach(element => {
            redis.hmset(`admin:${element.username}`, element);
            redis.sadd(`admin`, `${element.username}`);
        });
        //为学生划分院系
        let b = yield Student_1.Student.find();
        b.forEach(element => {
            redis.sadd(`department${element.department}`, element.username);
        });
        console.log("redis_all completed");
    });
}
exports.redis_all = redis_all;
function redis_user() {
    return __awaiter(this, void 0, void 0, function* () {
        try { //从mysql中向redis录入院系信息
            let department = yield Department_1.Department.find();
            department.forEach(element => {
                redis.hmset(`department:${element.id}`, element);
                redis.sadd(`department`, `${element.id}`);
            });
            //从mysql中向redis录入学生信息
            let student = yield Student_1.Student.find();
            student.forEach(element => {
                redis.set(`student:${element.username}`, JSON.stringify(element));
                redis.sadd(`student`, `${element.username}`);
            });
            //从mysql中向redis录入辅导员信息
            let counsellor = yield Counsellor_1.Counsellor.find();
            counsellor.forEach(element => {
                redis.hmset(`counsellor:${element.username}`, element);
                redis.sadd(`counsellor`, `${element.username}`);
            });
            //从mysql中向redis录入管理员信息
            let admin = yield Admin_1.Admin.find();
            admin.forEach(element => {
                redis.hmset(`admin:${element.username}`, element);
                redis.sadd(`admin`, `${element.username}`);
            });
            //为学生划分院系
            let b = yield Student_1.Student.find();
            b.forEach(element => {
                redis.sadd(`department${element.department}`, element.username);
            });
        }
        catch (err) {
            console.log(err);
        }
        console.log("successfully sync");
    });
}
exports.redis_user = redis_user;
//# sourceMappingURL=tools.js.map