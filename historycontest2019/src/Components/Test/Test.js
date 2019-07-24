import { nullLiteral } from '@babel/types';
import React from 'react';
import { Row, Col, Icon, Tabs, Button, Modal, Layout, Badge, message } from 'antd';
import 'antd/dist/antd.css';
import './Test.css';
import bg1 from '../../img/background1.png';
// import bg2 from '../../img/background2.png';
// import bg3 from '../../img/background3.png';
// import bg4 from '../../img/background4.jpg';
// import bg5 from '../../img/background5.jpg';
// import bg6 from '../../img/background6.jpg';
// import bg7 from '../../img/background7.jpg';
// import bg8 from '../../img/background8.jpg';
// import bg9 from '../../img/background9.jpg';
// import bg10 from '../../img/background10.jpg';
// import bg11 from '../../img/background11.jpg';
import BG from '../../img/图片2.jpg'
import mark from '../../img/校徽实体.png'
import Timer from '../Timer/Timer';
import Choice from '../Choice/Choice';
import TrueFalse from '../TrueFalse/TrueFalse';
const bg2=React.lazy(()=>import ('../../img/background2.png'))
const bg3=React.lazy(()=>import ('../../img/background3.png'))
const bg4=React.lazy(()=>import ('../../img/background4.jpg'))
const bg5=React.lazy(()=>import ('../../img/background5.jpg'))
const bg6=React.lazy(()=>import ('../../img/background6.jpg'))
const bg7=React.lazy(()=>import ('../../img/background7.jpg'))
const bg8=React.lazy(()=>import ('../../img/background8.jpg'))
const bg9=React.lazy(()=>import ('../../img/background9.jpg'))
const bg10=React.lazy(()=>import ('../../img/background10.jpg'))
const bg11=React.lazy(()=>import ('../../img/background11.jpg'))




let imgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];
const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;
const allChoiceQuestion = require("./question-test1.json")
const allJudgeQuestion = require("./question-test2.json")
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
        allChoiceQuestion.question.forEach((x, i) => {
            this.state.question[i] = x
        })
        allChoiceQuestion.question.forEach((x, i) => {
            this.state.question[i+20] = x
        })
        //试卷获取
        this.setState({ isPaperGet: true })
        let that = this;
        fetch('http://' + that.props.state.host + '/api/student/test', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "authorization": that.props.state.userInfo.token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify({
                Username: that.props.state.username,
            })
        }
        ).then(
            res => { return res.json()}
        ).then(
            data => {
                if (data.message == undefined) {
                    if (data.status == 403) {
                        message.error("错误!该用户已完成答题");
                        that.props.logout();
                    }
                    else {
                        for (let i = 0; i < 20; i++) {
                            that.state.question[i].title = allChoiceQuestion[data.Paper.Choice_question[i]].title;
                            let temp = [
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]][option][0],
                                    value: 1
                                },
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]][option][1],
                                    value: 2
                                },
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]][option][2],
                                    value: 3
                                },
                                {
                                    text: allChoiceQuestion[data.Paper.Choice_question[i]][option][3],
                                    value: 4
                                }
                            ]
                            that.state.question[i].option = this.Random(temp);
                        }
                        for (let i = 20; i < 30; i++) {
                            that.state.question[i].title =allJudgeQuestion[data.Paper.Judgment_question[i - 20]].title;
                        }
                        that.setState({ isPaperGet: true });
                    }
                }
                else {
                    message.error("登陆已过期");
                    this.props.logout();
                }
            }
        )
    }

    componentWillUnmount() {
    }

    submit() {
        //暂时的提交函数
        this.props.setState({
            isWelcome: false,
            isLogin: true,
            isStudent: true,
            isAllDone: true,
            isAdmin: false,
            isTeacher: false,
            host: "",
            userInfo:
            {
                name: '菜鸡',
                username: "",
                token: '',
                access: -1,
                score: 90
            },
            answer: this.state.question
        })

        //提交函数
        // let that = this;
        // let data={Answer:[],username:this.props.state.userInfo.username};
        // this.state.question.forEach((x,i)=>{
        //     data.Answer.push(x.value)
        // })
        // fetch("htttp://" + that.props.state.host + "/api/student/hangin",
        //     {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //             "authorization": that.props.state.userInfo.token,
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         body: JSON.stringify(data)
        //     }.then(async (res)=>{
        //         if(res.status==403){
        //             message.warning("答题所用时间过短,请认真答题~")
        //         }
        //         else{
        //             let data=await res.json();
        //             if(data.message==undefined){
        //             that.props.setState({isAllDone:true});
        //             console.log("handin successfully");
        //             message.success("提交成功!")
        //             that.props.setState({userInfo:{score:data.Score}})
        //             }
        //             else{
        //                 message.error("登陆已过期");
        //                 this.props.logout();
        //             }
        //         }
        //     }
        // )
        // )
    }
    done(i, value) {
        let x = this.state.question;
        x[i].isFinish = true;
        x[i].value = value;
        this.setState({ question: x });
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
                    bottom: "0px"
                }}>
                    <Modal
                        visible={!this.state.isTesting}
                        title="答题须知"
                        centered={true}
                        footer={[
                            <Button type="primary" //loading={!this.state.isPaperGet}
                                onClick={() => {
                                    let that = this;
                                    //temp
                                    that.setState({ isTesting: true })
                                    //开始函数
                                    // fetch("http://" + this.props.state.host + '/api/student/start',
                                    //     {
                                    //         method: 'POST',
                                    //         mode: 'cors',
                                    //         headers: {
                                    //             "authorization": that.props.state.userInfo.token,
                                    //             "Content-Type": "application/x-www-form-urlencoded"
                                    //         },
                                    //         body: JSON.stringify({
                                    //             Username: that.props.state.username,
                                    //         }).then((data) => {
                                    //             if (data.message == undefined) {
                                    //                 that.setState({ isTesting: true })
                                    //             }
                                    //             else {
                                    //                 message.error("登陆已过期");
                                    //                 this.props.logout();
                                    //             }
                                    //         })
                                    //     })
                                }}>
                                开始答题
                      </Button>
                        ]}>
                        <b style={{ fontSize: "18px", color: "#1890ff" }}>&nbsp;{this.props.state.userInfo.name}同学,你好!</b><br></br>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到校史校情竞赛答题!</p><p></p>

                        <ul style={{ fontSize: "15px" }}>
                            <li>本答题共有<b>30道题</b>,&nbsp;其中有<b>20道选择题,&nbsp;10道判断题</b></li>
                            <li>选择题每道4分,&nbsp;判断题每道2分,&nbsp;满分共<b>100分</b></li>
                            <li>答题时限为<b>30分钟</b>,&nbsp;时间用完自动交卷</li>
                            <li>在未成功交卷前,&nbsp;出现特殊情况,可重新进入答题</li>
                            <li>对本答题有疑问,&nbsp;可联系在场负责老师</li>
                        </ul>
                    </Modal>
                </div>
            )
        }
        return (
            <React.Fragment>
                <Layout style={{ overflow: "hidder" }}>
                    <Header>
                        <Row>
                            <Col span={16} offset={0}>
                                <h1 style={{ color: 'white', fontSize: "25px" }}><img src={mark} height="45px" width="45px" />&nbsp;东南大学校史校情知识竞赛</h1>
                            </Col>
                            <Col span={4} offset={3}>
                                <Timer state={this.state} setState={this.setState.bind(this)} finish={this.submit} min={29} sec={59} info={"  答题倒计时："} />
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ backgroundColor: 'rgb(17,17,19)' }}>
                        <Row >
                            <Col span={22} offset={1}>
                                <Tabs className="background-1"
                                    activeKey={`${this.state.focusOn}`}
                                    animated='true'
                                    onTabClick={(x) => { this.setState({ focusOn: x }) }}
                                    tabBarGutter='0'
                                    tabPosition="bottom"
                                    style={{ marginBottom: "0", marginLeft: "0px", textAlign: "center" }}>
                                    {this.state.question.map((x, i) => (
                                        <TabPane tab={!x.isFinish ?
                                            <Badge dot={true} > <div style={{ color: 'white' }}>{i + 1}</div></Badge> :
                                            <div style={{ color: 'white' }}>{i + 1}</div>}
                                            key={i}
                                            onChange={() => { this.done(i) }}
                                            style={{ textAlign: "left" }}
                                        >

                                            {/* <Col span={22} offset={1}> */}
                                            {x.kind == "选择题" ?
                                                <Choice className="choice" Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev}
                                                    submit={this.submint} />
                                                : <TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev} submit={this.submit} />
                                            }
                                            {/* </Col> */}
                                        </TabPane>)
                                    )
                                    }
                                </Tabs>
                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>图源：东南大学官微 &nbsp;版权所有©</Footer>
                </Layout>
            </React.Fragment>
        )
    }
}
export default Test
