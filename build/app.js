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
require("reflect-metadata");
const Router = require("koa-router");
const routing_controllers_1 = require("routing-controllers");
// import Entities
// import { Student } from './entity/Student'
// import { Admin } from './entity/Admin'
// import { Counsellor } from './entity/Counsellor'
// import Controllers
const StudentController_1 = require("./controllers/StudentController");
const UIController_1 = require("./controllers/UIController");
// Step1: 初始化服务器对象
let app = routing_controllers_1.createKoaServer({
    controllers: [UIController_1.UIController, StudentController_1.StudentController],
    // controllers: ['/src/controllers/*.ts'],
    routePrefix: '/api',
});
// Step2: 初始化路由器, 用以之后对各个网页路径的获取内容
let router = new Router();
// Step3: 服务器加载路由器中所有的函数
app.use(router.routes()).use(router.allowedMethods());
// 测试服务器响应
let testFunction = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('Hello ParanoidRoot');
    console.log(ctx.url);
    yield next();
});
app.use(testFunction);
app.listen(5000, () => {
    console.log('server started on 5000');
});
// createConnection().then(async connection => {
//     console.log("connected successfully!") 
//   })
// .catch(error => console.log(error))
//# sourceMappingURL=app.js.map