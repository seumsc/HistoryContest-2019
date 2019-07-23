import { tools } from '../utils/tools'
import { Controller, Ctx, Get, Param, Post, Body, Params, UseBefore } from 'routing-controllers'
import { Context } from 'koa'
import { Student } from '../entity/Student'
import { Admin } from '../entity/Admin'
import { Counsellor } from '../entity/Counsellor'
import { isPasswordValid, isUsernameValid } from '../utils/isValid'
import { Key } from '../utils/keys'
import * as jwt from 'jsonwebtoken'
import * as verify from '../config/Verify'
import { get } from 'https'
import { Department } from '../entity/Department'
const data = require('../utils/information.json')

@Controller('/admin')
export class AdminController {
	/**
	 * @api {post} /admin/getBydepartment Post a department to User
	 * @apiName get_department
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.1.1
	 * @apiDescription By using this api, the front end will send the department
	 * name to the back end. After that, the back end will post the whole students'
	 * information to the front end so that the admins can view all results.
	 * Update: the result is stored in an object which has all departments as
	 * properties and the required students' infos will be appended to the
	 * particular list, which is exactly the department property.
	 * @apiParam (Parameter) {Context} ctx A context with Department name.
	 * @apiParam (Parameter) {String} ctx:request:body:Department The requested
	 * department name.
	 * @apiSuccess (200) {Context} ctx Return the context with all students' information
	 * in the requested department.
	 * @apiSuccess (200) {Data} ctx:body Return the information of all students
	 * in the requested department and organize them in a special data structure.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/getBydepartment, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Department: xxx.department
	 *      }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Request Satisfied
	 * {
	 *   "建筑学院": [],
	 *   "机械工程学院": [],
	 *   ...,
	 *   "软件学院": [...]  // if request.body.Department = 71
	 * }
	 */
	@UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
	@Post('/getBydepartment')
	public async get_department(@Ctx() ctx: Context) {
		let department = await Department.findOne({ id: ctx.request.body.Department })
		ctx.body = require('../utils/information.json')
		ctx.body[department.name] = await Student.find({
			select: [
				'name', 'username', 'score',
				'time_use', 'password'
			],
			where: {
				department: ctx.request.body.Department
			}
		}
		)
		return ctx
	}

	/**
	 * @api {get} /admin/get_alldepartment Get all departments for User
	 * @apiName get_alldepartment
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.1.1
	 * @apiDescription By using this api, the front end will send nothing but the
	 * back end will strictly verify the user's access privilege. After that, the
	 * back end will send ordered average performances of all departments to the
	 * front end.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiSuccess (200) {Context} ctx Return the context with ordered average
	 * performances of all departments.
	 * @apiSuccess (200) {Department[]} ctx:body:Departments Return all departments'
	 * entire performance in a descending order.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/get_alldepartment, {
	 *     method: 'GET',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     }
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Request Satisfied
	 * {
	 *   Departments: [...]  // a list of departments' info
	 * }
	 */
	@UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
	@Get('/get_alldepartment')
	public async get_alldepartment(@Ctx() ctx: Context) {
		ctx.body = {
			Departments: await Department.find({
				order: { average: 'DESC' },  // 根据平均分降序选择
				select: [
					'name', 'average', 'tested_number', 'total_number'
				]
			}
			)
		}
	}

	/**
	 * @api {get} /admin/get_allstudent Get all students for User
	 * @apiName get_allstudent
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.1.0
	 * @apiDescription By using this api, the front end will send nothing but the
	 * back end will strictly verify the user's access privilege. After that, the
	 * back end will send all students' information to the front end.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiSuccess (200) {Context} ctx Return the context with all students'
	 * performance.
	 * @apiSuccess (200) {Data} ctx:body Return all students' information in a
	 * special data structure.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/get_allstudent, {
	 *     method: 'GET',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     }
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Request Satisfied
	 * {
	 *   "建筑学院": [...],  // all information of students in "建筑学院"
	 *   "机械工程学院": [...],  // all information of students in "机械工程学院"
	 *   ...,
	 *   "软件学院": [...]  // all information of students in "软件学院"
	 * }
	 */
	@UseBefore(verify.verifyToken_Admin, verify.verifyToken_Username)
	@Get('/get_allstudent')
	public async get_allstudent(@Ctx() ctx: Context) {
		let departments = await Department.find()
		ctx.body = data
		for (let department of departments) {
			console.log(department.id)
			ctx.body[department.name] = await Student.find({
					select: ['name', 'username', 'score', 'time_use', 'password'],
					where: {department: department.id}
				}
			)
		}
		return ctx
	}

