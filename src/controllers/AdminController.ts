import {Student} from '../entity/Student'
import {Controller, Ctx, Post, Get} from 'routing-controllers'
import {Context} from 'vm'
import {tools} from '../utils/tools'

@Controller('/admin')
export class AdminController {
	/**
	 * @api {post} /admin/getBydepartment 1. Post Students' Info to the Admin by Department
	 * @apiName get_department
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.0.2
	 * @apiDescription By using this api, the front end will send the department
	 * name to the back end. After that, the back end will post the whole students'
	 * information to the front end so that the admins can view the results.
	 * @apiParam (Parameter) {Context} ctx A context with Department name.
	 * @apiParam (Parameter) {String} ctx:request:body:Department The requested
	 * department name.
	 * @apiSuccess (200) {Context} ctx Return the context with all students' information
	 * in the requested department.
	 * @apiSuccess (200) {Student[]} ctx:body:Students Return the information of
	 * the students in the requested department.
	 * @apiPermission admin, counsellor
	 */
	@Post('/getBydepartment')
	public async get_department(@Ctx() ctx: Context) {
		ctx.body = {
			Students: await Student.find({department: ctx.request.body.Department})
		}
		ctx.body.Students = ctx.body.Students.map(
			(a) => {
				return {
					name: a.name,
					username: a.username,
					score: a.score,
					time_use: a.time_use,
					password: a.password
				}
			}
		)
		return ctx
	}

	/**
	 * @api {post} /admin/reset 2. Enable User to Reset Student's Username & Password
	 * @apiName reset
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.0.2
	 * @apiDescription By using this api, the front end will send the student's
	 * old username, new username and new password to the back end. After that,
	 * the back end will reset the new information of the student and update it
	 * to the data base.
	 * @apiParam (Parameter) {Context} ctx A context with old username, new username
	 * and new password.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The old username.
	 * @apiSuccess (200) {Context} ctx Return the context with message 'successfully
	 * reset' to prompt the user a successful operation.
	 * @apiSuccess (200) {String} ctx:body:msg Prompt string 'successfully reset'.
	 * @apiPermission admin, counsellor
	 */
	@Post('/reset')
	public async reset(@Ctx() ctx: Context) {
		let student = await Student.findOne({username: ctx.request.body.Username})
		student.name = ctx.request.body.Name
		student.password = ctx.request.body.Password
		await Student.update(student.id, student)
		return ctx.body = {msg: 'successfully reset'}
	}

	/**
	 * @api {get} /admin/getall 3. Get All Students' Informations
	 * @apiName get_all
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.0.1
	 * @apiDescription By using this api, the front end will check the access
	 * privilege strictly. After that, this api will return all students'
	 * information to the front end.
	 * @apiParam (Parameter) {Context} ctx A context which has passed the access
	 * privilege validation.
	 * @apiParam (Parameter) {String} ctx:request:body:Department The requested
	 * department name.
	 * @apiSuccess (200) {Context} ctx Return the context with all students' information
	 * in the response body.
	 * @apiSuccess (200) {Student[]} ctx:body:Students Return the information of
	 * all students.
	 * @apiPermission admin
	 */
	@Get('/getall')
	public async get_all(@Ctx() ctx: Context) {
		ctx.body = {Students: await Student.find()}
		ctx.body.Students = await ctx.body.Students.map(
			(a) => {
				return {
					name: a.name,
					username: a.username,
					score: a.score,
					time_use: a.time_use,
					password: a.password
				}
			}
		)
		return ctx
	}
}
