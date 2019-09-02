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
const routing_controllers_1 = require("routing-controllers");
const jwt = require("jsonwebtoken");
const keys_1 = require("../utils/keys");
//import entities
const Student_1 = require("../entity/Student");
//import utils
const RandomArray_1 = require("../utils/RandomArray");
const verify = require("../config/Verify");
const Department_1 = require("../entity/Department");
const redis = require("../config/redis");
let choices = require("../Data/choice_question.json");
let judgements = require("../Data/judgment_question.json");
let StudentController = class StudentController {
    /**
     * @method Get
     * @access student
     * 获取试卷
     * 后端判断是否已有得分,无则返回题目的序号
     * 200:successful 403:已有得分
     */
    test(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataString = ctx.header.authorization;
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            let student = eval(`(${yield redis.get(`student:${data.username}`)})`);
            if (!student) {
                student = (yield Student_1.Student.findOne({ username: data.username }));
                redis.set(`student:${data.username}`, JSON.stringify(student));
            }
            if (student.score == -1) {
                //生成两个随机数组，应用为选择题和判断题的序号
                const choice_id = yield RandomArray_1.RandomArr(20, 20);
                const judgment_id = yield RandomArray_1.RandomArr(10, 10);
                student.answers_choice = [];
                student.answers_judgment = [];
                choice_id.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    student.answers_choice.push(choices.RECORDS[element - 1].answer);
                }));
                judgment_id.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    student.answers_judgment.push(judgements.RECORDS[element - 1].answer);
                }));
                student.choice_question = choice_id;
                student.judgment_question = judgment_id;
                ctx.status = 200;
                //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
                ctx.body = { Paper: { Choice_question: choice_id, Judgment_question: judgment_id } };
                yield Student_1.Student.update(student.id, student);
                redis.set(`student:${data.username}`, JSON.stringify(student));
            } //更新用户数据
            else {
                ctx.status = 403;
            }
            return ctx;
        });
    }
    /**
     * @method Get
     * @access student
     * 开始答题
     */
    start(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            const dataString = ctx.header.authorization;
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            let student = eval(`(${yield redis.get(`student:${data.username}`)})`);
            if (!student) {
                student = (yield Student_1.Student.findOne({ username: data.username }));
                yield redis.set(`student:${data.username}`, JSON.stringify(student));
            }
            student.time_use = (date.getTime() - 1560000000000) / 1000;
            student.time_start = new Date;
            Student_1.Student.update(student.id, student);
            redis.set(`student:${data.username}`, JSON.stringify(student), (err) => { console.log(err); });
            ctx.body = { msg: "start testing" };
            return ctx;
        });
    }
    /**
     * @method Post
     * @access student
     * 交卷
     */
    handin(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date();
            const dataString = ctx.header.authorization;
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            let student = eval(`(${yield redis.get(`student:${data.username}`)})`);
            if (!student) {
                student = yield Student_1.Student.findOne({ username: data.username });
                redis.set(`student:${data.username}`, JSON.stringify(student));
            }
            if ((((date.getTime() - 1560000000000) / 1000 - student.time_use > 1800) || (student.score != -1))) {
                ctx.status = 200;
                ctx.body = { msc: (date.getTime() - 1560000000000) / 1000 - student.time_use };
            }
            else if ((date.getTime() - 1560000000000) / 1000 - student.time_use < 180) //设置最短时间
             {
                ctx.body = { msg: "答题时间过短,请认真答题" };
            }
            else {
                student.time_use = (date.getTime() - 1560000000000) / 1000 - student.time_use;
                student.score = 0;
                for (let i = 0; i < 20; i++) {
                    if (ctx.request.body.Answer[i] == student.answers_choice[i])
                        student.score += 4;
                }
                for (let i = 0; i < 10; i++) {
                    if (ctx.request.body.Answer[i + 20] == student.answers_judgment[i])
                        student.score += 2;
                }
                student.answers = ctx.request.body.Answer;
                redis.hgetall(`department:${student.department}`, (err, object) => {
                    const n = object.average * object.tested_number;
                    object.tested_number++;
                    object.average = (n + student.score) / object.tested_number;
                    redis.hmset(`department:${student.department}`, object);
                    Department_1.Department.update(object.test, object);
                });
                Student_1.Student.update(student.id, student);
                redis.set(`student:${data.username}`, JSON.stringify(student));
                ctx.body = { Score: student.score };
            }
            return ctx;
        });
    }
    /**
     * @method Get
     * @access student
     * 查分
     */
    result(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataString = ctx.header.authorization;
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            let student = eval(`(${yield redis.get(`student:${data.username}`)})`);
            if (!student) {
                student = (yield Student_1.Student.findOne({ username: data.username }));
                redis.set(`student:${data.username}`, JSON.stringify(student));
            }
            if (!ctx.request.get("If-Modified-Since") || ctx.request.get("If-Modified-Since") != `${student.updateDate}`) {
                ctx.body = { Paper: { Choice_question: student.choice_question, Judgment_question: student.judgment_question },
                    Score: student.score,
                    Answer: { Choice_answers: student.answers_choice, Judgment_answers: student.answers_judgment },
                    User_answer: student.answers };
                ctx.response.set({
                    'Last-Modified': `${student.updateDate}`,
                    'Cache-Control': "no-cache"
                });
            }
            else {
                ctx.status = 304;
            }
            return ctx;
        });
    }
};
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_Student, verify.verifyToken_Username),
    routing_controllers_1.Get("/test"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "test", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_Student, verify.verifyToken_Score),
    routing_controllers_1.Get("/start"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "start", null);
__decorate([
    routing_controllers_1.UseBefore(verify.verifyToken_Student, verify.verifyToken_Score),
    routing_controllers_1.Post("/handin"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "handin", null);
__decorate([
    routing_controllers_1.Get("/result"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "result", null);
StudentController = __decorate([
    routing_controllers_1.Controller("/student")
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=StudentController.js.map