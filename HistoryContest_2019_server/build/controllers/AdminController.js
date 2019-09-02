"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const routing_controllers_1 = require("routing-controllers");
const verify = require("../config/Verify");
const isValid_1 = require("../utils/isValid");
const jwt = require("jsonwebtoken");
const keys_1 = require("../utils/keys");
const redis = require("../config/redis");
/**
 * @method Get
 * @access admin,counsellor
 * 获取某院系所有用户的姓名，学号，一卡通，得分，答题用时*/
let AdminController = class AdminController {
    /**
 * @method get
 * @access admin，counsellor
 * 管理员强制服务器更新redis数据
 */
    //@UseBefore(verify.verifyToken_CousellorOrAdmin,verify.verifyToken_Username)
    redis_updata(ctx) {
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
                console.log("redis_all completed");
                ctx.body = { msg: "redis updataed" };
                ctx.status = 200;
            }
            catch (err) {
                ctx.body = { msg: "updata have failed" };
                ctx.status = 404;
            }
            return ctx;
        });
    }
    get_department(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataString = ctx.header.authorization;
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            let department = yield redis.hgetall(`department:${data.department}`);
            if (!department) {
                department = yield Department_1.Department.findOne({ id: data.department });
                redis.hmset(`department:${data.department}`, department);
            }
            // if (!ctx.request.get("If-Modified-Since") || ctx.request.get("If-Modified-Since") != `${department.updatedDate}`) {
            ctx.body = {
                "建筑学院": [],
                "吴健雄学院": [],
                "机械工程学院": [],
                "能源与环境学院": [],
                "材料科学与工程学院": [],
                "土木工程学院": [],
                "交通学院": [],
                "自动化学院": [],
                "电气工程学院": [],
                "仪器科学与工程学院": [],
                "化学化工学院": [],
                "信息科学与工程学院": [],
                "电子科学与工程学院": [],
                "计算机科学与工程学院": [],
                "软件工程学院": [],
                "网络空间安全学院": [],
                "物理学院": [],
                "经济管理学院": [],
                "公共卫生学院": [],
                "人文学院": [],
                "艺术学院": [],
                "医学院": [],
                "生物科学与医学工程学院": [],
                "外国语学院": []
            };
            let students = yield redis.smembers(`department${department.id}`);
            let arr = new Array();
            for (let i = 0; i < students.length; i++) {
                let object = eval(`(${yield redis.get(`student:${students[i]}`)})`);
                let test = {
                    name: object.name,
                    username: object.username,
                    score: object.score,
                    time_use: object.time_use,
                    password: object.password
                };
                arr.push(test);
            }
            ctx.body[department.name] = arr;
            // ctx.response.set({
            // 'Last-Modified': `${department.updatedDate}`,
            // 'Cache-Control': "no-cache"
            // })
            // }
            // else {
            // ctx.status = 304;
            // }
            return ctx;
        });
    }
    /**
     * @method Get
     * @access cousellor,admin
     * 获取全部院系的均分，排名*/
    get_alldepartment(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = { Departments: yield Department_1.Department.find({ order: { average: "DESC" }, select: ["name", "average", "tested_number", "total_number"] }) };
            return ctx;
        });
    }
    /**
     * @method Get
     * @access admin
     * 获取全部学生的姓名，学号，一卡通，得分，答题用时*/
    get_allstudent(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let department = yield Department_1.Department.find();
            ctx.body = {
                "建筑学院": [],
                "吴健雄学院": [],
                "机械工程学院": [],
                "能源与环境学院": [],
                "材料科学与工程学院": [],
                "土木工程学院": [],
                "交通学院": [],
                "自动化学院": [],
                "电气工程学院": [],
                "仪器科学与工程学院": [],
                "化学化工学院": [],
                "信息科学与工程学院": [],
                "电子科学与工程学院": [],
                "计算机科学与工程学院": [],
                "软件工程学院": [],
                "网络空间安全学院": [],
                "物理学院": [],
                "经济管理学院": [],
                "公共卫生学院": [],
                "人文学院": [],
                "艺术学院": [],
                "医学院": [],
                "生物科学与医学工程学院": [],
                "外国语学院": []
            };
            let departments = yield redis.smembers(`department`);
            for (let i = 0; i < departments.length; i++) {
                let department = yield redis.hgetall(`department:${departments[i]}`);
                let students = yield redis.smembers(`department${departments[i]}`);
                let arr = new Array();
                for (let j = 0; j < students.length; j++) {
                    let object = eval(`(${yield redis.get(`student:${students[j]}`)})`);
                    let test = {
                        name: object.name,
                        username: object.username,
                        score: object.score,
                        time_use: object.time_use,
                        password: object.password
                    };
                    arr.push(test);
                }
                ctx.body[department.name] = arr;
            }
            return ctx;
        });
    }
    /**
     * @method Post
     * @access cousellor,admin
     * 注册接口
     * 前端发送Identity,Name,Username,Password
     * 后端返回注册状况                                     200:注册成功，400:用户名或密码格式不正确，403:用户已存在*/
    post_register(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (ctx.request.body.Identity) {
                case '0':
                    let stu = new Student_1.Student();
                    stu.identity = '0';
                    stu.username = ctx.request.body.Username;
                    stu.name = ctx.request.body.Name;
                    stu.password = ctx.request.body.Password;
                    stu.department = stu.username[0] + stu.username[1];
                    stu.score = -1;
                    const Stu = eval(`(${yield redis.get(`student:${ctx.request.body.Username}`)})`);
                    if ((!isValid_1.isPasswordValid(stu.password)) || (!isValid_1.isUsernameValid(stu.username))) {
                        ctx.status = 400;
                    }
                    else if (!Stu) {
                        Student_1.Student.save(stu);
                        redis.set(`student:${stu.username}`, JSON.stringify(stu));
                        let department = yield redis.hgetall(`department:${stu.department}`);
                        department.total_number += 1;
                        Department_1.Department.update(department.test, department);
                        redis.hmset(`department:${department.id}`, department);
                        ctx.status = 200;
                    }
                    else {
                        ctx.status = 403;
                    }
                    break;
                case '1':
                    let admin = new Admin_1.Admin();
                    admin.identity = "1";
                    admin.username = ctx.request.body.Username;
                    admin.name = ctx.request.body.Name;
                    admin.password = ctx.request.body.Password;
                    const Ad = yield Admin_1.Admin.findOne({ username: ctx.request.body.Username });
                    if ((!isValid_1.isPasswordValid(admin.password)) || (!isValid_1.isUsernameValid(admin.username))) {
                        ctx.status = 400;
                    }
                    else if (!Ad) {
                        Admin_1.Admin.save(admin);
                        redis.hmset(`admin:${admin.username}`, admin);
                        ctx.status = 200;
                    }
                    else {
                        ctx.status = 403;
                    }
                    break;
                case '2':
                    let counsellor = new Counsellor_1.Counsellor();
                    counsellor.identity = "2";
                    counsellor.username = ctx.request.body.Username;
                    counsellor.name = ctx.request.body.Name;
                    counsellor.password = ctx.request.body.Password;
                    counsellor.department = counsellor.username[0] + counsellor.username[1];
                    const Cou = yield Counsellor_1.Counsellor.findOne({ username: ctx.request.body.Username });
                    if ((!isValid_1.isPasswordValid(counsellor.password)) || (!isValid_1.isUsernameValid(counsellor.username))) {
                        ctx.status = 400;
                    }
                    else if (!Cou) {
                        Counsellor_1.Counsellor.save(counsellor);
                        redis.hmset(`counsellor:${counsellor.username}`, counsellor);
                        ctx.status = 200;
                    }
                    else {
                        ctx.status = 403;
                    }
                    break;
            }
            return ctx;
        });
    }
    /**
     * @method Get
     * @access cousellor,admin
     * @param id http://host:port/api/admin/result:id
     * 通过学号获取学生的答题情况*/
    getByUsername(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = eval(`(${yield redis.get(`student:${id}`)})`);
            if (!student) {
                student = (yield Student_1.Student.findOne({ username: id }));
                redis.set(`student:${id}`, JSON.stringify(student));
            }
            if (!ctx.request.get("If-Modified-Since") || ctx.request.get("If-Modified-Since") != `${student.updateDate}`) {
                ctx.body = {
                    Paper: { Choice_question: student.choice_question, Judgment_question: student.judgment_question },
                    Score: student.score,
                    Answer: { Choice_answers: student.answers_choice, Judgment_answers: student.answers_judgment },
                    User_answer: student.answers
                };
                ctx.response.set({
                    'Last-Modified': `${student.updateDate}`,
                    'Cache-Control': "no-cache"
                });
                return ctx;
            }
            else {
                ctx.status = 304;
                return ctx;
            }
        });
    }
    /**
     * @method Post
     * @access admin，counsellor
     * 前端发送用户名，姓名            {Username:string,Name:string,Password:string}
     * 后端保存用户修改后信息*/
    reset_name(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = eval(`(${yield redis.get(`student:${ctx.request.body.Username}`)})`);
            if (!student) {
                student = (yield Student_1.Student.findOne({ username: ctx.request.body.Username }));
                yield redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student));
            }
            if (!student) {
                ctx.body = { msg: undefined };
            }
            else {
                student.name = ctx.request.body.Name;
                yield Student_1.Student.update(student.id, student);
                yield redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student));
                ctx.body = { msg: "successfully reset" };
                let department = yield Department_1.Department.findOne({ id: student.department });
                department.updatedDate = new Date;
                yield Department_1.Department.update(department.test, department);
                yield redis.hmset(`department:${department.id}`, department);
            }
            return ctx;
        });
    }
    /**
     * @method Post
     * @access admin，counsellor
     * 前端发送姓名，一卡通            {Username:string,Name:string,Password:string}
     * 后端保存用户修改后信息*/
    reset_username(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = yield Student_1.Student.findOne({ name: ctx.request.body.Name, password: ctx.request.body.Password });
            if (!student) {
                ctx.body = { msg: undefined };
            }
            else {
                yield redis.del(`student:${student.username}`);
                yield redis.srem(`student`, `${student.username}`);
                yield redis.srem(`department${student.department}`, `${student.username}`);
                student.username = ctx.request.body.Username;
                yield Student_1.Student.update(student.id, student);
                yield redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student));
                ctx.body = { msg: "successfully reset" };
                let department = yield Department_1.Department.findOne({ id: student.department });
                department.updatedDate = new Date;
                yield Department_1.Department.update(department.test, department);
                yield redis.hmset(`department:${department.id}`, department);
            }
            return ctx;
        });
    }
    /**
     * @method Post
     * @access admin，counsellor
     * 前端发送学号            {Username:string,Name:string,Password:string}
     * 后端保存用户修改后信息*/
    reset_password(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let student = eval(`(${yield redis.get(`student:${ctx.request.body.Username}`)})`);
            if (!student) {
                student = (yield Student_1.Student.findOne({ username: ctx.request.body.Username }));
                redis.set(`student:${ctx.request.body.Username}`, student);
            }
            if (!student) {
                ctx.body = { msg: undefined };
            }
            else {
                student.password = ctx.request.body.Password;
                yield Student_1.Student.update(student.id, student);
                redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student));
                ctx.body = { msg: "successfully reset" };
                let department = yield Department_1.Department.findOne({ id: student.department });
                department.updatedDate = new Date;
                yield Department_1.Department.update(department.test, department);
                yield redis.hmset(`department:${department.id}`, department);
            }
            return ctx;
        });
    }
};
__decorate([
    routing_controllers_1.Get("/redis_updata"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "redis_updata", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    routing_controllers_1.Get("/getBydepartment"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get_department", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    routing_controllers_1.Get("/get_alldepartments"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get_alldepartment", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_Admin, verify.verifyToken_Username),
    routing_controllers_1.Get("/get_allstudents"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "get_allstudent", null);
__decorate([
    routing_controllers_1.Post("/register"),
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "post_register", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    routing_controllers_1.Get("/result"),
    __param(0, routing_controllers_1.QueryParam("id")), __param(1, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getByUsername", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    routing_controllers_1.Post("/reset_name"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reset_name", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    routing_controllers_1.Post("/reset_username"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reset_username", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username),
    routing_controllers_1.Post("/reset_password"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "reset_password", null);
AdminController = __decorate([
    routing_controllers_1.Controller("/admin")
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=AdminController.js.map