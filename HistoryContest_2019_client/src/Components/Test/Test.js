
import React from 'react';
import { Row, Col, Tabs, Button, Modal, Layout, Badge, message,notification,Icon } from 'antd';
import 'antd/dist/antd.css';
import './Test.css';
import bg1 from '../../img/background1.jpg';
import BG from '../../img/图片2.jpg'
import mark from '../../img/校徽实体.png'
import Timer from '../Timer/Timer';
import Choice from '../Choice/Choice';
import TrueFalse from '../TrueFalse/TrueFalse';
import QueueAnim from 'rc-queue-anim';
const bg2 = React.lazy(() => import('../../img/background2.jpg'))
const bg3 = React.lazy(() => import('../../img/background3.jpg'))
const bg4 = React.lazy(() => import('../../img/background4.jpg'))
const bg5 = React.lazy(() => import('../../img/background5.jpg'))
const bg6 = React.lazy(() => import('../../img/background6.jpg'))
const bg7 = React.lazy(() => import('../../img/background7.jpg'))
const bg8 = React.lazy(() => import('../../img/background8.jpg'))
const bg9 = React.lazy(() => import('../../img/background9.jpg'))
const bg10 = React.lazy(() => import('../../img/background10.jpg'))
const bg11 = React.lazy(() => import('../../img/background11.jpg'))




let imgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];
const { TabPane } = Tabs;
const { Header, Footer, Content } = Layout;
const allChoiceQuestion = require("../../data/choice_question.json")
const allJudgeQuestion = require("../../data/judgment_question.json")
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTesting: false,
            isPaperGet: false,
            focusOn: 0,
            pic: 0,
            question: [],
        }
        for (let i = 0; i < 20; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "选择题",
                title: "",
                option: [{}, {}, {}, {}],
                value: -1
            });
        }
        for (let i = 20; i < 30; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "判断题",
                title: "",
                option: ['√', '×'],
                value: -1
            });
        }
        this.done = this.done.bind(this);
        this.Next = this.Next.bind(this);
        this.Prev = this.Prev.bind(this);
        this.submit = this.submit.bind(this);

    }
    Next(e) {
        if (e) {
            let x = this.state.focusOn;
            x++;
            if (x < 30) {
                this.setState({ focusOn: x })
            }
        }
        else {
            setTimeout(() => {
                let x = this.state.focusOn;
                x++;
                if (x < 30) {
                    this.setState({ focusOn: x })
                }
            }, 500);
        }
    }
    Prev() {
        let n = this.state.focusOn;
        n--;
        if (n >= 0) {
            this.setState({ focusOn: n })
        }
    }
    Random(arr) {
        let length = arr.length,
            randomIndex,
            temp;
        while (length) {
            randomIndex = Math.floor(Math.random() * (--length));
            temp = arr[randomIndex];
            arr[randomIndex] = arr[length];
            arr[length] = temp
        }
        return arr;
    }
    componentWillMount() {
        //测试初始化
        // for (let i = 0; i < 20; i++) {
        //     this.state.question[i].title = allChoiceQuestion[i]["title"];
        //     this.state.question[i].option=
        //     [
        //         {
        //             text: allChoiceQuestion[i]["options"][0],
        //             value: 1
        //         },
        //         {
        //             text: allChoiceQuestion[i]["options"][1],
        //             value: 2
        //         },
        //         {
        //             text: allChoiceQuestion[i]["options"][2],
        //             value: 3
        //         },
        //         {
        //             text: allChoiceQuestion[i]["options"][3],
        //             value: 4
        //         }
        //     ]
        // }
        // for (let i = 20; i < 30; i++) {
        //     this.state.question[i].title = allJudgeQuestion[i-20]["title"];
        // }
        //试卷获取
        this.setState({ isPaperGet: true })
        let that = this;
        fetch('http://' + that.props.state.host + '/api/student/test', {
            method: 'GET',
            mode: 'cors',
            headers: {
                "authorization": that.props.state.token,
            },
        }
        ).then(
            res => { return res.json()}
        ).then(
            data => {
                if (data["message"] == undefined) {
                    if (data.status == 403) {
                        message.error("错误!该用户已完成答题",1.5);
                        that.props.logout();
                    }
                    else {
                        //that.props.state.answer=data.Choice_question.concat(data.Judgment_question)
                        for (let i = 0; i < 20; i++) {
                            that.state.question[i].title = allChoiceQuestion[data.Paper.Choice_question[i]-1]["title"];
                            let temp = [
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]-1]["options"][0],
                                    value: 1
                                },
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]-1]["options"][1],
                                    value: 2
                                },
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]-1]["options"][2],
                                    value: 3
                                },
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]-1]["options"][3],
                                    value: 4
                                }
                            ]
                            that.state.question[i].option = this.Random(temp);
                            that.state.question[i].value=-1;
                        }
                        for (let i = 20; i < 30; i++) {
                            that.state.question[i].title =allJudgeQuestion[data.Paper.Judgment_question[i - 20]-1]["title"];
                            that.state.question[i].value=-1;
                        }
                        that.setState({ isPaperGet: true });
                        console.log("get the paper!")
                    }
                }
                else {
                    console.log("out")
                    message.error("登陆已过期",1.5);
                    this.props.logout();
                }
            }
        )
    }

    componentWillUnmount() {
        console.log(this.props.state.username)
    }

    submit() {
        //暂时的提交函数
        // this.props.setState({
        //     isWelcome: false,
        //     isLogin: true,
        //     isStudent: true,
        //     isAllDone: true,
        //     isAdmin: false,
        //     isTeacher: false,
        //     host: "",


        //         name: '菜鸡',
        //         username: "",
        //         token: '',
        //         access: -1,
        //         score: 90

        //     answer: this.state.question
        // })

        //提交函数
        let that = this;
        let data = { Answer: [], Username: this.props.state.username };
        this.state.question.forEach((x, i) => {
            data.Answer.push(x.value)
        })
        fetch("http://" + that.props.state.host + "/api/student/handin",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "authorization": that.props.state.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                if (res.status == 403) {
                    message.warning("非法答题!",1.5)
                }
                else {
                    let data = await res.json();
                    if (data.message == undefined) {
                        if(data.msg=="答题时间过短,请认真答题"){
                            message.warning("答题时间过短,请认真答题",1)
                        }
                        else{
                        console.log("handin successfully");
                        message.success("提交成功!",1.5);
                        that.props.setState({ isAllDone: true, answer: that.state.question })
                        that.props.setState({ score: data.Score })
                        }
                    }
                    else {
                        message.error("登陆已过期",1.5);
                        this.props.logout();
                    }
                }
            }
            )

    }
    async done(i, value) {
        let x = this.state.question;
        x[i].isFinish = true;
        x[i].value = value;
        await this.setState({ question: x });
        let result=this.state.question.filter((x,i)=>{
            return !x.isFinish
        })
        if(result.length==0){
            this.setState({focusOn:29});
            notification.open({
                message: "所有题目已完成",
                description: "前往最后一题点击完成按钮吧！",
                icon: <Icon type="check" style={{ color: "blue" }} />
            })
        }
    }
    render() {
        if (!this.state.isTesting) {
            return (
                <div style={{
                    backgroundImage: `url(${BG})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "100%", height: "100%",
                    position: "absolute",
                    top: "0px",
                    bottom: "0px",
                    minWidth:"700px"
                }}>
                    <Modal
                        visible={!this.state.isTesting}
                        closable={false}
                        title="答题须知"
                        centered={true}
                        footer={[
                            <Button type="primary" loading={!this.state.isPaperGet}
                                onClick={() => {
                                    let that = this;
                                    //temp
                                    //  
                                    //开始函数
                                    fetch("http://" + this.props.state.host + '/api/student/start',
                                          {
                                            method: 'GET',
                                            mode: 'cors',
                                            headers: {
                                                "authorization": that.props.state.token
                                            },
                                        }
                                        ).then((data) => {
                                                if (data.message == undefined) {
                                                    message.success("答题开始,加油!",1.5)
                                                    that.setState({ isTesting: true })
                                                }
                                                else {
                                                    message.error("登陆已过期",1.5);
                                                    this.props.logout();
                                                }
                                            })

                                }}>
                                开始答题
                      </Button>
                        ]}>
                        <b style={{ fontSize: "18px", color: "#1890ff" }}>&nbsp;{this.props.state.name}同学,你好!</b><br></br>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到校史校情竞赛答题!</p><p></p>

                        <ul style={{ fontSize: "15px" }}>

                            <li key="1">本答题共有<b>30道题</b>,&nbsp;其中有<b>20道选择题,&nbsp;10道判断题</b></li>

                            <li key="2">选择题每道4分,&nbsp;判断题每道2分,&nbsp;满分共<b>100分</b></li>

                            <li key="3">答题时限为<b>3分钟-30分钟</b>,&nbsp;3分钟之前无法交卷,&nbsp;30分钟时自动交卷</li>

                            <li key="4">在未成功交卷前,&nbsp;出现特殊情况,可重新进入答题</li>

                            <li key="5">对本答题系统有疑问,&nbsp;可联系在场负责老师</li>

                        </ul>
                    </Modal>
                </div>
            )
        }
        return (
            <React.Fragment>
                <Layout style={{ overflow: "hidder", minWidth: "800px" }}>
                    <Header>
                        <Row>
                            <QueueAnim delay={100} duration={700}>
                            <Col span={10} offset={1} key="1">
                                <h1 style={{ color: 'white', fontSize: "calc(15px + 2vmin)" }}><img src={mark} height="50px" width="50px" />&nbsp;东南大学校史校情知识竞赛</h1>
                            </Col>
                            <Col span={5} offset={7} key="2">
                                <Timer state={this.state} setState={this.setState.bind(this)} finish={this.submit} min={29} sec={59} info={"  答题倒计时："} />
                            </Col>
                            </QueueAnim>
                        </Row>
                    </Header>
                    <Content style={{ backgroundColor: 'rgb(17,17,19)' }}>
                        <Row >
                            <Col span={22} offset={1}>
                                <Tabs className="background-1"
                                    activeKey={`${this.state.focusOn}`}
                                    animated='true'
                                    onTabClick={(x) => { this.setState({ focusOn: x }) }}
                                    tabBarGutter="8px"
                                    tabBarStyle={{
                                        fontSize:"50px"
                                    }}
                                    tabPosition="bottom"
                                    size="large"
                                    style={{  textAlign: "center" }}>
                                    {this.state.question.map((x, i) => (
                                        <TabPane tab={!x.isFinish ?
                                            <Badge dot={true} > <div style={{ color: 'white' ,fontSize:"18px"}}>{i + 1}</div></Badge> :
                                            <div style={{ color: 'white' }}>{i + 1}</div>}
                                            key={i}
                                            //onChange={() => { this.done(i) }}
                                            style={{ textAlign: "left" }}
                                        >
                                            {x.kind=="选择题" ?
                                                <Choice  Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev}
                                                    submit={this.submit} />
                                                : <TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev} submit={this.submit} />
                                            }

                                        </TabPane>)
                                    )
                                    }
                                </Tabs>
                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}> &nbsp;版权所有© 靠脸吃饭工作室</Footer>
                </Layout>
            </React.Fragment>
        )
    }
}
export default Test
