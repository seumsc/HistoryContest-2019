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
const typeorm_1 = require("typeorm");
const Router = require("koa-router");
const cors = require("koa2-cors");
const routing_controllers_1 = require("routing-controllers");
//import Controllers
const StudentController_1 = require("./controllers/StudentController");
const UIController_1 = require("./controllers/UIController");
const AdminController_1 = require("./controllers/AdminController");
const tools_1 = require("../src/utils/tools");
const conf_1 = require("./config/conf");
const app = routing_controllers_1.createKoaServer({
    routePrefix: "/api",
    // controllers:["/src/controllers/*.ts"],
    controllers: [UIController_1.UIController, StudentController_1.StudentController, AdminController_1.AdminController],
});
const redis = require('../src/config/redis');
//初始化路由
const router = new Router();
//为跨域进行cors设置
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("url:", ctx.url);
    yield next();
}));
app.listen(`${conf_1.Port}`, () => {
    console.log(`server started on ${conf_1.Port}`);
});
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log("connected successfully!");
    tools_1.redis_all();
}))
    .catch(error => console.log(error));
setInterval(tools_1.redis_user, 600000);
//# sourceMappingURL=app.js.map