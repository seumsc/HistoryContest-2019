// import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as Koa from 'koa';
import * as Router from "koa-router";

// import{createKoaServer,useContainer}from "routing-controllers"
// import { UserController } from "./controllers/Usercontroller";

//  const app:Koa= createKoaServer({
//       controllers:[UserController],
//  });
 const app=new Koa()
 const router=new Router();

 app.use(async (ctx,next)=>{
    console.log("url:",ctx.url)
    await next();
 })
app.use(router.routes()).use(router.allowedMethods())


app.listen(8080,()=>{
    console.log('server started on 8080')
})

createConnection().then(async connection => {
    console.log("connected successfully!") // here you can start to work with your entities
    let admin=   new User();
    admin.name="任栗晗"
    admin.id=1
    admin.username="admin"
    admin.password="hkhtql"
    admin.identity=1
    admin.department=71
    return await connection.manager.save(admin).then(User =>{console.log(admin.id," user has been saved.")})
}).catch(error => console.log(error))