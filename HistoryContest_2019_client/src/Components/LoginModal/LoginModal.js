import React from 'react';
import "antd/dist/antd.css";
import { Icon, Button, Input, Modal, message, Dropdown, Menu } from 'antd';
import bg from '../../img/VerifyCodeBG.png'
import QueueAnim from 'rc-queue-anim';
class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            attemp: "0",
            username: '',
            password: '',
            toDo: "登录",
            posted: false,
            ...this.initState(),
            inputValue: "",
        }
        this.ToLogin = this.ToLogin.bind(this);
        this.close = this.close.bind(this);
        this.signin = this.signin.bind(this);
    }
    ToLogin() {
        // this.setState({ posted: true })
        let code = this.state.data.map((v) => String.fromCharCode(v > 57 && v < 84 ? v + 7 : (v < 57 ? v : v + 13)));
        let codeString = code.join("");
        let that = this;
        let username = this.state.username;
        let password = this.state.password;
        let identity = this.state.attemp;
        //暂时的登陆函数
        if (codeString.toLowerCase() == that.state.inputValue.toLowerCase()) {
            // console.log("login");
            // message.success("登录成功！");
            // that.props.setState({
            //     isWelcome: false,
            //     isLogin: true,
            //     isStudent: true,
            //     isAllDone: false,
            //     isAdmin: false,
            //     isTeacher: false,
            //     host: "",
            //         name: '菜鸡',
            //         username: "",
            //         token: '',
            //         access: -1,
            //         score: -1
            //     answer: []
            // })
            if(username.length==8&&password.length==9){
            this.setState({ posted: true })
            fetch("http://" + that.props.host + '/api/ui/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username: username,
                    Password: password,
                    Identity: identity
                })
            }).then(
                async res => {
                    that.setState({ posted: false })
                    if (res.status == 404||res.status==500) {
                        this.setState({ ...this.initState(), refresh: false });
                        message.error("用户名不存在!",1);
                    }
                    else if (res.status == 403) {
                        this.setState({ ...this.initState(), refresh: false });
                        message.error("用户名或密码错误!",1);
                    }
                    else {
                        //学生登陆成功
                        let data = await res.json();
                        console.log("login!");
                        message.success("登录成功",1.0);
                        if (identity == "0") {
                            if (data.Score == -1) {
                                that.props.setState({
                                    isWelcome: false,
                                    isStudent: true,
                                    isLogin: true,
                                    username: this.state.username,
                                    token: data.Token,
                                    username: this.state.username,
                                    name: data.Name,
                                    score: data.Score,
                                    token: data.Token,
                                    access: 0

                                });
                                // that.props.setState({
                                //     isWelcome: false,
                                //     isStudent: true,
                                //     isLogin: true,
                                //         score: data.Score,

                                // })
                            }
                            else {
                                that.props.setState({
                                    isWelcome: false,
                                    isStudent: true,
                                    isLogin: true,
                                    username: this.state.username,
                                    score: data.Score,
                                    name: data.Name,
                                    token: data.Token,
                                    access: 0
                                })
                                // that.props.setState({
                                //     isWelcome: false,
                                //     isStudent: true,
                                //     isLogin: true,
                                //         score: data.Score,
                                // })
                            }
                        }
                        else if (identity == "2") {
                            that.props.setState({
                                isWelcome: false,
                                isTeacher: true,
                                token: data.Token,
                                name: data.Name,
                                username:this.state.username,
                                departId: data.Id,
                                depart: data.Department,
                                access: 2
                            })
                        }
                        else if (identity == "1") {
                            that.props.setState({
                                isWelcome: false,
                                isAdmin: true,
                                token: data.Token,
                                name: data.Name,
                                username:this.state.username,
                                access: 1
                            })
                        }
                    }
                }).catch(err => { console.log(err) ;this.setState({ ...this.initState(), refresh: false }); that.setState({ posted: false });message.error("用户名不存在!",1);})

        
    }
    else{
        this.setState({ ...this.initState(), refresh: false });
        message.error("账户或密码格式不符!")
    }}
        else {
            console.log("false");
            that.setState({ posted: false })
            this.setState({ ...this.initState(), refresh: false });
            message.error("验证码错误",1)
        }
    }


    close() {
        this.setState({ visible: false });
        this.props.close();
    }
    signin() {
        this.setState({ toDo: "注册" });
    }
    initState() {
        return {
            data: this.getRandom(109, 48, 4),
            rotate: this.getRandom(60, -60, 4),
            fz: this.getRandom(15, 25, 4),
            color: [this.getRandom(100, 200, 3), this.getRandom(100, 200, 3), this.getRandom(100, 200, 3), this.getRandom(100, 200, 3)]
        }
    }

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random() * (max - min + 1) + min)
        if (!Boolean(num)) {
            return asciiNum
        }
        const arr = []
        for (let i = 0; i < num; i++) {
            arr.push(this.getRandom(max, min))
        }
        return arr
    }
    render() {
        let login = <div id='modal'>
            <Modal visible={this.props.visible}
                closable={false}
                destroyOnClose={true}
                title={
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={() => this.setState({ attemp: "0" })}>学生</Menu.Item>
                            <Menu.Item key="2" onClick={() => this.setState({ attemp: "2" })}>辅导员</Menu.Item>
                            <Menu.Item key="3" onClick={() => this.setState({ attemp: "1" })}>管理员</Menu.Item>
                        </Menu >}>
                        <Button type="defult">
                            <Icon type="down" />
                            {this.state.attemp == 0 && "学生"}
                            {this.state.attemp == 2 && "辅导员"}
                            {this.state.attemp == 1 && "管理员"}
                        </Button>
                    </Dropdown>}
                visible={this.state.visible}
                onOk={this.StudentToLogin}
                onCancel={this.close}
                footer={[
                    <Button key="返回" type="defult" onClick={this.close}>
                        返回
              </Button>,
                    <Button key="登录" type="primary" onClick={this.ToLogin} loading={this.state.posted}>
                        <Icon type="check-circle" theme="twoTone" />
                        登录
              </Button>
                ]}
                visible={this.state.visible}
            >
                <QueueAnim delay={180}>
                <Input key="username" id="username" addonBefore=" 账户 " prefix={<Icon type="user" />} placeholder={this.state.attemp == "0" ? "八位学号" : "管理员账户"} allowClear onChange={(e) => { this.setState({ username: e.target.value }) }}></Input>
                </QueueAnim><p></p><QueueAnim delay={180}>
                <Input.Password key="password" id="password" addonBefore=" 密码 " onPressEnter={this.ToLogin} prefix={<Icon type="lock" />} placeholder={this.state.attemp == "0" ? "一卡通号码" : "管理员密码"} allowClear onChange={(e) => { this.setState({ password: e.target.value }) }} />
                </QueueAnim><p></p><QueueAnim delay={180}>
                <p  key="check" style={{ marginRight: 0 }}>
                    <Input style={{ width: "70%" }} addonBefore="验证码" onPressEnter={this.ToLogin} placeholder="不区分大小写" onChange={(e) => { this.setState({ inputValue: e.target.value }) }}
                        suffix={
                            <div style={{ width: 120, height: 30, backgroundImage: `url(${bg})`, textAlign: "center" }} >
                                {this.state.data.map((v, i) =>
                                    <div
                                        key={i}
                                        className='itemStr'
                                        style={{
                                            transform: `skewX(${this.state.rotate[i]}deg)`,
                                            fontSize: `${this.state.fz[i]}px`,
                                            color: `rgb(${this.state.color[i].toString()})`,
                                            display: 'inline-block',
                                            MozUserSelect: '-moz-none',
                                            KhtmlUserSelect: 'none',
                                            WebkitUserSelect: 'none',
                                            msUserSelect: 'none',
                                            userSelect: 'none'
                                        }}
                                        onMouseEnter={() => this.setState({ refresh: true })}>
                                        {String.fromCharCode(v > 57 && v < 84 ? v + 7 : (v < 57 ? v : v + 13))}&nbsp;&nbsp;
                                 </div>
                                )}
                                {this.state.refresh
                                    ?
                                    <div
                                        className='mask'
                                        onClick={() => {
                                            this.setState({ ...this.initState(), refresh: false })
                                        }}
                                        onMouseLeave={() => { this.setState({ refresh: false }) }}
                                        style={{ fontSize: "10px" }}>
                                        看不清？点击此处刷新
                                </div>
                                    :
                                    null
                                }
                            </div>
                        }>
                    </Input>

                </p></QueueAnim>
                <p > <br></br>
                    {this.state.attemp == "0" ?
                        <a onClick={() => { this.setState({ attemp: "1", toDo: "注册" }) }}>
                            &nbsp;&nbsp;没有账号?
                    </a> : <div />}
                </p>
            </Modal>
        </div>

        let sign = <div id='modal'>
            <Modal
                title="注册需管理员登录"
                visible={this.state.visible}
                onOk={this.StudentToLogin}
                onCancel={this.close}
                footer={[
                    <Button key="返回" type="defult" onClick={this.close}>
                        返回
              </Button>,
                    <Button key="注册" type="primary" onClick={this.ToLogin}>
                        登录
              </Button>
                ]}
                visible={this.state.visible}
            >
                <Input id="username" addonBefore=" 账户 " placeholder="管理员账户" allowClear onChange={(x, v) => { this.setState({ username: v }) }}></Input>
                <p></p>
                <Input.Password id="password" addonBefore=" 密码 " onPressEnter={this.ToLogin} placeholder="管理员密码" allowClear onChange={(x, v) => { this.setState({ password: v }) }} />
                <p> </p>
                <Input style={{ width: "70%" }} addonBefore="验证码" onPressEnter={this.ToLogin} placeholder="不区分大小写" onChange={(e) => { this.setState({ inputValue: e.target.value }) }}
                    suffix={
                        <div style={{ width: 120, height: 30, backgroundImage: `url(${bg})`, textAlign: "center" }} >
                            {this.state.data.map((v, i) =>
                                <div
                                    key={i}
                                    className='itemStr'
                                    style={{
                                        transform: `skewX(${this.state.rotate[i]}deg)`,
                                        fontSize: `${this.state.fz[i]}px`,
                                        color: `rgb(${this.state.color[i].toString()})`,
                                        display: 'inline-block'
                                    }}
                                    onMouseEnter={() => this.setState({ refresh: true })}>
                                    {String.fromCharCode(v > 57 && v < 84 ? v + 7 : (v < 57 ? v : v + 13))}&nbsp;&nbsp;
                                 </div>
                            )}
                            {this.state.refresh
                                ?
                                <div
                                    className='mask'
                                    onClick={() => {
                                        this.setState({ ...this.initState(), refresh: false })
                                    }}
                                    onMouseLeave={() => { this.setState({ refresh: false }) }}
                                    style={{ fontSize: "10px" }}>
                                    看不清？点击此处刷新
                                </div>
                                :
                                null
                            }
                        </div>
                    }>
                </Input>
                <br></br>
            </Modal>
        </div>
        return (
            <React.Fragment>
                {this.state.toDo == "登录" ? login : sign}
            </React.Fragment>
        )
    }
}

export default LoginModal;