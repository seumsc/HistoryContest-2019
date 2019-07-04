import React from 'react';
import './App.css';
import Welcome from './Components/Welcome/Welcome';

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
  }
  render(){
    return(
      <React.Fragment>
        <div className = "login">
          <Welcome />
        </div>
      </React.Fragment>
    )
  }
}

export default App;
