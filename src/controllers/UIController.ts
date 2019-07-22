import {Controller, Ctx, Get, Param, Post, Body, Params, UseBefore} from 'routing-controllers'
import {Context} from 'koa'
import {Student} from '../entity/Student'
import {Admin} from '../entity/Admin'
import {Counsellor} from '../entity/Counsellor'
import {isPasswordValid, isUsernameValid} from '../utils/isValid'
import {Key} from '../utils/keys'
import * as jwt from 'jsonwebtoken'
import * as verify from '../config/Verify'
import {get} from 'https'
import {Department} from '../entity/Department'

@Controller('/ui')
export class UIController {
	/**
	 * @api {post} /ui/login 1. User Login
	 * @apiName post_login
	 * @apiGroup UIAPIs
	 * @apiVersion 0.0.2
	 * @apiDescription By using this api, the front end will tell the back end
	 * about the information of the user who is requesting login, which will
	 * include the user's inputted username and password. After that, the back end
	 * will verify his/her inputted username and password. If the request is allowed,
	 * the back end will send a 200 status with a json web token to the front end.
	 * @apiParam (Parameter) {Context} ctx A context with user's inputted username and
	 * password.
	 * @apiParam (Parameter) {Number} ctx:request:body:Identity The identity of
	 * the user, which uses 0, 1 and 2 to represent Student, Admin and Counsellor.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The inputted username of
	 * the requesting user.
	 * @apiParam (Parameter) {String} ctx:request:body:Password The inputted password of
	 * the requesting user.
	 * @apiSuccess (200) {Context} ctx Return the context with the user's name,
	 * the json web token, which is used to further session, and the status 200.
	 * Update: the departments of students and counsellors are also included.
	 * @apiSuccess (200) {String} ctx:body:Name Return the username of the user.
	 * @apiSuccess (200) {String} ctx:body:Token Return the json web token of
	 * the objected user.
	 * @apiSuccess (200) {String} ctx:body:Department Return the department of
	 * the user.
	 * @apiSuccess (200) {String} ctx:status Return the 200 status to represent
	 * successful login request.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return 403 status to represent that the
	 * password inputted by the user is incorrect.
	 * @apiError (404) {Context} ctx Return the context with a 404 status.
	 * @apiError (404) {Number} ctx:status Return 404 status to represent that the
	 * user is not in the data base, which may be because the user has not registered.
	 * @apiPermission student, admin, counsellor
	 */
	@Post('/login')
	public async post_login(@Ctx() ctx: Context) {
		switch (ctx.request.body.Identity) {
			case '0':  // 学生
				let stu = await Student.findOne({username: ctx.request.body.Username})
				let department = await Department.findOne({id: parseInt(stu.department, 10)})
				if (!stu) {  // 未找到学生
					ctx.status = 404
				} else if (stu.password !== ctx.request.body.Password) {  // 密码错误
					ctx.status = 403
				} else {  // 生成登陆的 Cookie, 使用 JWT 方式
					const payload = {
						identity: stu.identity,
						username: stu.username,
						score: stu.score
					}
					const token = jwt.sign(payload, Key, {expiresIn: 3600})
					// console.log(token)
					ctx.status = 200
					ctx.body = {
						Name: stu.name,
						Score: stu.score,
						Token: 'Bearer ' + token,
						Department: department.name
					}
				}
				break
			case '1':  // 管理员
				const admin = await Admin.findOne({username: ctx.request.body.Username})
				if (!admin) {
					ctx.status = 404
				} else if (admin.password !== ctx.request.body.Password) {
					ctx.status = 403
				} else {
					const payload = {identity: admin.identity, username: admin.username}
					const token = jwt.sign(payload, Key, {expiresIn: 3600})
					ctx.status = 200
					ctx.body = {
						Name: admin.name,
						Token: 'Bearer ' + token
					}
				}
				break
			case '2':  // 辅导员
				const counsellor = await Counsellor.findOne({username: ctx.request.body.Username})
				let department1 = await Department.findOne({id: parseInt(counsellor.department, 10)})
				if (!counsellor) {
					ctx.status = 404
				} else if (counsellor.password !== ctx.request.body.Password) {
					ctx.status = 403
				} else {
					const payload = {
						identity: counsellor.identity,
						username: counsellor.username,
						department: counsellor.department
					}
					const token = jwt.sign(payload, Key, {expiresIn: 3600})
					ctx.status = 200
					ctx.body = {
						Name: counsellor.name,
						Token: 'Bearer ' + token,
						Department: department1.name
					}
				}
				break
		}
		return ctx
	}

