define({ "api": [
  {
    "type": "get",
    "url": "/admin/getall",
    "title": "3. Get All Students' Informations",
    "name": "get_all",
    "group": "AdminAPIs",
    "version": "0.0.1",
    "description": "<p>By using this api, the front end will check the access privilege strictly. After that, this api will return all students' information to the front end.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context which has passed the access privilege validation.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Department",
            "description": "<p>The requested department name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with all students' information in the response body.</p>"
          },
          {
            "group": "200",
            "type": "Student[]",
            "optional": false,
            "field": "ctx:body:Students",
            "description": "<p>Return the information of all students.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin"
      }
    ],
    "filename": "src/test/AdminController.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/admin/getBydepartment",
    "title": "1. Post Students' Info to the Admin by Department",
    "name": "get_department",
    "group": "AdminAPIs",
    "version": "0.0.2",
    "description": "<p>By using this api, the front end will send the department name to the back end. After that, the back end will post the whole students' information to the front end so that the admins can view the results.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with Department name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Department",
            "description": "<p>The requested department name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with all students' information in the requested department.</p>"
          },
          {
            "group": "200",
            "type": "Student[]",
            "optional": false,
            "field": "ctx:body:Students",
            "description": "<p>Return the information of the students in the requested department.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "filename": "src/test/AdminController.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/admin/reset",
    "title": "2. Enable User to Reset Student's Username & Password",
    "name": "reset",
    "group": "AdminAPIs",
    "version": "0.0.2",
    "description": "<p>By using this api, the front end will send the student's old username, new username and new password to the back end. After that, the back end will reset the new information of the student and update it to the data base.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with old username, new username and new password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The old username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with message 'successfully reset' to prompt the user a successful operation.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ctx:body:msg",
            "description": "<p>Prompt string 'successfully reset'.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "filename": "src/test/AdminController.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/student/handin",
    "title": "3. Enable Student to Handin his/her Paper",
    "name": "handin",
    "group": "StudentAPIs",
    "version": "0.0.2",
    "description": "<p>By using this api, the front end will tell the back end the student's username and his/her answers. After that, the back end will calculate his/her spent time. If the spent time is over 30 mins, we do not accept this answer paper. If the spent time is legal, this api will check his/her answers and update his/her score to the data base.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with Username and his/her answers.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The username of the student.</p>"
          },
          {
            "group": "Parameter",
            "type": "Answer[]",
            "optional": false,
            "field": "ctx:request:body:answer",
            "description": "<p>The answers of the objected student to his/her test paper.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with the objected student's score.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:body:Score",
            "description": "<p>Return the score of the objected student.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 403 status.</p>"
          },
          {
            "group": "403",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the error status 403.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "filename": "src/test/StudentController.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "post",
    "url": "/student/test",
    "title": "1. Post Student Test Paper",
    "name": "post",
    "group": "StudentAPIs",
    "version": "0.0.3",
    "description": "<p>By using this api, the front end can post a test paper for the objected student. If the student has not answered any paper, a randomly constructed paper should be posted. If the student has answered a paper, the state 403 will be responsed.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The username of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a randomly chosen paper.</p>"
          },
          {
            "group": "200",
            "type": "Paper",
            "optional": false,
            "field": "ctx:body:Paper",
            "description": "<p>Return a randomly chosen paper in response body.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the successful status.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 403 status.</p>"
          },
          {
            "group": "403",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the error status.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "filename": "src/test/StudentController.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "post",
    "url": "/student/result",
    "title": "5. Enable Users to Check the Whole Test Products",
    "name": "result",
    "group": "StudentAPIs",
    "version": "0.0.1",
    "description": "<p>By using this api, the front end will tell the back end the student's username. After that, the back end will access the data base and show all products of the test to the user, including the student's information, the test paper, his/her answers, his/her score and the correct answers of the test paper.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The username of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with all test products.</p>"
          },
          {
            "group": "200",
            "type": "Paper",
            "optional": false,
            "field": "ctx:body:Paper",
            "description": "<p>Return the test paper of the student.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer:Choice_answers",
            "description": "<p>Return the choice answers of the student and the correct choice answers of his/her test paper.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer:Judgment_answers",
            "description": "<p>Return the judgment answers of the student and the correct judgment answers of his/her test paper.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:body:Score",
            "description": "<p>Return the score of the objected student.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "student, admin, counsellor"
      }
    ],
    "filename": "src/test/StudentController.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "post",
    "url": "/student/result_handin",
    "title": "4. Enable Student to Check Correct Answers",
    "name": "result1",
    "group": "StudentAPIs",
    "version": "0.0.1",
    "description": "<p>By using this api, the front end will tell the back end the student's username. After that, the back end will access the data base and show the correct answers of his/her test paper.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The username of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with the correct answers of the objected student's test paper.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer",
            "description": "<p>Return the correct answers in the response body.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "filename": "src/test/StudentController.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "post",
    "url": "/student/start",
    "title": "2. Enable Student to Start the Test",
    "name": "start",
    "group": "StudentAPIs",
    "version": "0.0.3",
    "description": "<p>By using this api, the front end will tell the back end the student's username. After that, the back end will record his/her start time, which is used to supervise his/her total test time, and allow the student to start his/her test.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The username of the student.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a message which is to tell the student to start his/her test.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ctx:body:msg",
            "description": "<p>Return the message which is 'start testing' in response body.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with an error.</p>"
          },
          {
            "group": "403",
            "type": "KeyError",
            "optional": false,
            "field": "ctx:body",
            "description": "<p>The student's username is not found.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "filename": "src/test/StudentController.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "post",
    "url": "/ui/login",
    "title": "1. User Login",
    "name": "post_login",
    "group": "UIAPIs",
    "version": "0.0.2",
    "description": "<p>By using this api, the front end will tell the back end about the information of the user who is requesting login, which will include the user's inputted username and password. After that, the back end will verify his/her inputted username and password. If the request is allowed, the back end will send a 200 status with a json web token to the front end.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with user's inputted username and password.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ctx:request:body:Identity",
            "description": "<p>The identity of the user, which uses 0, 1 and 2 to represent Student, Admin and Counsellor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The inputted username of the requesting user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Password",
            "description": "<p>The inputted password of the requesting user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with the user's name, the json web token, which is used to further session, and the status 200. Update: the departments of students and counsellors are also included.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ctx:body:Name",
            "description": "<p>Return the username of the user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ctx:body:Token",
            "description": "<p>Return the json web token of the objected user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ctx:body:Department",
            "description": "<p>Return the department of the user.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the 200 status to represent successful login request.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 403 status.</p>"
          },
          {
            "group": "403",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return 403 status to represent that the password inputted by the user is incorrect.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 404 status.</p>"
          },
          {
            "group": "404",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return 404 status to represent that the user is not in the data base, which may be because the user has not registered.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "student, admin, counsellor"
      }
    ],
    "filename": "src/test/UIController.ts",
    "groupTitle": "UIAPIs"
  },
  {
    "type": "post",
    "url": "/ui/register",
    "title": "2. User Regiser",
    "name": "post_register",
    "group": "UIAPIs",
    "version": "0.0.1",
    "description": "<p>By using this api, the front end will send the jwt back for the back end to strictly verify the user's access privilege and after that, the back end will using the user's inputted username and password to register a particular account for the user, which includes Student, Admin and Counsellor, and finally save the user infos to the data base.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with user's jwt, inputted username and password, and his/her user type.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ctx:request:body:Identity",
            "description": "<p>The identity of the user, which uses 0, 1 and 2 to represent Student, Admin and Counsellor.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The inputted username of the requesting user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Password",
            "description": "<p>The inputted password of the requesting user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 200 status.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return 200 status to represent a successful regiser.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 403 status.</p>"
          },
          {
            "group": "403",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return 403 status to represent that the user has already existed.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 404 status.</p>"
          },
          {
            "group": "404",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return 404 status to represent that the user's inputted username or password is not legal.</p>"
          }
        ]
      }
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "filename": "src/test/UIController.ts",
    "groupTitle": "UIAPIs"
  }
] });
