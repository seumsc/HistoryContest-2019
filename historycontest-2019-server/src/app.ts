import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from 'koa';
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser"
import * as passport from "koa-passport"
import{createKoaServer}from "routing-controllers"
//import Controllers
import { StudentController } from "./controllers/StudentController";
import { UIController } from "./controllers/UIController";
import {AdminController} from "./controllers/AdminController"
import {Port}from "./config/config"
import {Admin} from "./entity/Admin"

 const app:Koa=createKoaServer({
      routePrefix:"/api",
      // controllers:["/src/controllers/*.ts"],
    controllers:[UIController,StudentController,AdminController],
 })
//初始化路由
const router=new Router();
app.use(router.routes()).use(router.allowedMethods());
//初始化passport
// app.use(passport.initialize()).use(passport.session());

app.use(async (ctx,next)=>{
    console.log("url:",ctx.url)
    await next();
 })

app.listen(`${Port}`,()=>{
    console.log(`server started on ${Port}`)
    
})

createConnection().then(async connection => {
  // let user=new Admin()
  //   user.username="71118118";
  //   user.password="213183580"
  //   user.name="任栗晗"
  //   Admin.save(user);  
  console.log("connected successfully!") 
  })
.catch(error => console.log(error))