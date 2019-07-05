import React, {
    Component
} from 'react';
import './dialog.css';
import "antd/dist/antd.css"
import {Icon,Button,Input,Modal,message} from 'antd';
import { thisExpression } from '@babel/types';

class LoginModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:true,
            username:'',
            password:'',
            toDo:"登陆"
        }
        this.ToLogin=this.ToLogin.bind(this);
        this.close=this.close.bind(this);
        this.signin=this.signin.bind(this);
        this.ToSignin=this.ToSignin.bind(this);
    }

    componentWillUnmount(){
        this.setState({visible:false});
        this.state.username='';
        this.state.password='';
    }
    ToLogin(){
        //暂时的登陆函数
        //最后要区分登陆请求
        let x=document.getElementById("username").value;
        let y=document.getElementById("password").value;
        if(isNaN(x)) {
            message.warn("输入非学号哟");
            return;
        }
        //学生登陆成功
        message.success("登陆成功！");
        this.props.setState({isWelcome:false,isStudent:true,isLogin:true});
    }
    ToSignin(){
        //暂时的注册函数
        this.props.setState({isWelcome:false,isStudent:true,isLogin:true});
    }
    close(){
        this.setState({visible:false});
        this.props.close();
    }
    signin(){
        this.setState({toDo:"注册"});
    }
    render(){ 
        let login=(
            [
                <Button key="注册" type="ghost" size="small" onClick={this.signin}>
                  注册
                </Button>,
                <Button key="返回" type="defult" onClick={this.close}>
                  返回
                </Button>,
                <Button key="登陆" type="primary" onClick={this.ToLogin}>
                    <Icon type="check-circle" theme="twoTone" />
                  登陆
                </Button>
              ]
        )
        let sign=(
            [
                <Button key="返回" type="defult" onClick={this.close}>
                  返回
                </Button>,
                <Button key="登陆" type="primary" onClick={this.ToSignin}>
                  注册
                </Button>
            ]
        )
        return<div id='modal'>
            <Modal
                title={this.props.state.attemp+this.state.toDo}
                visible={this.state.visible}
                onOk={this.StudentToLogin}
                onCancel={this.close}
                footer={this.state.toDo=="登陆"?login:sign}
                visible={this.state.visible}
            >
                <Input id="username"addonBefore=" 账户 "placeholder="八位学号" allowClear onChange={(x,v)=>{this.setState({username:v})}}></Input>
                <p></p>
                <Input id="password"addonBefore=" 密码 " placeholder="一卡通号码" allowClear onChange={(x,v)=>{this.setState({password:v})}}></Input>
                <p > <br></br>非特殊情况不用注册哦~</p>
            </Modal>
            </div>
            }

    }
    
    export default LoginModal;