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


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            pic:0,
            logining:false,
            username:'',
            password:''
        };
        this.test=this.test.bind(this);
        this.close=this.close.bind(this);
        this.tologin=this.tologin.bind(this);
    }
    componentDidMount(){
        this.timerID=setInterval(()=>(this.changebg()),3000);
    }
    componentWillMount(){
        clearInterval(this.timerID);
    }
    changebg(){
       // setTimeout(document.getElementById("background").opacity=0.9,0);
       // for(let x=80;x>=40;x-=10){
       // setTimeout(document.getElementById("background").opacity=x/100,100);
       //}
        
        document.getElementById("background").className="welcome"+(this.state.pic+1);
        this.state.pic=(this.state.pic+1)%4;
       // for(let x=40;x<=100;x+=10){
       //      setTimeout(document.getElementById("background").opacity=x/100,100);
       // }
    }
    
    test(){
        this.setState({logining:true});
    }
    close(){
        this.setState({logining:false});
    }
    tologin(){
        //登陆函数
        this.props.setState({isWelcome:false,isStudent:true});
    }
    render() {
        let orgin = (
        <div className="WEL" >
            <header id="background"
                className="welcome1" >
                <b className="sma">2019东南大学</b><br></br>
                <b className="top">校史校情知识竞赛 <br></br> </b>
                <p></p>
                < button className="login-button"
                    onClick={this.test}
                >
                    登陆 / login
                    </button>

            </header>
        </div>
        );
        let login=(
            <div>
            <div className="WEL" >
            <header id="background"
                className="welcome1" >

                <b className="sma">2019东南大学</b><br></br>
                <b className="top">校史校情答题 <br></br> </b>

                < button className="login-button"
                    onClick={this.test}
                >
                    登陆 / login
                    </button>

            </header>
        </div>
        <div>
            <MuiThemeProvider>
                <Dialog
                    title="答题系统登陆"
                    actions={[
                        <FlatButton
                            label="取消"
                            primary={true}
                        onClick={this.close}
                        />,
                        <FlatButton
                            label="登录"
                            primary={true}
                            keyboardFocused={true}
                        onClick={this.login}
                        />,
                    ]}
                    modal={false}
                    open={this.state.logining}
                    onRequestClose={this.handleClose}
                   >
                    <TextField
                        floatingLabelText="用户名"
                        hintText="默认是八位学号哦~"
                        //errorText={this.state.errorText}
                        onChange={(e, v) => { this.setState({ username: v }) }}
                    /><br />
                    <TextField
                        floatingLabelText="密码"
                        hintText="默认是一卡通号哦~"
                        type="password"
                        onChange={(e, v) => { this.setState({ password: v }) }}
                    /><br />
                </Dialog>
            </MuiThemeProvider></div></div>
        );
        return (this.state.logining ? login : orgin);
    }
                   
}
                
export default Welcome;