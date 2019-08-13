import { Controller, Ctx, Get, Post, UseBefore } from "routing-controllers"
import * as jwt from "jsonwebtoken"
import { Key } from "../utils/keys"
//import entities
import { ChoiceQuestion } from "../entity/ChoiceQuestion"
import { JudgmentQuestion } from "../entity/JudgmentQuestion"
import { Student } from "../entity/Student"
import { Context } from "koa";
//import utils
import { RandomArr } from "../utils/RandomArray"
import * as verify from "../config/Verify"
import { Department } from "../entity/Department";
const redis = require("../config/redis")
@Controller("/student")
export class StudentController {
    /**
	 * @api {get} /student/test Get a test paper for Student
	 * @apiName test
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end can get a test paper
	 * for the objected student. If the student has not answered any paper, a 
     * randomly constructed paper should be gotten. If the student has answered 
     * a paper, the state 403 will be responsed.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:header:payload:Username The username of 
     * the student.
	 * @apiSuccess (200) {Context} ctx Return the context with a randomly chosen paper.
	 * @apiSuccess (200) {Paper} ctx:body:Paper Return a randomly chosen paper in response body.
	 * @apiSuccess (200) {Number} ctx:status Return the successful status.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return the error status.
	 * @apiPermission student
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/student/test, {
	 *     method: 'GET',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username
	 *      }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Successfully Get Test Paper
	 * {
	 *   Paper: {
	 *     Choice_question: [...],
	 *     Judgment_question: [...]
	 *   }
	 * }
	 * ctx.status = 200
	 * @apiErrorExample {status} Error-Response:
	 * HTTP/1.1 403 Test Paper Finished
	 * ctx.status = 403
	 */
    @UseBefore(verify.verifyToken_Student, verify.verifyToken_Username)
    @Get("/test")
    async test(@Ctx() ctx: Context) {
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = await jwt.verify(token, Key)
        const data = playload;
        let student: Student = eval(`(${await redis.get(`student:${data.username}`)})`)
        if (!student) {
            student = (await Student.findOne({ username: data.username }));
            redis.set(`student:${data.username}`, JSON.stringify(student))
        }
        if (student.score == -1) {
            //生成两个随机数组，应用为选择题和判断题的序号
            const choice_id: number[] = await RandomArr(20, 20)
            const judgment_id: number[] = await RandomArr(10, 10)
            student.answers_choice = []
            student.answers_judgment = []
            choice_id.forEach(async element => {
                student.answers_choice.push(await redis.hget(`choice:${element}`, 'answer'))
            });
            judgment_id.forEach(async element => {
                student.answers_judgment.push(await redis.hget(`judge:${element}`, 'answer'))
            });
            student.choice_question = choice_id;
            student.judgment_question = judgment_id;
            ctx.status = 200;
            //除去题目的答案属性输出，Paper属性对象含有Choice_question与Judgment_question两个属性分别为选择题数组，判断题数组
            ctx.body = { Paper: { Choice_question: choice_id, Judgment_question: judgment_id } }
            await Student.update(student.id, student)
            redis.set(`student:${data.username}`, JSON.stringify(student))
        }//更新用户数据
        else { ctx.status = 403 }
        return ctx;
    }

    /**
	 * @api {get} /student/start Start Student's test
	 * @apiName start
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end will tell the back end
	 * the student's username. After that, the back end will record his/her start
	 * time, which is used to supervise his/her total test time, and allow the
	 * student to start his/her test.
	 * @apiParam (Parameter) {Context} ctx A context with Username.
	 * @apiParam (Parameter) {String} ctx:header:payload:Username The username of the student.
	 * @apiSuccess (200) {Context} ctx Return the context with a message which
	 * is to tell the student to start his/her test.
	 * @apiSuccess (200) {String} ctx:body:msg Return the message which is
	 * 'start testing' in response body.
	 * @apiError (403) {Context} ctx Return the context with an error.
	 * @apiError (403) {KeyError} ctx:body The student's username is not found.
	 * @apiPermission student
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/student/start, {
	 *     method: 'GET',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username
	 *      }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Accept Starting to Test
	 * {
	 *   msg: 'start testing'
	 * }
	 * ctx.status = 200
	 * @apiErrorExample {error} Error-Response:
	 * HTTP/1.1 403 Student Not Found
	 * ctx.body = error
	 */
    @UseBefore(verify.verifyToken_Student, verify.verifyToken_Score)
    @Get("/start")
    async start(@Ctx() ctx: Context) {
        let date = new Date()
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = await jwt.verify(token, Key)
        const data = playload;
        let student: Student = eval(`(${await redis.get(`student:${data.username}`)})`)
        if (!student) {
            student = (await Student.findOne({ username: data.username }));
            await redis.set(`student:${data.username}`, JSON.stringify(student))
        }
        student.time_use = (date.getTime() - 1560000000000) / 1000;
        student.time_start = new Date;
        Student.update(student.id, student);
        redis.set(`student:${data.username}`, JSON.stringify(student), (err) => { console.log(err) })
        ctx.body = { msg: "start testing" }
        return ctx;
    }

