#  东南大学·校史知识竞赛答题系统

目录：

[TOC]

- 本系统无法保证在IE11上的稳定性，请至少使用360浏览器极速模式或其他非IE内核浏览器！！
- ！！注意！！本系统UI优化建立在windows系统100%缩放下，浏览器100%缩放的16:9至4:3界面(即机房电脑的显示比例及缩放)，如果您电脑系统为120%~125%缩放，请在用非360浏览器的浏览器打开时，调整页面缩放到80%以获得较好的UI体验。
- `linux`环境下，`nginx`静态服务需要重新配置(`HistoryContest_2019_nginx`中包含的为windows版本的`nginx`服务器)

---
### 配置构建流程

脚本提示：

|   功能       |脚本        |
| :------- | -------------------- |
| 前端(client)  调试模式 |   ` npm start   `   |
| 前端(client)  WEBPACK构建 | `npm run build `|
| 资源服务(`nginx`)  启动静态资源服务器(本地80端口) |详见下文|
| 后端(server)  调试模式(本地6553端口) | `npm run watch `|
| 后端(server)  启动服务器(本地6553端口) |`npm start` |

bat 批处理文件解释：

|   功能       |批处理文件        |
| :------- | -------------------- |
| 项目  调试模式 |   `run_app_developer.bat`   |
| 项目构建 | `build_app.bat ` |
| 资源服务(`nginx`)  启动静态资源服务器(本地80端口) |`run_app.bat`|
| 项目关闭(构建后) | `close_app.bat ` |
   - 前端静态资源服务器,自定义监听端口:`HistoryContest_2019_nginx\conf\nginx.conf`中的server对象，第一个server对象为答题客户端静态服务，默认80端口，第二个为API文档提供端口，默认81端口。
   - 后端,自定义监听端口:更改`HistoryContest_2019_server\src\config\config.ts`中端口号,并重新启动项目
   - 前端调试模式开启后会自动打开一个指向3000端口的网页(react脚手架提供的developer)，而构建完，静态资源服务器打开完成后，需自己手动打开网页(默认为本机80端口)

配置流程：
1. 安装GIT,配置好相应PATH

2. clone 该项目到本地

3. 安装NPM(或CNPM),配置好相应的PATH,在client和server工作区下皆运行一次脚本 `npm install`,安装相关依赖

4. 该项目server需要连接 `Redis` 数据库以及`MySQL`数据库,MySQL数据库需严格按照`HistoryContest_2019_server\src\entity`中各对象所规定的数据格式存储信息，或直接导入`./testdata/historycontest-data.sql`的测试数据至MySQL数据库 

   - ​	`Redis` 数据库无需初始化，服务器自动从MySQL中同步数据
	- ​	MySQL连接端口及用户储存在`HistoryContest_2019_server\ormconfig.json`中，默认为3306；`Redis `连接端口储存在`HistoryContest_2019_server\src\config\redis.ts`中，默认为6379
   - 启动前请保证服务器防火墙配置，及端口是否被占用，防止数据库端口启动异常
5. 打开`HistoryContest_2019_nginx\conf\nginx.conf`，找到两个server对象，分别将root 的路径改为你的绝对路径(绝对路径中不能有中文和空格！！)
  
   ---
### 项目启动流程

- 生产构建后启动

	**！！注意：此方法启动后，关闭后端时除了直接关闭`app_run.bat`弹出的控制台进程之外，需运行一次`./close_app.bat`以关闭`nginx`服务器    ！！**
	
	1. 运行根目录下`build_app.bat`,等待前端构建完成
	2. 运行项目根目录下的`app_run.bat`，该批处理文件会打开 `nginx` 静态服务和`koa`服务端，并自动加载前端build文件和API文档
	3. 打开网页输入运行服务端的主机IP(如在本机上启动，则直接访问localhost)，即可访问答题系统
	4. API文档访问默认为81端口
	
