
import React, {
    Component
} from 'react';
import './welcome.css';
import LoginModal from '../dialog/dialog.js'
import "antd/dist/antd.css"
import {Button, DatePicker ,Icon,Menu,Dropdown} from 'antd';
import bg1 from "../photo/11.png"
import bg2 from "../photo/3.jpg"
import bg3 from "../photo/4正.jpg"
import seu from "../photo/东南大学.png"
import words from "../photo/校史校情知识竞赛 .PNG"
import seus from "../photo/校徽.png"

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            pic:0,
            logining:false,
        };
        this.open=this.open.bind(this);
        this.changebg=this.changebg.bind(this);
        this.closModal=this.closModal.bind(this);
    }
    componentDidMount(){
        if(this.props.state.isWelcome){
            this.timerID=setInterval(()=>(this.changebg()),5000);
        }
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    changebg(){
       // setTimeout(document.getElementById("background").opacity=0.9,0);
       // for(let x=80;x>=40;x-=10){
       // setTimeout(document.getElementById("background").opacity=x/100,100);
       //}
       let x=(this.state.pic+1)%3;
        this.setState({pic:x});
       // for(let x=40;x<=100;x+=10){
       //      setTimeout(document.getElementById("background").opacity=x/100,100);
       // }
    }
    
    open(){
        this.setState({logining:true});
    }
    closModal(){
        this.setState({logining:false});
    }
    render() {
        let select=(
            <Menu>
                <Menu.Item key="1" onClick={()=>this.setState({attemp:"学生"})}>学生</Menu.Item>
                <Menu.Item key="2" onClick={()=>this.setState({attemp:"辅导员"})}>辅导员</Menu.Item>
                <Menu.Item key="3" onClick={()=>this.setState({attemp:"管理员"})}>管理员</Menu.Item>
            </Menu >
        )
        let orgin = (
        <div className="WEL" >
            <header className="welcome" 
            id="background" 
            style = {{backgroundImage:`url(${bg1})`}}
                 >
                <b className="sma"><img src={seu} height="100px" width="300px"></img></b><br></br>
                <b className="top"><img src={words} height="140px" width="936px"></img><br></br> </b>
                <p></p>
                < button 
                className="login-button"
                onClick={this.open}
                >
                    <Icon type="login" style={{color:"white"}}/>
                    &nbsp;
                    <b>Login &nbsp; 登录</b>
                    </button>
                    <p></p>
            </header>
        </div>
        );
        let login=(
            <div className="WEL" >
            <header className="welcome" 
            id="background" 
            style = {{backgroundImage:`url(${bg1})`}}>
                <b className="sma"><img src={seu} height="100px" width="300px"></img></b><br></br>
                <b className="top"><img src={words} height="140px" width="936px"></img><br></br> </b>
                <p></p>
                < button 
                className="login-button"
                onClick={this.open}
                disabled={true}
                >
                    <Icon type="loading" style={{color:"white"}}/>
                    &nbsp;
                    <b>登录中</b>
                    </button>
                    <p></p>

            </header>
            <LoginModal state={this.state}  setState={this.props.setState} close={this.closModal}/>
        </div>
        );
        let x=(this.state.logining ?login: orgin);
        return x;
    }
                   
}
                
export default Welcome;