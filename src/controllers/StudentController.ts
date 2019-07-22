import {Controller, Ctx, Post} from 'routing-controllers'
import {ChoiceQuestion} from '../entity/ChoiceQuestion'
import {JudgmentQuestion} from '../entity/JudgmentQuestion'
import {Student} from '../entity/Student'
import {Context} from 'koa'
import {RandomArr} from '../utils/RandomArray'

@Controller('/student')
export class StudentController {
	/**
	 * @api {post} /student/test 1. Post Student Test Paper
	 * @apiName post
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.0.3
	 * @apiDescription By using this api, the front end can post a test paper
	 * for the objected student.
	 * If the student has not answered any paper, a randomly constructed paper
	 * should be posted.
	 * If the student has answered a paper, the state 403 will be responsed.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The username of the student.
	 *
	 * @apiSuccess (200) {Context} ctx Return the context with a randomly chosen paper.
	 * @apiSuccess (200) {Paper} ctx:body:Paper Return a randomly chosen paper in response body.
	 * @apiSuccess (200) {Number} ctx:status Return the successful status.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return the error status.
	 * @apiPermission student
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

	/**
	 * @api {post} /student/start 2. Enable Student to Start the Test
	 * @apiName start
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.0.3
	 * @apiDescription By using this api, the front end will tell the back end
	 * the student's username. After that, the back end will record his/her start
	 * time, which is used to supervise his/her total test time, and allow the
	 * student to start his/her test.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The username of the student.
	 *
	 * @apiSuccess (200) {Context} ctx Return the context with a message which
	 * is to tell the student to start his/her test.
	 * @apiSuccess (200) {String} ctx:body:msg Return the message which is
	 * 'start testing' in response body.
	 * @apiError (403) {Context} ctx Return the context with an error.
	 * @apiError (403) {KeyError} ctx:body The student's username is not found.
	 * @apiPermission student
	 */
	@Post('/start')
	public async start(@Ctx() ctx: Context) {
		let d = new Date()
		try {
			await Student.findOne({username: ctx.request.body.Username})
		.then(
				async (stu) => {
					stu.time_use = (d.getTime() - 1560000000000) / 1000
					stu.time_start = new Date()
					await Student.update(stu.id, stu)
				}
			)
			ctx.body = {msg: 'start testing'}
		} catch (error) {
			ctx.body = error
		}
		return ctx
	}

	/**
	 * @api {post} /student/handin 3. Enable Student to Handin his/her Paper
	 * @apiName handin
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.0.2
	 * @apiDescription By using this api, the front end will tell the back end
	 * the student's username and his/her answers. After that, the back end will
	 * calculate his/her spent time. If the spent time is over 30 mins, we do not
	 * accept this answer paper. If the spent time is legal, this api will check
	 * his/her answers and update his/her score to the data base.
	 * @apiParam (Parameter) {Context} ctx A context with Username and his/her
	 * answers.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The username of the student.
	 * @apiParam (Parameter) {Answer[]} ctx:request:body:answer The answers of
	 * the objected student to his/her test paper.
	 * @apiSuccess (200) {Context} ctx Return the context with the objected student's
	 * score.
	 * @apiSuccess (200) {Number} ctx:body:Score Return the score of the objected student.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return the error status 403.
	 * @apiPermission student
	 */
	@Post('/handin')
	public async handin(@Ctx() ctx: Context) {
		let d = new Date()
		let stu: Student = await Student.findOne({username: ctx.request.body.Username})
		if (
			((stu.time_use !== -1) && ((d.getTime() - 1560000000000) / 1000 - stu.time_use > 1800)) ||
			(stu.score !== -1)
		) {
			ctx.status = 403
		} else {
			stu.score = 0
			for (let i = 0; i < 20; i += 1) {
				if (ctx.request.body.answer[i] === stu.answers_choice[i]) {
					stu.score += 4
				}
			}
			for (let i = 0; i < 10; i += 1) {
				if (ctx.request.body.answer[i + 20] === stu.answers_judgment[i]) {
					stu.score += 2
				}
			}
			await Student.update(stu.id, stu)
			ctx.body = {Score: stu.score}
		}
	}

	/**
	 * @api {post} /student/result_handin 4. Enable Student to Check Correct Answers
	 * @apiName result1
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.0.1
	 * @apiDescription By using this api, the front end will tell the back end
	 * the student's username. After that, the back end will access the data base
	 * and show the correct answers of his/her test paper.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The username of the student.
	 * @apiSuccess (200) {Context} ctx Return the context with the correct answers
	 * of the objected student's test paper.
	 * @apiSuccess (200) {Number[]} ctx:body:Answer Return the correct answers in the
	 * response body.
	 * @apiPermission student
	 */
	@Post('/result_handin')
	public async result1(@Ctx() ctx: Context) {
		let stu: Student = await Student.findOne({username: ctx.request.body.Username})
		let questionarr1 = await ChoiceQuestion.findByIds(stu.choice_question, {select: ['answer']})
		let questionarr2 = await JudgmentQuestion.findByIds(stu.judgment_question, {select: ['answer']})
		let arr = await questionarr1.map((a) => a.answer)
		let arr2 = await questionarr2.map((a) => a.answer)
		ctx.body = {Answer: arr.concat(arr2)}
	}

	/**
	 * @api {post} /student/result 5. Enable Users to Check the Whole Test Products
	 * @apiName result
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.0.1
	 * @apiDescription By using this api, the front end will tell the back end
	 * the student's username. After that, the back end will access the data base
	 * and show all products of the test to the user, including the student's
	 * information, the test paper, his/her answers, his/her score and the correct
	 * answers of the test paper.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:request:body:Username The username of the student.
	 * @apiSuccess (200) {Context} ctx Return the context with all test products.
	 * @apiSuccess (200) {Paper} ctx:body:Paper Return the test paper of the student.
	 * @apiSuccess (200) {Number[]} ctx:body:Answer:Choice_answers Return the
	 * choice answers of the student and the correct choice answers of his/her test paper.
	 * @apiSuccess (200) {Number[]} ctx:body:Answer:Judgment_answers Return the
	 * judgment answers of the student and the correct judgment answers of his/her test paper.
	 * @apiSuccess (200) {Number} ctx:body:Score Return the score of the objected student.
	 * @apiPermission student, admin, counsellor
	 */
	@Post('/result')
	public async result(@Ctx() ctx: Context) {
		let stu: Student = await Student.findOne({username: ctx.request.body.Username})
		let questionarr1: any[] = await ChoiceQuestion.findByIds(stu.choice_question, {select: ['text', 'options', 'answer']})
		let questionarr2: any[] = await JudgmentQuestion.findByIds(stu.judgment_question, {select: ['text', 'answer']})
		ctx.body = {
			Answer: {
				Choice_answers: stu.answers_choice,
				Judgment_answers: stu.answers_judgment
			},
			Paper: {
				Choice_question: questionarr1,
				Judgment_question: questionarr2
			},
			Score: stu.score,
		}
	}
}
