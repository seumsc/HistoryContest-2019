import React, {
    Component
} from 'react';
import './welcome.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { EditorFormatSize } from 'material-ui/svg-icons';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import LoginModal from '../dialog/dialog.js'
import "antd/dist/antd.css"
import {Button, DatePicker ,Icon,Menu,Dropdown} from 'antd';
import bg1 from "../photo/1.jpg"
import bg2 from "../photo/3.jpg"
import bg3 from "../photo/4正.jpg"
import seu from "../photo/东南大学.png"



class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            pic:0,
            logining:false,
            attemp:"学生"
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
                <b className="sma"><img src={seu} height="150px" width="400px"></img></b><br></br>
                <b className="top">校史校情知识竞赛 <br></br> </b>
                <p></p>
                < Button type="primary" 
                style={{backgroundColor:"rgb(251,226,81,0.5)", color:"white",height:"60px",width:"250px",fontSize:"30px",borderRadius:"20px",border:"none"}}
                onClick={this.open}
                >
                    <Icon type="login" style={{color:"white"}}/>
                    &nbsp;
                    <b>Login &nbsp; 登陆</b>
                    </Button>
                    <p></p>
                    <Dropdown overlay={select}>
                        <Button type="defult">
                            <Icon type="down" />
                            {this.state.attemp}
                        </Button>
                    </Dropdown>
            </header>
        </div>
        );
        let login=(
            <div className="WEL" >
            <header className="welcome" 
            id="background" 
            style = {{backgroundImage:`url(${bg1})`}}>
            <b className="sma"><img src={seu}></img></b><br></br>
                <b className="top">校史校情知识竞赛 <br></br> </b>
                <p></p>
                < Button type="primary" size="large"
                
                    onClick={this.open}
                >
                    <Icon type="login"/>
                    登陆 / login
                    </Button>
                    <p></p>
                    <Dropdown overlay={select}>
                        <Button type="defult">
                            <Icon type="down" />
                            {this.state.attemp}
                        </Button>
                    </Dropdown>
            </header>
            <LoginModal state={this.state}  setState={this.props.setState} close={this.closModal}/>
        </div>
        );
        let x=(this.state.logining ?login: orgin);
        return x;
    }
                   
}
                
export default Welcome;