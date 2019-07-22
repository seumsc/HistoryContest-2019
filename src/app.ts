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

 const app:Koa=createKoaServer({
      routePrefix:"/api",
      // controllers:["/src/controllers/*.ts"],
    controllers:[UIController,StudentController,AdminController],
 })
// //  const app=new Koa();
 const router=new Router();

app.use(router.routes()).use(router.allowedMethods());
app.use(passport.initialize()).use(passport.session());

 app.use(async (ctx,next)=>{
    console.log("url:",ctx.url)
    await next();
 })



app.listen(5000,()=>{
    console.log('server started on 5000')
    
})

createConnection().then(async connection => {
    console.log("connected successfully!") 
  })
.catch(error => console.log(error))