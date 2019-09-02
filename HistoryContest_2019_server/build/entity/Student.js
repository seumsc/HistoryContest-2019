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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Student = class Student extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 10
    }),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Student.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", String)
], Student.prototype, "identity", void 0);
__decorate([
    typeorm_1.Column() //院系序号，例：“71”，“09”
    ,
    __metadata("design:type", String)
], Student.prototype, "department", void 0);
__decorate([
    typeorm_1.Column({ default: -1 }) //得分，-1为未答题
    ,
    __metadata("design:type", Number)
], Student.prototype, "score", void 0);
__decorate([
    typeorm_1.Column({ default: -1 }) //用时，单位为s!!!!!!
    ,
    __metadata("design:type", Number)
], Student.prototype, "time_use", void 0);
__decorate([
    typeorm_1.Column({ default: null }) //开始时间，格式为Date!!!!!!!
    ,
    __metadata("design:type", Date)
], Student.prototype, "time_start", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: null }),
    __metadata("design:type", Array)
], Student.prototype, "choice_question", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: null }),
    __metadata("design:type", Array)
], Student.prototype, "judgment_question", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: null }) //选择题答题
    ,
    __metadata("design:type", Array)
], Student.prototype, "answers_choice", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: null }) //判断题答题
    ,
    __metadata("design:type", Array)
], Student.prototype, "answers_judgment", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-array", default: null }),
    __metadata("design:type", Array)
], Student.prototype, "answers", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Student.prototype, "updateDate", void 0);
Student = __decorate([
    typeorm_1.Entity()
], Student);
exports.Student = Student;
//# sourceMappingURL=Student.js.map