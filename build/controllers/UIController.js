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
const Student_1 = require("../entity/Student");
const Admin_1 = require("../entity/Admin");
const Counsellor_1 = require("../entity/Counsellor");
const isValid_1 = require("../utils/isValid");
let UIController = class UIController {
    post_login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (ctx.request.body.Identity) {
                case '0':
                    const stu = yield Student_1.Student.findOne({ username: ctx.request.body.Username });
                    if (!stu) {
                        ctx.status = 404;
                    }
                    else if (stu.password != ctx.request.body.Password) {
                        ctx.status = 403;
                    }
                    else {
                        ctx.status = 200;
                        ctx.body = { Name: stu.name, Score: stu.score, Time: stu.time_use };
                    }
                    break;
                case '1':
                    const admin = yield Admin_1.Admin.findOne({ username: ctx.request.body.Username });
                    if (!admin) {
                        ctx.status = 404;
                    }
                    else if (admin.password != ctx.request.body.Password) {
                        ctx.status = 403;
                    }
                    else {
                        ctx.status = 200;
                        ctx.body = { Name: admin.name };
                    }
                    break;
                case '2':
                    const counsellor = yield Counsellor_1.Counsellor.findOne({ username: ctx.request.body.Username });
                    if (!counsellor) {
                        ctx.status = 404;
                    }
                    else if (counsellor.password != ctx.request.body.Password) {
                        ctx.status = 403;
                    }
                    else {
                        ctx.status = 200;
                        ctx.body = { name: counsellor.name };
                    }
                    break;
            }
            return ctx;
        });
    }
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
                    const Stu = yield Student_1.Student.findOne({ username: ctx.request.body.Username });
                    if ((!isValid_1.isPasswordValid(stu.password)) || (!isValid_1.isUsernameValid(stu.username))) {
                        ctx.status = 400;
                    }
                    else if (!Stu) {
                        Student_1.Student.save(stu);
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
    get_admin_all(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = { admin: yield Admin_1.Admin.find({ select: ["name", "username"] }) };
            return ctx;
            // return await Admin.find()
        });
    }
    get_student_all(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = { student: yield Student_1.Student.find({ select: ["name", "username", "department", "score", "time_use", "time_start"] }) };
            return ctx;
        });
    }
};
__decorate([
    routing_controllers_1.Post("/login"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UIController.prototype, "post_login", null);
__decorate([
    routing_controllers_1.Post("/register"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UIController.prototype, "post_register", null);
__decorate([
    routing_controllers_1.Get("/getadminall"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UIController.prototype, "get_admin_all", null);
__decorate([
    routing_controllers_1.Get("/getstudentall"),
    __param(0, routing_controllers_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UIController.prototype, "get_student_all", null);
UIController = __decorate([
    routing_controllers_1.Controller("/ui")
], UIController);
exports.UIController = UIController;
//# sourceMappingURL=UIController.js.map