- 调试模式  
  
   (简单方法：运行根目录下`run_app_developer.bat`，等待弹出的两控制台程序全部执行完成，浏览器自动弹出页面)
  
  1. 在server目录下，运行`npm run watch`,通过``nodeman`启动后端调试
  2. 在client目录下，运行`npm start`，或运行`./HistoryContest_2019_client/run_client.bat`，启动react脚手架自带的调试工具(本地3000端口)
     - 在调试模式下，在后端输入`rs`能快速重启后端服务端
     - 在调试模式下，前端在检测到工作区文件变化后会自动重新生成，浏览器也会自动刷新
---
###  项目简介


- 整体架构
   | 项目部分 |应用 |
   | :------- | -------------------- |
   | 前端答题系统 |react-create-app (node.js) & ant design|
   | API文档 | `apidoc` |
   | 服务器(提供服务端)  |KOA (node.js) |
   | 服务器(静态资源端) |`nginx` 静态服务 |
   |数据库 |MySQL , `Redis` |

- 前端答题系统
  
	- 简介
	
	  ​	前端答题系统以react提供的脚手架为框架，创建了一个单页面应用。页面转换由`react-dom`控制而非前端虚拟路由，便于打包以及提高了组件的复用性。
	
	     UI方面，本系统采用了`antd`的大量现有组件搭建起了成熟的UI界面。登录界面大气，指示明确；答题界面题目突出，题目信息查看方便；管理员界面功能齐全且易用。

	  ​	整个答题页面的交互逻辑皆应用react框架所提供的组件化管理，并且所有`api`请求操作皆为异步且有清楚的加载动画提示。
	
	- 实现功能：
		1. 有完整且独立的登陆，答题，得分界面，完整且流畅的答题流程
		
   	3. 登陆失败能给予明确的错误提示，登陆流程具有验证码验证，防范跨站点攻击
		
   	4. 进入答题后有明确的答题规则提示
	
   	5. **具有完善的权限验证系统**，通过服务端登录时发放的token，验证访问权限与确认身份，且用户名，密码与验证用token皆无与浏览器储存发生数据交换(无使用cookie)，避免身份信息被盗取
	
   	6. **所有网络请求操作与耗时操作皆为异步操作**
	
   	7. **优化了获取试卷的方式**，服务端仅仅只要返回随机题目ID，大大减少了网络通信压力与服务端压力
  
   	8. **具有完整功能的辅导员(管理员)界面**，具有任意排序，模糊搜索，过滤，导出等功能。能在此界面查看所有权限内学生的身份信息，答题信息以及具体答题结果；能快速过滤未答题学生(得分排序同理)，能按照姓名，学号，一卡通等信息进行模糊搜索，能查看所有院系的均分与排名，给辅导员(管理员)提供了注册与修改权限内学生任意身份信息的接口，保证每位学生的答题，最后能将权限内的所有数据导出成完整的带有院系数据和学生数据的EXCEL表格，
  
   	8. **大量应用现有企业级组件**，并且配合自定义的动画过渡，界面重点突出，切换流畅，并且能随时给予用户必要的提示
  
   	9. 利用了react的懒加载特性，在必要时才加载某些图片和组件，加快了页面访问和加载速度
  
   	10. 在81端口有完善的API文档
  
   	   ​      
   	
  
- 后端服务器

  - 简介

    ​	本项目后端分为两大部分，分别由`koa`和`nginx`组成。`koa`服务器为服务端，负责提供`api`请求的处理和数据库的管理，而`nginx`服务器为静态资源服务器，只负责向浏览器返回静态页面(前端为单页面应用，因此只有第一次访问时返回)

    ​	数据库也分为两大数据库，分别是MySQL和`Redis`，所有`API`的读取请求皆在`Redis`中进行，而写入请求会同时向两个数据库写入，每10分钟(以及 `koa`后端启动时),`Redis`会从MySQL中拉取全部数据。这样MySQL相当于一个实时的数据备份，防止`Redis`发生数据丢失，但又能发挥`Redis`读取快的优势

  - 实现功能

    1. 利用发放的token形成权限验证机制，防止用户非法操作和越权操作，又没有像cookie一样的被利用风险。
    2. 实现全部后台数据的缓存处理**，极大加快了读取速度(即`Redis`数据库)
    3. 完善的后端缓存的更新机制，绕开了`Redis`数据库繁杂的数据格式处理和初始化，实现全自动更新缓存
    4. 与前端形成缓存更新机制，辅导员访问的学生数据等大容量数据能缓存在前端，防止大量重复性的网络通信。
    5. **全部`API`皆利用typescript的异步操作以及强类型特性**，优化了服务器压力控制
    6. 单独的静态资源服务器，`nginx`服务器为专门为web端静态资源优化的后端框架，在压力分配和后端渲染上做的要比`koa`更加专业。
