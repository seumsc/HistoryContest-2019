define({ "api": [
  {
    "type": "get",
    "url": "/admin/result",
    "title": "Get student's product by Username",
    "name": "getByUsername",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send an objected username to the backend, and the back end will verify the user's acess privilege. After that, the back end will send the required student's all products to front end.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with user cached information.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The requested Username.</p>"
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
            "description": "<p>Return the context with the required user's informations.</p>"
          },
          {
            "group": "200",
            "type": "Paper",
            "optional": false,
            "field": "ctx:body:Paper",
            "description": "<p>Return the paper of the student.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:body:Score",
            "description": "<p>Return the score of the student.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer:Choice_answers",
            "description": "<p>Return the correct choice answers to those questions.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer:Judgment_answers",
            "description": "<p>Return the correct judgment answers to those questions.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:User_answer",
            "description": "<p>Return the user's answers to the paper.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  Answer: {\n    Choice_answers: student.answers_choice,\n    Judgment_answers: student.answers_judgment\n  },\n  Paper: {\n    Choice_question: [...],\n    Judgment_question: [...]\n  },\n  Score: student.score\n  User_answer: student.answers\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "304": [
          {
            "group": "304",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 304 status.</p>"
          },
          {
            "group": "304",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the 304 status to represent the caching check failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exception-Response:",
          "content": "HTTP/1.1 304 Caching Exception\nctx.status = 304",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/result, {\n    method: 'Get',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Department: xxx.department\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "get",
    "url": "/admin/get_alldepartments",
    "title": "Get all departments for User",
    "name": "get_alldepartments",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send nothing but the back end will strictly verify the user's access privilege. After that, the back end will send average performances of all departments to the front end.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with jwt.</p>"
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
            "description": "<p>Return the context with ordered average performances of all departments.</p>"
          },
          {
            "group": "200",
            "type": "Department[]",
            "optional": false,
            "field": "ctx:body",
            "description": "<p>Return all departments' formance in the body of the context.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  Departments: [...]  // a list of departments' info\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/get_alldepartments, {\n    method: 'GET',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    }\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "get",
    "url": "/admin/get_allstudents",
    "title": "Get all Students for User",
    "name": "get_allstudent",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send nothing but the back end will strictly verify the user's access privilege. After that, the back end will send all students' information to the front end. Update: note that all students' information will be stored in the particular data structure.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with jwt.</p>"
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
            "description": "<p>Return the context with all students' performance.</p>"
          },
          {
            "group": "200",
            "type": "Data",
            "optional": false,
            "field": "ctx:body",
            "description": "<p>Return all students' information in a special data structure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  \"建筑学院\": [...],  // all information of students in \"建筑学院\"\n  \"机械工程学院\": [...],  // all information of students in \"机械工程学院\"\n  ...,\n  \"软件学院\": [...]  // all information of students in \"软件学院\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/get_allstudents, {\n    method: 'GET',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    }\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "get",
    "url": "/admin/getBydepartment",
    "title": "Get a department for User",
    "name": "get_department",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send the department name to the back end. After that, the back end will post the whole students' information to the front end so that the admins can view all results. Update: the result is stored in an object which has all departments as properties and the required students' infos will be appended to the particular list, which is exactly the department property.</p>",
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
            "field": "ctx:header:payload:Department",
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
            "type": "Data",
            "optional": false,
            "field": "ctx:body",
            "description": "<p>Return the information of all students in the requested department and organize them in a special data structure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  \"建筑学院\": [],\n  \"机械工程学院\": [],\n  ...,\n  \"软件学院\": [...]  // if request.body.Department = 71\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "304": [
          {
            "group": "304",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 304 status.</p>"
          },
          {
            "group": "304",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the 304 status to represent the caching check failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exception-Response:",
          "content": "HTTP/1.1 304 Caching Exception\nctx.status = 304",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/getBydepartment, {\n    method: 'GET',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Department: xxx.department\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/admin/register",
    "title": "Regiser a User",
    "name": "post_register",
    "group": "AdminAPIs",
    "version": "0.2.1",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Successful Register\nctx.status = 200",
          "type": "status"
        }
      ]
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
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Illegal Username or Password\nctx.status = 400",
          "type": "status"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 User Existed\nctx.status = 403",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/register, {\n    method: 'POST',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username,  // inputted username, which should be the \"一卡通号\"\n        Password: xxx.password,  // inputted password\n        Identity: xxx.identity  // user access level\n        Name: xxx.name  // user's real name\n      }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/admin/reset_name",
    "title": "Reset User's name",
    "name": "reset_name",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send the user's new name and the back end will verify the user by jwt. After that, the back end will reset the user's name and save it to the data base.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with jwt.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The user's username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Name",
            "description": "<p>The user's new real name.</p>"
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  msg: 'successfully reset'\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/reset_name, {\n    method: 'POST',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username,  // inputted username, which should be the \"一卡通号\"\n        Password: xxx.password,  // inputted password\n        Identity: xxx.identity  // user access level\n        Name: xxx.name  // user's new real name, which should be resetted\n      }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/admin/reset_password",
    "title": "Reset User's password",
    "name": "reset_password",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send the user's new password and the back end will verify the user by jwt. After that, the back end will reset the user's password and save it to the data base.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with jwt.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The user's username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Password",
            "description": "<p>The user's new password.</p>"
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  msg: 'successfully reset'\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/reset_password, {\n    method: 'POST',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username,  // inputted username\n        Password: xxx.password,  // inputted password, which should be resetted\n        Identity: xxx.identity  // user access level\n      }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/admin/reset_username",
    "title": "Reset User's username",
    "name": "reset_username",
    "group": "AdminAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send the user's new username and the back end will verify the user by jwt. After that, the back end will reset the user's username and save it to the data base. Note: in this api, the name and password are used to find the objected user, instead of using username.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with jwt.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Username",
            "description": "<p>The user's new username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Name",
            "description": "<p>The user's name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:request:body:Password",
            "description": "<p>The user's password.</p>"
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  msg: 'successfully reset'\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/admin/reset_username, {\n    method: 'POST',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username,  // inputted username, which should be resetted\n        Password: xxx.password,  // user's password\n        Name: xxx.name  // user's real name\n      }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "AdminAPIs"
  },
  {
    "type": "post",
    "url": "/student/handin",
    "title": "Handin Student's answers",
    "name": "handin",
    "group": "StudentAPIs",
    "version": "0.2.1",
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
            "field": "ctx:header:payload:Username",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Successfully Handin\n{\n  Score: student.score\n}\nctx.status = 200",
          "type": "json"
        }
      ]
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
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Over Time or Test Finished\nctx.status = 403",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/student/handin, {\n    method: 'POST',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username\n        Answers: xxx.answers\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "get",
    "url": "/student/result",
    "title": "Get Student's product for him/her",
    "name": "result",
    "group": "StudentAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end will send an objected username to the backend, and the back end will verify the user's acess privilege. After that, the back end will send the required student's all products to front end. Note: this api is different from the '/admin/result', as this one is for student to view his/her test result and the other one is for the administrators to view the objected students' test products.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>A context with user cached information.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ctx:header:payload:Username",
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
            "description": "<p>Return the context with the required user's informations.</p>"
          },
          {
            "group": "200",
            "type": "Paper",
            "optional": false,
            "field": "ctx:body:Paper",
            "description": "<p>Return the paper of the student.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:body:Score",
            "description": "<p>Return the score of the student.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer:Choice_answers",
            "description": "<p>Return the correct choice answers to those questions.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:Answer:Judgment_answers",
            "description": "<p>Return the correct judgment answers to those questions.</p>"
          },
          {
            "group": "200",
            "type": "Number[]",
            "optional": false,
            "field": "ctx:body:User_answer",
            "description": "<p>Return the user's answers to the paper.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Request Satisfied\n{\n  Answer: {\n    Choice_answers: student.answers_choice,\n    Judgment_answers: student.answers_judgment\n  },\n  Paper: {\n    Choice_question: [...],\n    Judgment_question: [...]\n  },\n  Score: student.score\n  User_answer: student.answers\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "304": [
          {
            "group": "304",
            "type": "Context",
            "optional": false,
            "field": "ctx",
            "description": "<p>Return the context with a 304 status.</p>"
          },
          {
            "group": "304",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the 304 status to represent the caching check failure.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exception-Response:",
          "content": "HTTP/1.1 304 Caching Exception\nctx.status = 304",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/student/result, {\n    method: 'Get',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Department: xxx.department\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "get",
    "url": "/student/start",
    "title": "Start Student's test",
    "name": "start",
    "group": "StudentAPIs",
    "version": "0.2.1",
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
            "field": "ctx:header:payload:Username",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Accept Starting to Test\n{\n  msg: 'start testing'\n}\nctx.status = 200",
          "type": "json"
        }
      ]
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
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Student Not Found\nctx.body = error",
          "type": "error"
        }
      ]
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/student/start, {\n    method: 'GET',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "get",
    "url": "/student/test",
    "title": "Get a test paper for Student",
    "name": "test",
    "group": "StudentAPIs",
    "version": "0.2.1",
    "description": "<p>By using this api, the front end can get a test paper for the objected student. If the student has not answered any paper, a randomly constructed paper should be gotten. If the student has answered a paper, the state 403 will be responsed.</p>",
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
            "field": "ctx:header:payload:Username",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Successfully Get Test Paper\n{\n  Paper: {\n    Choice_question: [...],\n    Judgment_question: [...]\n  }\n}\nctx.status = 200",
          "type": "json"
        }
      ]
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
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Test Paper Finished\nctx.status = 403",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "student"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/student/test, {\n    method: 'GET',\n    mode: 'cors',\n    headers: {\n      \"authorization\": xxx.token,\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "StudentAPIs"
  },
  {
    "type": "post",
    "url": "/ui/login",
    "title": "User Login",
    "name": "post_login",
    "group": "UIAPIs",
    "version": "0.2.1",
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
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Successful Login\n{\n  Name: user.name,\n  Token: 'Bearer ' + token,\n  [Department: user.department,]\n  [Score: student.score]\n}\nctx.status = 200",
          "type": "json"
        }
      ]
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
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Wrong Password\nctx.status = 403",
          "type": "status"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 User Not Found\nctx.status = 404",
          "type": "status"
        }
      ]
    },
    "permission": [
      {
        "name": "student, admin, counsellor"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "fetch(http://server_host/api/ui/login, {\n    method: 'POST',\n    mode: 'cors',\n    headers: {\n      \"Content-Type\": \"application/x-www-form-urlencoded\"\n    },\n    body: JSON.stringify({\n        Username: xxx.username\n        Password: xxx.password\n        Indentity: xxx.identity\n     }\n    )\n  }\n)",
        "type": "fetch"
      }
    ],
    "filename": "src/api/apidocs.ts",
    "groupTitle": "UIAPIs"
  }
] });
