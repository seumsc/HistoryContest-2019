import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Welcome from './Components/Welcome/Welcome';
import LoginModal from './Components/LoginModal/LoginModal';
import Test from './Components/Test/Test';
import Grades from './Components/Grades/Grades';
import Admin from './Components/admin/admin'
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isWelcome:false,
      isLogin:false,
      isStudent:false,
      isAllDone:false,
      isAdmin:true,
      isTeacher:false,
      host:"",
      userInfo:
      {
        name:'zzz',
        username:"",
        token:'',
        access:-1,
        score:-1
      },
      answer:[],
    }
    this.appState = this.appState.bind(this);
    this.logout=this.logout.bind(this);
  }
  appState(obj){
    this.setState(obj);
}
logout() {
  this.props.setState({
    isWelcome:true,
    isLogin:false,
    isStudent:false,
    isAllDone:false,
    isAdmin:false,
    isTeacher:false,
    host:"",
    userInfo:
    {
      name:'',
      username:"",
      token:'',
      access:-1,
      score:-1
    },
    answer:[]
  })
}
  render(){
    return(
      <React.Fragment>
        <div id="index">
              {this.state.isWelcome?<Welcome state={this.state} setState={this.appState}/>:<div/>}
              {this.state.isStudent&&this.state.userInfo.score==-1?<Test state={this.state} setState={this.appState} logout={this.logout}/>:<div/>}
              {this.state.isTeacher?<div/>:<div/>}
              {this.state.isAdmin?<Admin state={this.state} setState={this.appState} logout={this.logout}/>:<div/>}
              {this.state.isAllDone&&this.state.userInfo.score>=0?<Grades state={this.state} setState={this.appState} logout={this.logout}/>:<div/> }
              </div>
      </React.Fragment>
    )
  }
}
export default App;
