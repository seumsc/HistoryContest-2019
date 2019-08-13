import {Controller,Ctx, Get,Param, Post, Body, Params, UseBefore} from "routing-controllers"
import { Context } from "koa";
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import {Department} from "../entity/Department"
import { Counsellor } from "../entity/Counsellor";
import {Key} from "../utils/keys"
import * as jwt from "jsonwebtoken"
const redis =require("../config/redis")
@Controller("/ui")
export class UIController{
    /**
	 * @api {post} /ui/login User Login
	 * @apiName post_login
	 * @apiGroup UIAPIs
	 * @apiVersion 0.2.1
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
	 * @apiExample {fetch} Example usage:
	 * fetch(http://server_host/api/ui/login, {
	 *     method: 'POST',
	 *     mode: 'cors',
	 *     headers: {
	 *       "Content-Type": "application/x-www-form-urlencoded"
	 *     },
	 *     body: JSON.stringify({
	 *         Username: xxx.username
	 *         Password: xxx.password
	 *         Indentity: xxx.identity
	 *      }
	 *     )
	 *   }
	 * )
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 Successful Login
	 * {
	 *   Name: user.name,
	 *   Token: 'Bearer ' + token,
	 *   [Department: user.department,]
	 *   [Score: student.score]
	 * }
	 * ctx.status = 200
	 * @apiErrorExample {status} Error-Response:
	 * HTTP/1.1 403 Wrong Password
	 * ctx.status = 403
	 * @apiErrorExample {status} Error-Response:
	 * HTTP/1.1 404 User Not Found
	 * ctx.status = 404
	 */
    @Post("/login")
    async post_login(@Ctx() ctx:Context){
        console.log(ctx.request.body)
        switch (ctx.request.body.Identity)
        {
            case '0':
                let student:Student=eval(`(${await redis.get(`student:${ctx.request.body.Username}`)})`)
                if(!student){
                    student=await Student.findOne({username:ctx.request.body.Username});
                    redis.set(`student:${ctx.request.body.Username}`,JSON.stringify(student))
                }
                if(!student)
                {
                    ctx.status=404
                }else if(student.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                   let department:Department=undefined
                    await redis.hgetall(`department:${student.department}`,(err,object)=>{department=object})
                    const payload = {identity:student.identity,username:student.username,score:student.score }
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:student.name,Score:student.score,Token:"Bearer "+token,Department:department.name,Id:student.department}
                }
                    return ctx;
            case '1':
                let admin:Admin=await redis.hgetall(`admin:${ctx.request.body.Username}`)
                if(!admin){
                    admin=(await Admin.findOne({username:ctx.request.body.Username}));
                    redis.hmset(`admin:${ctx.request.body.Username}`,admin)
                }
                if(!admin)
                {
                    ctx.status=404
                }else if(admin.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                    const payload = {identity:admin.identity,username:admin.username}
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:admin.name,Token:"Bearer "+token}
                }
                return ctx;
            case '2':
                let counsellor:Counsellor=await redis.hgetall(`counsellor:${ctx.request.body.Username}`)
                if(!counsellor){
                    counsellor=(await Counsellor.findOne({username:ctx.request.body.Username}));
                    redis.hmset(`counsellor:${ctx.request.body.Username}`,counsellor)
                }
                let department:Department=undefined
                await redis.hgetall(`department:${counsellor.department}`,async(err,object)=>{department=object;})
                if(!counsellor)
                {
                    ctx.status=404
                }else if(counsellor.password!=ctx.request.body.Password)
                {
                    ctx.status=403
                }
                else
                {
                    const payload = {identity:counsellor.identity,username:counsellor.username,department:counsellor.department}
                    const token=jwt.sign(payload,Key,{expiresIn:3600});
                    ctx.status=200
                    ctx.body={Name:counsellor.name,Token:"Bearer "+token,Department:department.name,Id:counsellor.department}
                }
                    return ctx;
        }
    }
}
