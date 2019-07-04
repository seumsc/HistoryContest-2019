import React, {
    Component
} from 'react';
import './dialog.css';
import "antd/dist/antd.css"
import {Button,Input,Modal,message} from 'antd';

class LoginModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:true,
            username:'',
            password:''
        }
        this.StudentToLogin=this.StudentToLogin.bind(this);
        this.close=this.close.bind(this);
    }

    componentWillUnmount(){
        this.setState({visible:false});
        this.state.username='';
        this.state.password='';
    }
    StudentToLogin(){
        //暂时的登陆函数
        message.success('登陆成功！');
        this.props.setState({isWelcome:false,isStudent:true,isLogin:true});
       
    }
    close(){
        this.setState({visible:false});
        this.props.close();
    }
    render(){ 
        return<div id='loginmodal'>
            <Modal
                title={this.props.state.attemp+"登陆"}
                visible={this.state.visible}
                onOk={this.StudentToLogin}
                onCancel={this.close}
                footer={[
                    <Button key="返回" type="defult" onClick={this.close}>
                      返回
                    </Button>,
                    <Button key="登陆" type="primary" onClick={this.StudentToLogin}>
                      登陆
                    </Button>,
                  ]}
            >
                <Input addonBefore="账户"placeholder="默认为八位学号" allowClear onChange={(x,v)=>{this.setState({username:v})}}></Input>
                <p></p>
                <Input addonBefore="密码" placeholder="默认为一卡通号码" allowClear onChange={(x,v)=>{this.setState({password:v})}}></Input>
            </Modal>
            </div>
            }

    }
    
    export default LoginModal;