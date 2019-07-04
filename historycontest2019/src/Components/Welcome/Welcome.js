import React from 'react';
import bg1 from '../../img/图片1.jpg';
import bg2 from '../../img/图片2.jpg';
import bg3 from '../../img/图片3.jpg';
import './Welcome.css';

var imgs = [bg1, bg2, bg3];
class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x:0,
            userInfo:
            {
                username:'',
                token:'',
                access:-1,
                isLogin:false,
                score:0
            },
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
    render(){
        return(
            <React.Fragment>
                <div className = "Welcome">
                    <body className = "Welcome-body"  style = {{backgroundImage:`url(${imgs[this.state.x]})`}}>
                        <h1 class="text-center">2019东南大学校史校情知识竞赛答题</h1>
                        <button><b>Login 登录</b></button>
                    </body>
                </div>
            </React.Fragment>
        )
    }
}

export default Welcome;