	/**
	 * @api {post} /ui/register 2. User Regiser
	 * @apiName post_register
	 * @apiGroup UIAPIs
	 * @apiVersion 0.0.1
	 * @apiDescription By using this api, the front end will send the jwt back for
	 * the back end to strictly verify the user's access privilege and after that,
	 * the back end will using the user's inputted username and password to
	 * register a particular account for the user, which includes Student, Admin
	 * and Counsellor, and finally save the user infos to the data base.
	 * @apiParam (Parameter) {Context} ctx A context with user's jwt, inputted username
	 * and password, and his/her user type.
	 * @apiParam (Parameter) {Number} ctx:request:body:Identity The identity of
	 * the user, which uses 0, 1 and 2 to represent Student, Admin and Counsellor.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The inputted
	 * username of the requesting user.
	 * @apiParam (Parameter) {String} ctx:request:body:Password The inputted
	 * password of the requesting user.
	 * @apiSuccess (200) {Context} ctx Return the context with a 200 status.
	 * @apiSuccess (200) {Number} ctx:status Return 200 status to represent a
	 * successful regiser.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return 403 status to represent that the
	 * user has already existed.
	 * @apiError (404) {Context} ctx Return the context with a 404 status.
	 * @apiError (404) {Number} ctx:status Return 404 status to represent that the
	 * user's inputted username or password is not legal.
	 * @apiPermission admin, counsellor
	 */
	@Post('/register')
	@UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
	public async post_register(@Ctx() ctx: Context) {
		switch (ctx.request.body.Identity) {
			case '0':  // 学生
				let stu = new Student()
				stu.identity = '0'
				stu.username = ctx.request.body.Username
				stu.name = ctx.request.body.Name
				stu.password = ctx.request.body.Password
				stu.department = stu.username[0] + stu.username[1]
				stu.score = -1
				const Stu = await Student.findOne({username: ctx.request.body.Username})
				if (!isPasswordValid(stu.password) || !isUsernameValid(stu.username)) {  // 密码不符合规范或者用户名不符合规范
					ctx.status = 400
				} else if (!Stu) {  // 学生未注册
					Student.save(stu)
					let department = await Department.findOne({id: parseInt(stu.department, 10)})
					department.total_number += 1
					Department.update(department.test, department)  // 根据系别的序号(非71等院系号), 找到院系, 更新其总共的注册人数
					ctx.status = 200  // 成功注册
				} else {  // 用户已经注册
					ctx.status = 403
				}
				break
			case '1':  // 管理员
				let admin = new Admin()
				admin.identity = '1'
				admin.username = ctx.request.body.Username
				admin.name = ctx.request.body.Name
				admin.password = ctx.request.body.Password
				const Ad = await Admin.findOne({username: ctx.request.body.Username})
				if (!isPasswordValid(admin.password) || !isUsernameValid(admin.username)) {
					ctx.status = 400
				} else if (!Ad) { // 数据库中无这位管理员
					Admin.save(admin)
					ctx.status = 200  // 成功注册
				} else {  // 已经注册
					ctx.status = 403
				}
				break
			case '2':
				let counsellor = new Counsellor()
				counsellor.identity = '2'
				counsellor.username = ctx.request.body.Username
				counsellor.name = ctx.request.body.Name
				counsellor.password = ctx.request.body.Password
				counsellor.department = counsellor.username[0] + counsellor.username[1]
				const Cou = await Counsellor.findOne({username: ctx.request.body.Username})
				if (!isPasswordValid(counsellor.password) || !isUsernameValid(counsellor.username)) {
					ctx.status = 400
				} else if (!Cou) {
					Counsellor.save(counsellor)
					ctx.status = 200
				} else {
					ctx.status = 403
				}
				break
		}
		return ctx
	}
}
