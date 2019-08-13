let a: number = 1
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
 * @apiParam (Parameter) {String} ctx:header:payload:Department The requested
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
a = 2
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
a = 3
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
a = 4
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
a = 5
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
a = 6
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
a = 7
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
a = 8
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
let b: number = 1
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
b = 2
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
b = 3
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
b = 4
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
b = 5
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
