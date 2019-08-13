import { Student } from "../entity/Student";
import { Counsellor } from "../entity/Counsellor"
import { Admin } from "../entity/Admin"
import { Department } from "../entity/Department"
import { ChoiceQuestion } from "../entity/ChoiceQuestion"
import { JudgmentQuestion } from "../entity/JudgmentQuestion"
import { Controller, Ctx, Post, Get, UseBefore, QueryParam } from "routing-controllers"
import { Context } from "koa";
import * as verify from "../config/Verify"
import { isPasswordValid, isUsernameValid } from "../utils/isValid"
import * as jwt from "jsonwebtoken"
import { Key } from "../utils/keys"
const redis = require("../config/redis")

@Controller("/admin")
export class AdminController {
    /**
	 * @api {get} /admin/getBydepartment Get a department for User
	 * @apiName get_department
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.1
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
     * @apiError (304) {Context} ctx Return the context with a 304 status.
     * @apiError (304) {Number} ctx:status Return the 304 status to represent the
     * caching check failure.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/getBydepartment, {
	 *     method: 'GET',
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
     * @apiErrorExample {status} Exception-Response:
     * HTTP/1.1 304 Caching Exception
     * ctx.status = 304
	 */
    @UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
    @Get("/getBydepartment")
    public async get_department(@Ctx() ctx: Context) {
        const dataString = ctx.header.authorization;
        const dataArr = dataString.split(' ');
        const token = dataArr[1];
        let playload = await jwt.verify(token, Key)
        const data = playload;
        let department: Department = await redis.hgetall(`department:${data.department}`)
        if (!department) {
            department = await Department.findOne({ id: data.department });
            redis.hmset(`department:${data.department}`, department)
        }
        if (!ctx.request.get("If-Modified-Since") || ctx.request.get("If-Modified-Since") != `${department.updatedDate}`) {
            ctx.body = {
                "建筑学院": [],
                "吴健雄学院": [],
                "机械工程学院": [],
                "能源与环境学院": [],
                "材料科学与工程学院": [],
                "土木工程学院": [],
                "交通学院": [],
                "自动化学院": [],
                "电气工程学院": [],
                "仪器科学与工程学院": [],
                "化学化工学院": [],
                "信息科学与工程学院": [],
                "电子科学与工程学院": [],
                "计算机科学与工程学院": [],
                "软件工程学院": [],
                "网络空间安全学院": [],
                "物理学院": [],
                "经济管理学院": [],
                "公共卫生学院": [],
                "人文学院": [],
                "艺术学院": [],
                "医学院": [],
                "生物科学与医学工程学院": [],
                "外国语学院": []
            }
            let students = await redis.smembers(`department${department.id}`)
            let arr = new Array()
            for (let i = 0; i < students.length; i++) {
                let object = eval(`(${await redis.get(`student:${students[i]}`)})`)
                let test = {
                    name: object.name,
                    username: object.username,
                    score: object.score,
                    time_use: object.time_use,
                    password: object.password
                }
                arr.push(test)
            }
            ctx.body[department.name] = arr
            ctx.response.set({
                'Last-Modified': `${department.updatedDate}`,
                'Cache-Control': "no-cache"
            })
        }
        else {
            ctx.status = 304;
        }
        return ctx;
    }
    
