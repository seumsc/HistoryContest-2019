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
const jwt = require("jsonwebtoken");
const keys_1 = require("../utils/keys");
const Student_1 = require("../entity/Student");
const Admin_1 = require("../entity/Admin");
const Counsellor_1 = require("../entity/Counsellor");
//验证是否为学生
function verifyToken_Student(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = ctx.header.authorization;
        try {
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            if (data.identity == '0') {
                ctx.status = 200;
                yield next();
            }
        }
        catch (err) {
            ctx.body = err;
        }
    });
}
exports.verifyToken_Student = verifyToken_Student;
//验证是否用户
function verifyToken_User(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = ctx.header.authorization;
        try {
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            if (data.identity == '0' || '1' || '2') {
                ctx.status = 200;
                yield next();
            }
        }
        catch (err) {
            ctx.body = err;
            return ctx;
        }
    });
}
exports.verifyToken_User = verifyToken_User;
//验证是否拥有管理员权限
function verifyToken_CousellorOrAdmin(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = ctx.header.authorization;
        try {
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            if (data.identity == '1' || '2') {
                ctx.status = 200;
                yield next();
            }
        }
        catch (err) {
            ctx.body = err;
            return ctx;
        }
    });
}
exports.verifyToken_CousellorOrAdmin = verifyToken_CousellorOrAdmin;
//验证是否为超管
function verifyToken_Admin(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = ctx.header.authorization;
        try {
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            if (data.identity == '1') {
                ctx.status = 200;
                yield next();
            }
        }
        catch (err) {
            ctx.body = err;
            return ctx;
        }
    });
}
exports.verifyToken_Admin = verifyToken_Admin;
//验证是否用户名存在
function verifyToken_Username(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = ctx.header.authorization;
        try {
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            switch (data.identity) {
                case '0':
                    const stu = yield Student_1.Student.findOne({ username: data.username });
                    if (!stu) {
                        ctx.status = 400;
                    }
                    else {
                        ctx.status = 200;
                        yield next();
                    }
                    break;
                case '1':
                    const admin = yield Admin_1.Admin.findOne({ username: data.username });
                    if (!admin) {
                        ctx.status = 400;
                    }
                    else {
                        ctx.status = 200;
                        yield next();
                    }
                    break;
                case '2':
                    const counsellor = yield Counsellor_1.Counsellor.findOne({ username: data.username });
                    if (!counsellor) {
                        ctx.status = 400;
                    }
                    else {
                        ctx.status = 200;
                        yield next();
                    }
                    break;
            }
        }
        catch (err) {
            ctx.body = err;
            return ctx;
        }
    });
}
exports.verifyToken_Username = verifyToken_Username;
function verifyToken_Score(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataString = ctx.header.authorization;
        try {
            const dataArr = dataString.split(' ');
            const token = dataArr[1];
            let playload = yield jwt.verify(token, keys_1.Key);
            const data = playload;
            if (data.score == -1) {
                ctx.status = 200;
                yield next();
            }
            else {
                ctx.status = 403;
                ctx.body = { msg: "非法访问" };
            }
        }
        catch (err) {
            ctx.body = err;
            return ctx;
        }
    });
}
exports.verifyToken_Score = verifyToken_Score;
//# sourceMappingURL=Verify.js.map