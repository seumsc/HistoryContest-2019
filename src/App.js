import React,{ Component } from 'react';
import './App.css';
import Welcome  from './welcome/welcome'
import Student from './student/student'

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
        access:  -1,
        score:   0
      },
      answer:{
        
      }
    }
  }
  
  render(){
  return <div id="app">
        {(this.state.isWelcome)?<Welcome state={this.state} setState={this.setState}/>:<div/>}
        {(this.state.isStudent)?<Student state={this.state} setState={this.setState}/>:<div/>}
  </div>
  }
}

export default App;

