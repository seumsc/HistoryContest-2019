import React from 'react';
import 'antd/dist/antd.css';
import {Modal,Button, Input, Form, Icon }from 'antd';
const FormItem = Form.Item;
class LoginModal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      ModalText: 'Content of the modal',
      visible: this.props.visible,
      confirmLoading: false,
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }   
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <React.Fragment>
        <Modal
          title="登录"
          visible={this.props.visible}
          footer={
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              Or <a href="">注册</a>
            </FormItem>
          }
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="默认是学号哦~" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="默认是一卡通号哦~" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </React.Fragment>
          )
  }
}


export default Form.create()(LoginModal)