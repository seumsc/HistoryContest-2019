import React from 'react';
import { Row, Col, Icon, Carousel, Radio, Steps, Button, message, Tabs, Anchor, Calendar } from 'antd';
import 'antd/dist/antd.css';
import './Test.css';
import bg1 from '../../img/答题1.png';
import bg2 from '../../img/答题2.png';
// import bg3 from '../../img/答题3.png';
import bg4 from '../../img/答题4.png';
import Timer from '../Timer/Timer';
import Choice from '../Choice/Choice';
import TrueFalse from '../TrueFalse/TrueFalse';

let imgs = [bg1, bg2, bg4];
const { TabPane } = Tabs;
class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usernanme: "",
            isTesting: false,
            isPaperGet: false,
            isAllDone: false,
            settingVisible: false,
            focusOn: 0,
            pic:0,
            question: []
        }
        for (let i = 0; i < 20; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "选择题",
                title:"",
                choice: ['','','',''],
                isRight: false
            });
        }
        for (let i = 20; i < 30; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "判断题",
                title:"",
                choice: ['√','×'],
                isRight: false
            });
        }
        this.openControl = this.openControl.bind(this);
        this.closeControl= this.closeControl.bind(this);
        this.logout = this.logout.bind(this);
        this.done = this.done.bind(this);
        this.Next=this.Next.bind(this);
        //测试初始化
        this.state.question[0]={
            isFinish: false,
            kind: "选择题",
            title:"燃煤联合循环发电技术由哪个研究所长期研究",
            choice: ['东大建筑与环境研究所','东大热能工程研究所','东大能源与环境工程研究所','东大动力研究所'],
            isRight: false
        }
    }
    Next(){
        let x=this.state.focusOn;
        x++;
        if(x<30){
            this.setState({focusOn:x})
        }
    }
    componentWillMount(){//设定背景定时；获取试卷
        this.timer=setInterval(()=>{
            let x=(this.state.pic+1)%4;
            this.setState({pic:x});},
            3000)
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    openControl() {
        this.setState({ settingVisible: true });
    }
    closeControl() {
        this.setState({ settingVisible: false });
    }
    logout() {
        this.props.setState({
            isWelcome: true,
            isLogin: false,
            isStudent: false
        })
    }
    done(i) {
        let x = this.state.question;
        x[i].isFinish = true;
        this.setState({ question: x });
    }
    render(){
        return(
        <React.Fragment>
            <body style={{backgroundImage:`url(${imgs[(this.state.focusOn%3)]})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
                <header>
                    <Row>
                        <Col span={18}>
                    <h1 style={{color:'white'}}>&nbsp;&nbsp;东南大学校史校情知识竞赛</h1>
                    </Col>
                    <Col span= {6}>
                    <Timer state={this.state} setState={this.setState.bind(this)}/>
                    </Col>
                    </Row>
                </header>
                <Row className="Question">
                    <Col span={18} >
                        <Tabs activeKey={`${this.state.focusOn}`}
                            onTabClick={(x)=>{this.setState({focusOn:x})}} 
                            tabPosition="left" 
                            style={{ height: 640}} >
                            {this.state.question.map((x, i) => (
                                <TabPane tab={!x.isFinish ? <div><Icon type="clock-circle" /> {x.kind}{i + 1}</div> : <div><Icon type="check" />{x.kind}{i + 1}</div>}
                                    key={i}
                                    onChange={() => { this.done(i)}}
                                    >
                                    { x.kind=="选择题"?
                                        <Choice Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} />
                                        :<TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next}/>
                                    }
                                </TabPane>))
                            }
                        </Tabs>
                            </Col>
                        </Row>
            </body>       
        </React.Fragment>
        )
    }
}

export default Test