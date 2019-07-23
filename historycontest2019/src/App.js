import React,{Suspense} from 'react';
import './App.css';
import 'antd/dist/antd.css';
const Welcome = React.lazy(() => import('./Components/Welcome/Welcome'));
const Test = React.lazy(() => import('./Components/Test/Test'));
const Grades = React.lazy(() => import('./Components/Grades/Grades'));
const Admin = React.lazy(() => import('./Components/admin/admin'));


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWelcome: false,
      isLogin: false,
      isStudent: false,
      isAllDone: false,
      isAdmin: true,
      isTeacher: false,
      host: "",
      userInfo:
      {
        name: 'zzz',
        username: "",
        depart: "",
        departId: -1,
        token: '',
        access: -1,
        score: -1
      },
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
      host: "",
      userInfo:
      {
        name: '',
        username: "",
        token: '',
        access: -1,
        score: -1
      },
      answer: []
    })
  }
  render() {
    return (
      <React.Fragment>
        <div id="index">
          <Suspense fallback={<div style={{width:"100%",height:"100%",backgroundColor:"black"}}></div>}>
            {this.state.isWelcome ? <Welcome state={this.state} setState={this.appState} /> : <div />}
            {this.state.isStudent && this.state.userInfo.score == -1 ? <Test state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
            {this.state.isTeacher ? <div /> : <div />}
            {this.state.isAdmin ? <Admin state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
            {this.state.isAllDone && this.state.userInfo.score >= 0 ? <Grades state={this.state} setState={this.appState} logout={this.logout} /> : <div />}
          </Suspense>
        </div>
      </React.Fragment>
    )
  }
}
export default App;
