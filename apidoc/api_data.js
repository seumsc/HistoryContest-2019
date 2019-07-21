define({ "api": [
  {
    "type": "post",
    "url": "/student/test",
    "title": "Post Student Test Paper.",
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
            "field": "ctx:Username",
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
            "field": "ctx:body",
            "description": "<p>Return the context with a randomly chosen paper in response body.</p>"
          },
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "ctx:status",
            "description": "<p>Return the context with successful status.</p>"
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
    "filename": "src/test/test.ts",
    "groupTitle": "StudentAPIs"
  }
] });
