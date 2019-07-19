import React from 'react';
import { Row, Col, Icon, Tabs, Button, Modal, Layout ,List} from 'antd';
import 'antd/dist/antd.css';
import './Test.css';
import bg1 from '../../img/background1.png';
import bg2 from '../../img/background2.png';
import bg3 from '../../img/background3.png';
import bg4 from '../../img/background4.jpg';
import bg5 from '../../img/background5.jpg';
import bg6 from '../../img/background6.jpg';
import bg7 from '../../img/background7.jpg';
import bg8 from '../../img/background8.jpg';
import bg9 from '../../img/background9.jpg';
import bg10 from '../../img/background10.jpg';
import bg11 from '../../img/background11.jpg';
import BG from '../../img/图片2.jpg'

import Timer from '../Timer/Timer';
import Choice from '../Choice/Choice';
import TrueFalse from '../TrueFalse/TrueFalse';
import { nullLiteral } from '@babel/types';

let imgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];
const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTesting: false,
            isPaperGet: false,
            isAllDone: false,
            focusOn: 0,
            pic: 0,
            question:[],
        }
        for (let i = 0; i < 20; i++) {
          this.state.question.push({
              isFinish: false,
              kind: "选择题",
              title: "",
              choice: [{}, {}, {}, {}],
              isRight: false,
              value: -1
          });
      }
      for (let i = 20; i < 30; i++) {
          this.state.question.push({
              isFinish: false,
              kind: "判断题",
              title: "",
              choice: ['√', '×'],
              isRight: false,
              value: -1
          });
      }
        this.logout = this.logout.bind(this);
        this.done = this.done.bind(this);
        this.Next = this.Next.bind(this);
        this.Prev = this.Prev.bind(this);
        this.submit = this.submit.bind(this);
        //测试初始化
        this.state.question[0] = {
          isFinish: false,
          kind: "选择题",
          title: "燃煤联合循环发电技术由哪个研究所长期研究计划",
          choice: [{text:'东大建筑与环境研究所', value:2}, {text:'东大热能工程研究所',value:3}, {text:'东大能源与环境工程研究所',value:1}, {text:'东大动力研究所',value:4}],
          isRight: false
      }
        this.state.question[1] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[2] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[3] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[4] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[5] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[6] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[7] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[8] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[9] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[10] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[11] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{text:'1902', value:2}, {text:'1988', value:3}, {text:'1905', value:1}, {text:'1900', value:4}],
            isRight: false
        }
        this.state.question[20] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: ['√', '×'],
            isRight: false
        }
        this.state.question[21] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: ['√', '×'],
            isRight: false
        }
        this.state.question[22] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: ['√', '×'],
            isRight: false
        }
    }
    Next() {
        let x = this.state.focusOn;
        x++;
        if (x < 30) {
            this.setState({ focusOn: x })
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
        // let that=this;
        // fetch('http://'+that.props.state.host+'/api/student/test',{
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded"
        //     },
        //     body: JSON.stringify({
        //         Username: that.props.state.username,
        //     })
        // }
        // ).then(
        //     res=>{return res.json()}
        // ).then(
        //     data=>{
        //         for(let i=0;i<20;i++){
        //             that.state.question[i].title=data.test[i].text;
        //             let temp=[
        //                 {
        //                     text:data.test[i].a,
        //                     value:1
        //                 },
        //                 {
        //                     text:data.test[i].b,
        //                     value:2
        //                 },
        //                 {
        //                     text:data.test[i].c,
        //                     value:3
        //                 },
        //                 {
        //                     text:data.test[i].d,
        //                     value:4
        //                 }
        //             ]
        //             that.state.question[i].choice=this.Random(temp);
        //         }
        //         for(let i=20;i<30;i++){
        //             that.state.question[i].title=data.test[i].text;
        //         }
        //     }
        // )
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }
    logout() {
        this.props.setState({
            isWelcome: true,
            isLogin: false,
            isStudent: false,
            isAdmin: false,
            isTeacher: false,
            userInfo:
            {
                name: '',
                token: '',
                access: -1,
                score: 0
            },
            answer: {
                choice: {},
                true_false: {}
            },
        })
    }
    submit() {
    //     //提交函数
    //     let that = this;
    //     let data={answer:[]};
    //     this.state.question.forEach((x,i)=>{
    //         data.answer.push(x.value)
    //     })
    //     fetch("htttp://" + that.props.state.host + "/api/student/hangin",
    //         {
    //             method: 'POST',
    //             mode: 'cors',
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             body: JSON.stringify(data)
    //         }.then((res)=>{that.setState({isAllDone:true});return res.json()}
    //     ).then(()=>{console.log("handin successfully")}//data=>{that.props.setState({userInfo:{score:data.score}})}
    //     )
    //     )
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
                            <Button type="primary" onClick={() => {
                                let that = this;
                                that.setState({ isTesting: true })
                                // fetch("http://" + this.props.state.host + '/api/student/start',
                                //     {
                                //         method: 'POST',
                                //         mode: 'cors',
                                //         headers: {
                                //             "Content-Type": "application/x-www-form-urlencoded"
                                //         },
                                //         body: JSON.stringify({
                                //             Username: that.props.state.username,
                                //         }).then(() => { that.setState({ isTesting: true }) })
                                //     })
                            }}>
                                开始答题
                      </Button>
                        ]}>
                        <b style={{fontSize:"18px",color:"#1890ff"}}>&nbsp;{this.props.state.userInfo.name}同学,你好!</b><br></br>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到校史校情竞赛答题!</p><p></p>

                        <ul style={{fontSize:"15px"}}>
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
                            <Col span={2}></Col>
                            <Col span={16}>
                                <h1 style={{ color: 'white' }}>东南大学校史校情知识竞赛</h1>
                            </Col>
                            <Col span={6}>
                                <Timer state={this.state} setState={this.setState.bind(this)} submit={this.submit}/>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ backgroundColor: '#1C1C1C' }}>
                        <Row>
                            <Tabs activeKey={`${this.state.focusOn}`}
                            animated='true'
                            onTabClick={(x) => { this.setState({ focusOn: x }) }}
                            tabBarGutter='0'
                            tabPosition="bottom"
                            style={{ textAlign: "center" }}>
                            {this.state.question.map((x, i) => (
                                <TabPane tab={!x.isFinish ? <div style={{color: 'white'}}>{i + 1}</div> : <div style={{ backgroundColor: '#0089A7', backgroundSize:'cover',color: 'white', borderRadius:10}}>{i + 1}</div>}
                                    key={i}
                                    onChange={() => { this.done(i) }}
                                    style={{ textAlign: "left" }}
                                >
                                    <Col span={2}>

                                    </Col>
                                    <Col span={20}>
                                    {x.kind == "选择题" ?
                                        <Choice className="choice" Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev} 
                                        submit={this.submint}/>
                                        : <TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev} submit={this.submit} />
                                    }
                                    </Col>
                                    <Col span={2}>

                                    </Col>
                                </TabPane>))
                            }
                        </Tabs>
                            
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>图源：东南大学官微<br />版权所有©</Footer>
                </Layout>
            </React.Fragment>
        )
    }
}

export default Test
