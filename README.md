#  东南大学·校史知识竞赛答题系统

本系统无法保证在ＩＥ１１上的稳定性，请至少使用３６０浏览器极速模式或其他非ＩＥ内核浏览器

### 配置构建流程

|   功能       |脚本        |
| :------- | -------------------- |
| 前端(client)  调试模式 |   ` npm start   `   |
| 前端(client)  WEBPACK构建 | `npm run build `|
| 前端(client)  启动静态资源服务器(本地3000端口) |` npm run serve `|
| 后端(server)  调试模式(本地6553端口) | `npm run watch `|
| 后端(server)  启动服务器|`npm start` |
   - 前端静态资源服务器,自定义监听端口:`serve -l 端口号 -s build`
   - 后端,自定义监听端口:更改`HistoryContest_2019_server\src\config\config.ts`中端口号,并重新启动项目
   - 前端调试模式开启后会自动打开一个指向3000端口的网页，而构建完，静态资源服务器打开完成后，需自己手动打开网页

配置流程:
1. 安装GIT,配置好相应PATH
2. clone 该项目到本地
3. 安装NPM(或CNPM),配置好相应的PATH,在client和server工作区下皆运行一次脚本 `npm install --save`,安装相关依赖
4. 该项目server需要连接 `Redis` 数据库以及`MySQL`数据库,MySQL数据库需严格按照`HistoryContest_2019_server\src\entity`中所规定的数据格式存储信息，在服务器启动后会自动将MySQL中数据同步按照既定规则同步至 Redis 数据库。
5. MySQL连接端口及用户储存在`HistoryContest_2019_server\ormconfig.json`中，Redis 连接端口储存在`HistoryContest_2019_server\src\config\redis.ts`中
6. 按照上述表格脚本运行

### 主要组件

- 前端

  1. REACT(脚手架项目)
  2. WEBPACK
  3.　ant design

- 后端

  1. KOA
  2. nodemon

  

  