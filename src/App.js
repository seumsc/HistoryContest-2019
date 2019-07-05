import React,{ Component } from 'react';
import './App.css';
import Welcome  from './welcome/welcome'
import Student from './student/student'
import "antd/dist/antd.css"
import {Button,Input,Modal,message} from 'antd';

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
        access: -1,
        score: -1
      },
      answer:{
        
      }
    }
    this.appSetState=this.appSetState.bind(this);
  }
  appSetState(x){
      this.setState(x);
  }
  
  render(){
  return <div id="app">
        {(this.state.isWelcome)?<Welcome state={this.state} setState={this.appSetState}/>:<div/>}
        {(this.state.isStudent&&this.state.userInfo.score<0)?<Student state={this.state} setState={this.appSetState}/>:<div/>}
  </div>
  }
}

export default App;

