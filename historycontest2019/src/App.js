import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Welcome from './Components/Welcome/Welcome';
import LoginModal from './Components/LoginModal/LoginModal';
import Test from './Components/Test/Test';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isWelcome:true,
      isLogin:false,
      isStudent:false,
      isAdmin:false,
      isTeacher:false,
      userInfo:
      {
        username:'',
        token:'',
        access:-1,
        isLogin:false,
        score:0
      },
      answer:{
      choice:{},
      true_false:{}
      },
    }
    this.appState = this.appState.bind(this);
  }
  appState(obj){
    this.setState(obj);
}
  render(){
    return(
      <React.Fragment>
        <div id="index">
              {this.state.isWelcome?<Welcome state={this.state} setState={this.appState}/>:<div/>}
              {this.state.isTest&&this.state.userInfo.score==0?<LoginModal state={this.state} setState={this.appState}/>:<div/>}
              {this.state.isStudent&&this.state.userInfo.score==0?<Test state={this.state} setState={this.appState}/>:<div/>}
              {this.state.userInfo.score>0&&(this.state.userInfo.access==2)?<div/>:<div/>}
              {this.state.isAdmin?<div/>:<div/>}
              </div>
      </React.Fragment>
    )
  }
}
export default App;
