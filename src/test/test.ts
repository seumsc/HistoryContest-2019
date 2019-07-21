import {Controller, Ctx, Post} from 'routing-controllers'
import {ChoiceQuestion} from '../entity/ChoiceQuestion'
import {JudgmentQuestion} from '../entity/JudgmentQuestion'
import {Student} from '../entity/Student'
import {Context} from 'koa'
import {RandomArr} from '../utils/RandomArray'

@Controller('/student')
export class StudentController {
	/**
	 * @api {post} /student/test Post Student Test Paper.
	 * @apiName post
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.0.3
	 * @apiDescription By using this api, the front end can post a test paper
	 * for the objected student.
	 * If the student has not answered any paper, a randomly constructed paper
	 * should be posted.
	 * If the student has answered a paper, the state 403 will be responsed.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:Username The username of the student.
	 *
	 * @apiSuccess (200) {Context} ctx Return the context with a randomly chosen paper.
	 * @apiSuccess (200) {Paper} ctx:body Return the context with a randomly chosen paper in response body.
	 * @apiSuccess (200) {Number} ctx:status Return the context with successful status.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return the error status.
	 */
	@Post('/test')
	public async post(@Ctx() ctx: Context) {
		// 获取前端发送的用户名
		let stu: Student = await await Student.findOne({username: ctx.request.body.Username})
		// 尚未答题
		if (stu.score === -1) {
			// 生成两个随机数组，应用为选择题和判断题的序号
			let arr: number[] = await RandomArr(200, 20)
			let arr2: number[] = await RandomArr(100, 10)
			// 通过数组获取选择题与判断题
			let questionarr1: any[] = await ChoiceQuestion.findByIds(
				arr, {select: ['text', 'options', 'answer']})
			let questionarr2: any[] = await JudgmentQuestion.findByIds(
				arr, {select: ['text', 'answer']})
			// 将题目(包括题干，选项，答案)保存在用户的paper对象中
			stu.paper.Choice_question = questionarr1
			stu.paper.Judgment_question = questionarr2
			ctx.status = 200
			// 除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
			ctx.body = {
				Paper: {
					Choice_question: await (
						questionarr1.map(
							a => {
								delete a.answer
								return a
							}
						)
					),
					Judgment_question: await (
						questionarr2.map(
							a => {
								delete a.answer
								return a
							}
						)
					)
				}
			}
			await Student.update(stu.id, stu)  // 更新用户数据
		} else {
			ctx.status = 403
		}
		return ctx
	}
}