	/**
	 * @api {post} /admin/reset_name Reset User's name
	 * @apiName reset_name
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.0
	 * @apiDescription By using this api, the front end will send the user's new
	 * name and the back end will verify the user by jwt. After that, the back
	 * end will reset the user's name and save it to the data base.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The user's username.
	 * @apiParam (Parameter) {String} ctx:request:body:Name The user's new real
	 * name.
	 * @apiSuccess (200) {Context} ctx Return the context with message 'successfully
	 * reset' to prompt the user a successful operation.
	 * @apiSuccess (200) {String} ctx:body:msg Prompt string 'successfully reset'.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/reset_name, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username,  // inputted username, which should be the "一卡通号"
	 *         Password: xxx.password,  // inputted password
	 *         Identity: xxx.identity  // user access level
	 *         Name: xxx.name  // user's new real name, which should be resetted
	 *       }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Request Satisfied
	 * {
	 *   msg: 'successfully reset'
	 * }
	 */
	@UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
	@Post('/reset_name')
	public async reset_name(@Ctx() ctx: Context) {
		let student = await Student.findOne({ username: ctx.request.body.Username })
		student.name = ctx.request.body.Name
		await Student.update(student.id, student)
		return ctx.body = { msg: 'successfully reset' }
	}

	/**
	 * @api {post} /admin/reset_username Reset User's username
	 * @apiName reset_username
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.0
	 * @apiDescription By using this api, the front end will send the user's new
	 * username and the back end will verify the user by jwt. After that, the back
	 * end will reset the user's username and save it to the data base.
	 * Note: in this api, the name and password are used to find the objected user,
	 * instead of using username.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The user's new username.
	 * @apiParam (Parameter) {String} ctx:request:body:Name The user's name.
	 * @apiParam (Parameter) {String} ctx:request:body:Password The user's password.
	 * @apiSuccess (200) {Context} ctx Return the context with message 'successfully
	 * reset' to prompt the user a successful operation.
	 * @apiSuccess (200) {String} ctx:body:msg Prompt string 'successfully reset'.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/reset_username, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username,  // inputted username, which should be resetted
	 *         Password: xxx.password,  // user's password
	 *         Name: xxx.name  // user's real name
	 *       }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Request Satisfied
	 * {
	 *   msg: 'successfully reset'
	 * }
	 */
	@UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
	@Post('/reset_username')
	public async reset_username(@Ctx() ctx: Context) {
		let student = await Student.findOne({ name: ctx.request.body.Name, password: ctx.request.body.Password })
		student.username = ctx.request.body.Username
		await Student.update(student.id, student)
		return ctx.body = { msg: 'successfully reset' }
	}

	/**
	 * @api {post} /admin/reset_password Reset User's password
	 * @apiName reset_password
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.0
	 * @apiDescription By using this api, the front end will send the user's new
	 * password and the back end will verify the user by jwt. After that, the back
	 * end will reset the user's password and save it to the data base.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The user's username.
	 * @apiParam (Parameter) {String} ctx:request:body:Password The user's new
	 * password.
	 * @apiSuccess (200) {Context} ctx Return the context with message 'successfully
	 * reset' to prompt the user a successful operation.
	 * @apiSuccess (200) {String} ctx:body:msg Prompt string 'successfully reset'.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/reset_password, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username,  // inputted username
	 *         Password: xxx.password,  // inputted password, which should be resetted
	 *         Identity: xxx.identity  // user access level
	 *       }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Request Satisfied
	 * {
	 *   msg: 'successfully reset'
	 * }
	 */
	@UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
	@Post('/reset_password')
	public async reset_password(@Ctx() ctx: Context) {
		let student = await Student.findOne({ username: ctx.request.body.Username })
		student.password = ctx.request.body.Password
		await Student.update(student.id, student)
		return ctx.body = { msg: 'successfully reset' }
	}

	/**
	 * @api {post} /ui/register Regiser a User
	 * @apiName post_register
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.1.1
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
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/register, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username,  // inputted username, which should be the "一卡通号"
	 *         Password: xxx.password,  // inputted password
	 *         Identity: xxx.identity  // user access level
	 *         Name: xxx.name  // user's real name
	 *       }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {status} Success-Response:
	 * HTTP/1.1 200 Successful Register
	 * ctx.status = 200
	 * @apiErrorExample {status} Error-Response:
	 * HTTP/1.1 400 Illegal Username or Password
	 * ctx.status = 400
	 * @apiErrorExample {status} Error-Response:
	 * HTTP/1.1 403 User Existed
	 * ctx.status = 403
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
				const Stu = await Student.findOne({ username: ctx.request.body.Username })
				if (!isPasswordValid(stu.password) || !isUsernameValid(stu.username)) {  // 密码不符合规范或者用户名不符合规范
					ctx.status = 400
				} else if (!Stu) {  // 学生未注册
					Student.save(stu)
					let department = await Department.findOne({ id: parseInt(stu.department, 10) })
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
				const Ad = await Admin.findOne({ username: ctx.request.body.Username })
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
				const Cou = await Counsellor.findOne({ username: ctx.request.body.Username })
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
