import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import { createKoaServer } from 'routing-controllers'
// import Entities
// import { Student } from './entity/Student'
// import { Admin } from './entity/Admin'
// import { Counsellor } from './entity/Counsellor'
// import Controllers
import { StudentController } from './controllers/StudentController'
import { UIController } from './controllers/UIController'
import { Context } from 'koa'

// Step1: 初始化服务器对象
let app: Koa = createKoaServer({
	controllers: [UIController, StudentController],
	// controllers: ['/src/controllers/*.ts'],
	routePrefix: '/api',
 })
// Step2: 初始化路由器, 用以之后对各个网页路径的获取内容
let router: Router = new Router()
// Step3: 服务器加载路由器中所有的函数
app.use(router.routes()).use(router.allowedMethods())

// 测试服务器响应
let testFunction = async (ctx: Context, next) => {
	console.log('Hello ParanoidRoot')
	console.log(ctx.url)
	await next()
}
app.use(testFunction)
app.listen(5000, () => {
	console.log('server started on 5000')
})
// createConnection().then(async connection => {
//     console.log("connected successfully!")
// })
// .catch(error => console.log(error))
