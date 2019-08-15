import React,{Suspense} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Result} from 'antd'
const Welcome = React.lazy(() => import('./Components/Welcome/Welcome'));
const Test = React.lazy(() => import('./Components/Test/Test'));
const Grades = React.lazy(() => import('./Components/Grades/Grades'));
const Admin = React.lazy(() => import('./Components/admin/admin'));
const Super = React.lazy(() => import('./Components/admin/superAdmin'));


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWelcome: true,
      isLogin: false,
      isStudent: false,
      isAllDone: false,
      isAdmin: false,
      isTeacher: false,
      host: "localhost:6553",
        name: 'hkh',
        username: "09018316",
        depart: "",
        departId: "",
        token: '',
        access: -1,
        score: -1,
  
      answer: [],
    }
    this.appState = this.appState.bind(this);
    this.logout = this.logout.bind(this);
  }
  appState(obj) {
    this.setState(obj);
  }
  logout() {
    this.setState({
      isWelcome: true,
      isLogin: false,
      isStudent: false,
      isAllDone: false,
      isAdmin: false,
      isTeacher: false,
        name: '',
        username: "",
        token: '',
        access: -1,
        score: -1,
      answer: []
    })
  }
  render() {
    return (
      <React.Fragment>
        <div id="index" className="app">
          <Suspense fallback={<div style={{width:"100%",height:"100%",backgroundColor:"black"}}></div>}>
            {this.state.isWelcome ? <Welcome state={this.state} setState={this.appState} /> : <div />}
            {this.state.isStudent && this.state.score == -1 ? <Test state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
            {this.state.isTeacher ? <Admin state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
            {this.state.isAdmin ? <Super state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
            {this.state.score >= 0 ? <Grades state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
          </Suspense>
        </div>
      </React.Fragment>
    )
  }
}
export default App;
