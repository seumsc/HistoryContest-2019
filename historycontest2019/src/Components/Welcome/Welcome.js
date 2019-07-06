import React from 'react';
import bg1 from '../../img/图片1.jpg';
import bg2 from '../../img/图片2.jpg';
import bg3 from '../../img/图片3.jpg';
import './Welcome.css';
import 'antd/dist/antd.css';
import {Modal,Button}from 'antd';
import LoginModal from '../LoginModal/LoginModal';

var imgs = [bg1, bg2, bg3];
class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x:0,
            value:false
        };
    } 
    componentDidMount() {
        this.timer = setInterval(function () {
            var x = this.state.x;
            x++;
            x=x%3;
            this.setState({x:x});
        }.bind(this), 5000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }    
    showModal = () => {
        this.setState({
          value: true,
        });
      };
    
    render(){
        let value = false;
        return(
            <React.Fragment>
                <div className = "Welcome">
                    <body className = "Welcome-body"  style = {{backgroundImage:`url(${imgs[this.state.x]})`}}>
                        <h1 class="text-center" style = {{color:'white'}}>2019东南大学校史校情知识竞赛答题</h1>
                        <Button type="dashed" size="large" ghost onClick={this.showModal}>Login 登录</Button>
                        <LoginModal visible = {this.state.value}/>
                    </body>
                </div>
            </React.Fragment>
        )
    }
}

export default Welcome;