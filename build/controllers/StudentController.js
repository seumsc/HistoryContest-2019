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
//import entities
const ChoiceQuestion_1 = require("../entity/ChoiceQuestion");
const JudgmentQuestion_1 = require("../entity/JudgmentQuestion");
const Student_1 = require("../entity/Student");
const RandomArray_1 = require("../utils/RandomArray");
let StudentController = class StudentController {
    post(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const stu = yield yield Student_1.Student.findOne({ username: ctx.request.body.Username });
            if (stu.score == -1) {
                const arr = yield RandomArray_1.RandomArr(200, 20);
                const arr2 = yield RandomArray_1.RandomArr(100, 10);
                const questionarr1 = yield ChoiceQuestion_1.ChoiceQuestion.findByIds(arr, { select: ["id", "text", "a", "b", "c", "d"] });
                const questionarr2 = yield JudgmentQuestion_1.JudgmentQuestion.findByIds(arr, { select: ["id", "text"] });
                ctx.status = 200;
                ctx.body = yield questionarr1.concat(questionarr2);
            }
            else {
                ctx.status = 403;
            }
            return ctx;
        });
    }
    start(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = new Date();
            try {
                yield Student_1.Student.findOne({ username: ctx.request.body.Username })
                    .then(stu => {
                    stu.time_use = (d.getTime() - 1500000000000) / 1000;
                    stu.time_start = new Date;
                    Student_1.Student.update(stu.id, stu);
                });
                ctx.body = { msg: "start testing", };
            }
            catch (error) {
                ctx.body = error;
            }
            return ctx;
        });
    }
    //未完成
    result(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = new Date();
            let stu = yield Student_1.Student.findOne({ username: ctx.request.body.Username });
            if ((stu.time_use != -1) && ((d.getTime() - 1500000000000) / 1000 - stu.time_use > 1800)) {
                ctx.status = 403;
            }
            else { }
        });
    }
};
__decorate([
    routing_controllers_1.Post("/test"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "post", null);
__decorate([
    routing_controllers_1.Post("/start"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "start", null);
__decorate([
    routing_controllers_1.Post("/result"),
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