import React, {
    Component
} from 'react';
import './student.css';
import "antd/dist/antd.css";
import { Button, Input, Modal, message, Layout, Menu, Dropdown, Icon, Drawer, Tabs, Row, Col } from 'antd';
import logo from "../photo/校徽实体.png"
import {Choice,TrueFalse,Timer}  from "../question/qusetion"
import pic1 from "../photo/答题1.png"
import pic2 from "../photo/答题2.png"
import pic3 from "../photo/答题4.png"

const imgs=[pic1,pic2,pic3];
const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
//let bg=[pic1,pic2,pic3,pic4];

class Student extends React.Component {
    constructor(props) {
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
        // this.timer=setInterval(()=>{
        //     let x=(this.state.pic+1)%4;
        //     this.setState({pic:x});},
        //     3000)
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
    render() {
        if(!this.state.isTesting){
        }
        return (
            <React.Fragment>
                <div id="student" style={{backgroundImage:`url(${imgs[(this.state.focusOn%3)]})`, 
                backgroundSize:'cover', 
                backgroundPosition:'center',
                transition:'1.5s'}}>
                <Drawer
                    title="选项"
                    placement="left"
                    closable={false}
                    onClose={this.closeControl}
                    visible={this.state.settingVisible}
                >
                    <p></p>
                    <Button type="danger" onClick={this.logout} block={true}>注销/logout</Button>
                </Drawer>
                    <Header className="header">
                        <Row >
                            <Col span={2}> <Button type="primary" onClick={this.openControl}><Icon type="menu-unfold" /></Button> </Col>
                            <Col span={1} ><img src={logo} width="40" height="40"></img> </Col>
                            <Col span={8} style={{ color: "white", fontSize: "35px" }}>校史校情知识竞赛</Col>
                            <Col span={7}></Col>
                            <Col span={6} >  <Timer state={this.state} setState={this.setState.bind(this)}/></Col>
                        </Row>
                    </Header>

                    <Content className="content">
                        <Row>
                            <Col span={18} >
                                <Tabs activeKey={`${this.state.focusOn}`}
                                onTabClick={(x)=>{this.setState({focusOn:x})}} 
                                tabPosition="left" 
                                style={{ color: "black" }}
                                className="Question" >
                                    {this.state.question.map((x, i) => (
                                        <TabPane tab={!x.isFinish ? <div><Icon type="clock-circle" /> {x.kind}{i + 1}</div> : <div><Icon type="carry-out" />&nbsp;{x.kind}{i + 1}</div>}
                                            key={i}
                                            onChange={() => { this.done(i)}}
                                            >
                                            {x.kind=="选择题"?
                                            <Choice Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} />
                                            :<TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next}/>
                                            }
                                        </TabPane>))
                                    }
                                </Tabs>
                            </Col>
                        </Row>
                    </Content> 
                </div>
            </React.Fragment>
        )
    }
}

export default Student;