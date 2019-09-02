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
const keys_1 = require("../utils/keys");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
let UIController = class UIController {
    /**
     * @method Post
     * @access open
     * 登录
     */
    post_login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.request.body);
            switch (ctx.request.body.Identity) {
                case '0':
                    let student = eval(`(${yield redis.get(`student:${ctx.request.body.Username}`)})`);
                    if (!student) {
                        student = yield Student_1.Student.findOne({ username: ctx.request.body.Username });
                        redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student));
                    }
                    if (!student) {
                        ctx.status = 404;
                    }
                    else if (student.password != ctx.request.body.Password) {
                        ctx.status = 403;
                    }
                    else {
                        let department = undefined;
                        yield redis.hgetall(`department:${student.department}`, (err, object) => { department = object; });
                        const payload = { identity: student.identity, username: student.username, score: student.score };
                        const token = jwt.sign(payload, keys_1.Key, { expiresIn: 3600 });
                        ctx.status = 200;
                        ctx.body = { Name: student.name, Score: student.score, Token: "Bearer " + token, Department: department.name, Id: student.department };
                    }
                    return ctx;
                case '1':
                    let admin = yield redis.hgetall(`admin:${ctx.request.body.Username}`);
                    if (!admin) {
                        admin = (yield Admin_1.Admin.findOne({ username: ctx.request.body.Username }));
                        redis.hmset(`admin:${ctx.request.body.Username}`, admin);
                    }
                    if (!admin) {
                        ctx.status = 404;
                    }
                    else if (admin.password != ctx.request.body.Password) {
                        ctx.status = 403;
                    }
                    else {
                        const payload = { identity: admin.identity, username: admin.username };
                        const token = jwt.sign(payload, keys_1.Key, { expiresIn: 3600 });
                        ctx.status = 200;
                        ctx.body = { Name: admin.name, Token: "Bearer " + token };
                    }
                    return ctx;
                case '2':
                    let counsellor = yield redis.hgetall(`counsellor:${ctx.request.body.Username}`);
                    if (!counsellor) {
                        counsellor = (yield Counsellor_1.Counsellor.findOne({ username: ctx.request.body.Username }));
                        redis.hmset(`counsellor:${ctx.request.body.Username}`, counsellor);
                    }
                    let department = undefined;
                    yield redis.hgetall(`department:${counsellor.department}`, (err, object) => __awaiter(this, void 0, void 0, function* () { department = object; }));
                    if (!counsellor) {
                        ctx.status = 404;
                    }
                    else if (counsellor.password != ctx.request.body.Password) {
                        ctx.status = 403;
                    }
                    else {
                        const payload = { identity: counsellor.identity, username: counsellor.username, department: counsellor.department };
                        const token = jwt.sign(payload, keys_1.Key, { expiresIn: 3600 });
                        ctx.status = 200;
                        ctx.body = { Name: counsellor.name, Token: "Bearer " + token, Department: department.name, Id: counsellor.department };
                    }
                    return ctx;
            }
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
UIController = __decorate([
    routing_controllers_1.Controller("/ui")
], UIController);
exports.UIController = UIController;
//# sourceMappingURL=UIController.js.map