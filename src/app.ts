import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Koa from 'koa';
import * as Router from "koa-router";
import{createKoaServer}from "routing-controllers"

//import Entities
import {Student}from "./entity/Student"
import {Admin}from "./entity/Admin"
import {Counsellor}from "./entity/Counsellor"
//import Controllers
import { StudentController } from "./controllers/StudentController";
import { UIController } from "./controllers/UIController";


 const app:Koa=createKoaServer({
      routePrefix:"/api",
    //   controllers:[__dirname + "/controllers/.."],
    controllers:[UIController],
 })
// //  const app=new Koa();
 const router=new Router();

app.use(router.routes()).use(router.allowedMethods());


 app.use(async (ctx,next)=>{
    console.log("url:",ctx.url)
    await next();
 })



app.listen(5000,()=>{
    console.log('server started on 5000')
    
})

const Connections=createConnection({
    type:"mysql",
    host:"localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "historycontest",
    entities:[__dirname+"/entity/*.ts"],
    synchronize:true,
}).then(async connection => {
    console.log("connected successfully!") 
  })
.catch(error => console.log(error))