    /**
	 * @api {get} /admin/get_alldepartments Get all departments for User
	 * @apiName get_alldepartments
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end will send nothing but the
	 * back end will strictly verify the user's access privilege. After that, the
	 * back end will send average performances of all departments to the
	 * front end.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiSuccess (200) {Context} ctx Return the context with ordered average
	 * performances of all departments.
	 * @apiSuccess (200) {Department[]} ctx:body Return all departments'
	 * formance in the body of the context.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/get_alldepartments, {
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
    @Get("/get_alldepartments")
    async get_alldepartment(@Ctx() ctx: Context) {
        ctx.body = { Departments: await Department.find({ order: { average: "DESC" }, select: ["name", "average", "tested_number", "total_number"] }) }
        return ctx;
    }

    /**
	 * @api {get} /admin/get_allstudents Get all Students for User
	 * @apiName get_allstudent
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end will send nothing but the
	 * back end will strictly verify the user's access privilege. After that, the
	 * back end will send all students' information to the front end.
     * Update: note that all students' information will be stored in the particular
     * data structure.
	 * @apiParam (Parameter) {Context} ctx A context with jwt.
	 * @apiSuccess (200) {Context} ctx Return the context with all students'
	 * performance.
	 * @apiSuccess (200) {Data} ctx:body Return all students' information in a
	 * special data structure.
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/get_allstudents, {
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
    @Get("/get_allstudents")
    async get_allstudent(@Ctx() ctx: Context) {
        let department = await Department.find();
        ctx.body = {
            "建筑学院": [],
            "吴健雄学院": [],
            "机械工程学院": [],
            "能源与环境学院": [],
            "材料科学与工程学院": [],
            "土木工程学院": [],
            "交通学院": [],
            "自动化学院": [],
            "电气工程学院": [],
            "仪器科学与工程学院": [],
            "化学化工学院": [],
            "信息科学与工程学院": [],
            "电子科学与工程学院": [],
            "计算机科学与工程学院": [],
            "软件工程学院": [],
            "网络空间安全学院": [],
            "物理学院": [],
            "经济管理学院": [],
            "公共卫生学院": [],
            "人文学院": [],
            "艺术学院": [],
            "医学院": [],
            "生物科学与医学工程学院": [],
            "外国语学院": []
        }
        let departments = await redis.smembers(`department`)
        for (let i = 0; i < departments.length; i++) {
            let department = await redis.hgetall(`department:${departments[i]}`)
            let students = await redis.smembers(`department${departments[i]}`)
            let arr = new Array()
            for (let j = 0; j < students.length; j++) {
                let object: Student = eval(`(${await redis.get(`student:${students[j]}`)})`)
                let test = {
                    name: object.name,
                    username: object.username,
                    score: object.score,
                    time_use: object.time_use,
                    password: object.password
                }
                arr.push(test)
            }
            ctx.body[department.name] = arr
        }
        return ctx;
    }

    /**
	 * @api {post} /admin/register Regiser a User
	 * @apiName post_register
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.1
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
    @Post("/register")
    @UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
    async post_register(@Ctx() ctx: Context) {
        switch (ctx.request.body.Identity) {
            case '0':
                let stu = new Student();
                stu.identity = '0';
                stu.username = ctx.request.body.Username
                stu.name = ctx.request.body.Name
                stu.password = ctx.request.body.Password
                stu.department = stu.username[0] + stu.username[1]
                stu.score = -1
                const Stu = eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
                if ((!isPasswordValid(stu.password)) || (!isUsernameValid(stu.username))) {
                    ctx.status = 400
                }
                else if (!Stu) {
                    Student.save(stu);
                    redis.set(`student:${stu.username}`, JSON.stringify(stu))
                    let department: Department = await redis.hgetall(`department:${stu.department}`)
                    department.total_number += 1;
                    Department.update(department.test, department)
                    redis.hmset(`department:${department.id}`, department)
                    ctx.status = 200
                }
                else {
                    ctx.status = 403
                }
                break;
            case '1':
                let admin = new Admin()
                admin.identity = "1"
                admin.username = ctx.request.body.Username
                admin.name = ctx.request.body.Name
                admin.password = ctx.request.body.Password
                const Ad = await Admin.findOne({ username: ctx.request.body.Username })
                if ((!isPasswordValid(admin.password)) || (!isUsernameValid(admin.username))) {
                    ctx.status = 400
                }
                else if (!Ad) {
                    Admin.save(admin);
                    redis.hmset(`admin:${admin.username}`, admin)
                    ctx.status = 200
                }
                else {
                    ctx.status = 403
                }
                break;
            case '2':
                let counsellor = new Counsellor()
                counsellor.identity = "2";
                counsellor.username = ctx.request.body.Username
                counsellor.name = ctx.request.body.Name
                counsellor.password = ctx.request.body.Password
                counsellor.department = counsellor.username[0] + counsellor.username[1]
                const Cou = await Counsellor.findOne({ username: ctx.request.body.Username })
                if ((!isPasswordValid(counsellor.password)) || (!isUsernameValid(counsellor.username))) {
                    ctx.status = 400
                }
                else if (!Cou) {
                    Counsellor.save(counsellor);
                    redis.hmset(`counsellor:${counsellor.username}`, counsellor)
                    ctx.status = 200
                }
                else {
                    ctx.status = 403
                }
                break;
        }
        return ctx;
    }

    /**
	 * @api {get} /admin/result Get student's product by Username
	 * @apiName getByUsername
	 * @apiGroup AdminAPIs
	 * @apiVersion 0.2.1
	 * @apiDescription By using this api, the front end will send an objected username
     * to the backend, and the back end will verify the user's acess privilege.
     * After that, the back end will send the required student's all products to front end.
	 * @apiParam (Parameter) {Context} ctx A context with user cached information.
	 * @apiParam (Parameter) {String} id The requested Username.
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
	 * @apiPermission admin, counsellor
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/admin/result, {
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
    @UseBefore(verify.verifyToken_CousellorOrAdmin, verify.verifyToken_Username)
    @Get("/result")
    async getByUsername(@QueryParam("id") id: string, @Ctx() ctx: Context) {
        let student = eval(`(${await redis.get(`student:${id}`)})`)
        if (!student) {
            student = (await Student.findOne({ username: id }));
            redis.set(`student:${id}`, JSON.stringify(student))
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
            return ctx;
        }
        else {
            ctx.status = 304;
            return ctx;
        }
    }

    /**
     * @api {post} /admin/reset_name Reset User's name
     * @apiName reset_name
     * @apiGroup AdminAPIs
     * @apiVersion 0.2.1
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
    @Post("/reset_name")
    async reset_name(@Ctx() ctx: Context) {
        let student = eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
        if (!student) {
            student = (await Student.findOne({ username: ctx.request.body.Username }));
            redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student))
        }
        student.name = ctx.request.body.Name
        await Student.update(student.id, student)
        redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student))
        return ctx.body = { msg: "successfully reset" };
    }

    /**
     * @api {post} /admin/reset_username Reset User's username
     * @apiName reset_username
     * @apiGroup AdminAPIs
     * @apiVersion 0.2.1
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
    @Post("/reset_username")
    async reset_username(@Ctx() ctx: Context) {
        let student = await Student.findOne({ name: ctx.request.body.Name, password: ctx.request.body.Password })
        student.username = ctx.request.body.Username
        await Student.update(student.id, student)
        redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student))
        return ctx.body = { msg: "successfully reset" };
    }

    /**
     * @api {post} /admin/reset_password Reset User's password
     * @apiName reset_password
     * @apiGroup AdminAPIs
     * @apiVersion 0.2.1
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
    @Post("/reset_password")
    async reset_password(@Ctx() ctx: Context) {
        let student = eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
        if (!student) {
            student = (await Student.findOne({ username: ctx.request.body.Username }));
            redis.hmset(`student:${ctx.request.body.Username}`, student)
        }
        student.password = ctx.request.body.Password
        await Student.update(student.id, student)
        redis.set(`student:${ctx.request.body.Username}`, JSON.stringify(student))
        return ctx.body = { msg: "successfully reset" };
    }
}