    /**
	 * @api {post} /student/handin Handin Student's answers
	 * @apiName handin
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end will tell the back end
	 * the student's username and his/her answers. After that, the back end will
	 * calculate his/her spent time. If the spent time is over 30 mins, we do not
	 * accept this answer paper. If the spent time is legal, this api will check
	 * his/her answers and update his/her score to the data base.
	 * @apiParam (Parameter) {Context} ctx A context with Username and his/her
	 * answers.
	 * @apiParam (Parameter) {String} ctx:header:payload:Username The username of the student.
	 * @apiParam (Parameter) {Answer[]} ctx:request:body:answer The answers of
	 * the objected student to his/her test paper.
	 * @apiSuccess (200) {Context} ctx Return the context with the objected student's
	 * score.
	 * @apiSuccess (200) {Number} ctx:body:Score Return the score of the objected student.
	 * @apiError (403) {Context} ctx Return the context with a 403 status.
	 * @apiError (403) {Number} ctx:status Return the error status 403.
	 * @apiPermission student
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/student/handin, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "authorization": xxx.token,
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username
	 *         Answers: xxx.answers
	 *      }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Successfully Handin
	 * {
	 *   Score: student.score
	 * }
	 * ctx.status = 200
	 * @apiErrorExample {status} Error-Response:
	 * HTTP/1.1 403 Over Time or Test Finished
	 * ctx.status = 403
	 */
    @UseBefore(verify.verifyToken_Student, verify.verifyToken_Score)
    @Post("/handin")
    async handin(@Ctx() ctx: Context) {
        let date = new Date()
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = await jwt.verify(token, Key)
        const data = playload;
        let student: Student = eval(`(${await redis.get(`student:${data.username}`)})`)

        if (!student) {
            student = await Student.findOne({ username: data.username });
            redis.set(`student:${data.username}`, JSON.stringify(student))
        }
        if ((((date.getTime() - 1560000000000) / 1000 - student.time_use > 1800) || (student.score != -1))) { ctx.status = 403 }
        else
            if ((date.getTime() - 1560000000000) / 1000 - student.time_use < 0) //设置最短时间
            {
                ctx.body = { msg: "答题时间过短,请认真答题" };
            } else {
                student.time_use = (date.getTime() - 1560000000000) / 1000 - student.time_use;
                student.score = 0;
                for (let i = 0; i < 20; i++) {
                    if (ctx.request.body.Answer[i] == student.answers_choice[i])
                        student.score += 4;
                }
                for (let i = 0; i < 10; i++) {
                    if (ctx.request.body.Answer[i + 20] == student.answers_judgment[i])
                        student.score += 2;
                }
                student.answers = ctx.request.body.Answer;
                redis.hgetall(`department:${student.department}`, (err, object) => {
                    const n: number = object.average * object.tested_number;
                    object.tested_number++;
                    object.average = (n + student.score) / object.tested_number;
                    redis.hmset(`department:${student.department}`, object)
                    Department.update(object.test, object)
                })
                Student.update(student.id, student)
                redis.set(`student:${data.username}`, JSON.stringify(student))
                ctx.body = { Score: student.score }
            }
        return ctx;
    }

    /**
	 * @api {get} /student/result Get Student's product for him/her
	 * @apiName result
	 * @apiGroup StudentAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end will send an objected username
     * to the backend, and the back end will verify the user's acess privilege.
     * After that, the back end will send the required student's all products to front end.
     * Note: this api is different from the '/admin/result', as this one is for
     * student to view his/her test result and the other one is for the administrators
     * to view the objected students' test products.
	 * @apiParam (Parameter) {Context} ctx A context with user cached information.
	 * @apiParam (Parameter) {String} ctx:header:payload:Username The username of the student.
	 * @apiSuccess (200) {Context} ctx Return the context with the required user's
     * informations.
	 * @apiSuccess (200) {Paper} ctx:body:Paper Return the paper of the student.
     * @apiSuccess (200) {Number} ctx:body:Score Return the score of the student.
     * @apiSuccess (200) {Number[]} ctx:body:Answer:Choice_answers Return the correct
     * choice answers to those questions.
     * @apiSuccess (200) {Number[]} ctx:body:Answer:Judgment_answers Return the correct
     * judgment answers to those questions.
     * @apiSuccess (200) {Number[]} ctx:body:User_answer Return the user's answers
     * to the paper.
     * @apiError (304) {Context} ctx Return the context with a 304 status.
     * @apiError (304) {Number} ctx:status Return the 304 status to represent the
     * caching check failure.
	 * @apiPermission student
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/student/result, {
	 *     method: 'Get',
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
     *   Answer: {
	 *     Choice_answers: student.answers_choice,
	 *     Judgment_answers: student.answers_judgment
	 *   },
	 *   Paper: {
	 *     Choice_question: [...],
	 *     Judgment_question: [...]
	 *   },
	 *   Score: student.score
     *   User_answer: student.answers
	 * }
     * @apiErrorExample {status} Exception-Response:
     * HTTP/1.1 304 Caching Exception
     * ctx.status = 304
	 */
    @Get("/result")
    async result(@Ctx() ctx: Context) {
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = await jwt.verify(token, Key)
        const data = playload;
        let student: Student = eval(`(${await redis.get(`student:${data.username}`)})`)
        if (!student) {
            student = (await Student.findOne({ username: data.username }));
            redis.set(`student:${data.username}`, JSON.stringify(student))
        }
        if (!ctx.request.get("If-Modified-Since") || ctx.request.get("If-Modified-Since") != `${student.updateDate}`) {
            ctx.body = {
                Paper: { Choice_question: student.choice_question, Judgment_question: student.judgment_question },
                Score: student.score,
                Answer: { Choice_answers: student.answers_choice, Judgment_answers: student.answers_judgment },
                User_answer: student.answers
            }
            ctx.response.set({
                'Last-Modified': `${student.updateDate}`,
                'Cache-Control': "no-cache"
            })
        }
        else { ctx.status = 304 }
        return ctx;
    }
}
