import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from 'koa';
import * as Router from "koa-router";
import * as cors from "koa2-cors"
import{createKoaServer}from "routing-controllers"
//import Controllers
import { StudentController } from "./controllers/StudentController";
import { UIController } from "./controllers/UIController";
import {AdminController} from "./controllers/AdminController"
import {redis_all,redis_user} from "../src/utils/tools"
import {Port}from "./config/conf"
 const app:Koa=createKoaServer({
      routePrefix:"/api",
      // controllers:["/src/controllers/*.ts"],
    controllers:[UIController,StudentController,AdminController],
 })
const redis=require('../src/config/redis')
//初始化路由
const router=new Router();

//为跨域进行cors设置
app.use(async(ctx,next)=> {cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
})
  await next()
})
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx,next)=>{
    console.log("url:",ctx.url)
    await next();
 })

app.listen(`${Port}`,()=>{
    console.log(`server started on ${Port}`)
    
})

createConnection().then(async connection => {
  console.log("connected successfully!") 
  redis_all();
})
.catch(error => console.log(error))

setInterval(redis_user,600000)
