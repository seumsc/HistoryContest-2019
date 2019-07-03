import React, {
    Component
} from 'react';
import './welcome.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { EditorFormatSize } from 'material-ui/svg-icons';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pic: 0
        }
    }
    componentDidMount(){
        this.timerID=setInterval(()=>(this.changebg()),3000);
    }
    componentWillMount(){
        clearInterval(this.timerID);
    }
    async changebg(){
        setTimeout(document.getElementById("background").opacity=0.9,0);
        for(let x=80;x>=40;x-=10){
        setTimeout(document.getElementById("background").opacity=x/100,100);
    }
        
        document.getElementById("background").className="welcome"+(this.state.pic+1);
        this.state.pic=(this.state.pic+1)%4;
        for(let x=40;x<=100;x+=10){
            setTimeout(document.getElementById("background").opacity=x/100,100);
        }
    }
    render() {
        return ( <div className="WEL" >
            <header id="background"
                className="welcome1" >

                    <b>2019东南大学</b><br></br>
                    <b className="top">校史校情答题 </b>
                     < button className="login-button" >
                            登陆 / login 
                            </button> 
                            </header> 
                 </div>
                        )
                    }
                }
                
export default Welcome;