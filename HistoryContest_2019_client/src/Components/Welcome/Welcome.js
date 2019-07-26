import React from 'react';
import './Welcome.css';
import 'antd/dist/antd.css';
import bg1 from '../../img/1.png';
import seu from '../../img/东南大学.png';
import words from '../../img/校史校情知识竞赛 .PNG';
import {Icon}from 'antd';
import LoginModal from '../LoginModal/LoginModal';

class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logining:false,
        };
        this.open=this.open.bind(this);
        this.closModal=this.closModal.bind(this);
    } 
    open(){
        this.setState({logining:true});
    }
    closModal(){
        this.setState({logining:false});
    }
    
    render(){
        let origin = (
        <div className="WEL" style={{minWidth:"500px"}}>
            <header className="welcome" 
            id="background" 
            style = {{backgroundImage:`url(${bg1})`,                  
             backgroundSize: 'cover',
             backgroundPosition: 'center',
            width: "100%", height: "100%",
            position: "absolute",
            top: "0px",
            bottom: "0px"}}
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
            style = {{backgroundImage:`url(${bg1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: "100%", height: "100%",
            position: "absolute",
            top: "0px",
            bottom: "0px"}}>
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
            <LoginModal state={this.state}  host={this.props.state.host}setState={this.props.setState} close={this.closModal}/>
        </div>
        );
        let x=(this.state.logining?login: origin);
        return x;
    }
}

export default Welcome;