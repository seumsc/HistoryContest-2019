import React from 'react';
import { Row, Col, Icon, Tabs, Button, Modal, Drawer } from 'antd';
import 'antd/dist/antd.css';
import './Test.css';
import bg1 from '../../img/答题1.png';
import bg2 from '../../img/答题2.png';
import bg3 from '../../img/答题3.png';
import Title from '../../img/标题.PNG';
import Timer from '../Timer/Timer';
import Choice from '../Choice/Choice';
import TrueFalse from '../TrueFalse/TrueFalse';

let imgs = [bg1, bg2, bg3];
const { TabPane } = Tabs;

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isTesting: false,
            isPaperGet: false,
            isAllDone: false,
            settingVisible: false,
            focusOn: 0,
            pic: 0,
            question: []
        }
        for (let i = 0; i < 20; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "选择题",
                title: "",
                choice: ['', '', '', ''],
                isRight: false
            });
        }
        for (let i = 20; i < 30; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "判断题",
                title: "",
                choice: ['√', '×'],
                isRight: false
            });
        }
        this.openControl = this.openControl.bind(this);
        this.closeControl = this.closeControl.bind(this);
        this.logout = this.logout.bind(this);
        this.done = this.done.bind(this);
        this.Next = this.Next.bind(this);
        this.Prev = this.Prev.bind(this);
        this.submit = this.submit.bind(this);
        //测试初始化
        this.state.question[0] = {
            isFinish: false,
            kind: "选择题",
            title: "燃煤联合循环发电技术由哪个研究所长期研究",
            choice: ['东大建筑与环境研究所', '东大热能工程研究所', '东大能源与环境工程研究所', '东大动力研究所'],
            isRight: false
        }
        this.state.question[1] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: ['1902', '1988', '1905', '1900'],
            isRight: false
        }
        this.state.question[20] = {
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
        //             that.state.question[i].id=data.test[i].id;
        //             that.state.question[i].title=data.test[i].text;
        //             let temp=[
        //                 {
        //                     text:data.test[i].a,
        //                     value:data.test[i].a_value
        //                 },
        //                 {
        //                     text:data.test[i].b,
        //                     value:data.test[i].b_value
        //                 },
        //                 {
        //                     text:data.test[i].c,
        //                     value:data.test[i].c_value
        //                 },
        //                 {
        //                     text:data.test[i].d,
        //                     value:data.test[i].d_value
        //                 }
        //             ]
        //             that.state.question[i].choice=this.Random(temp);
        //         }
        //         for(let i=20;i<30;i++){
        //             that.state.question[i].id=data.test[i].id;
        //             that.state.question[i].title=data.test[i].text;
        //         }
        //     }
        // )
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }
    openControl() {
        this.setState({ settingVisible: true });
    }
    closeControl() {
        this.setState({ settingVisible: false });
    }
    logout() {
        this.props.setState({
            isWelcome:true,
            isLogin:false,
            isStudent:false,
            isAdmin:false,
            isTeacher:false,
            userInfo:
            {
              name:'',
              token:'',
              access:-1,
              score:0
            },
            answer:{
            choice:{},
            true_false:{}
            },
          })
    }
    submit() {
        //提交函数
        this.setState({ isAllDone: true })
    }
    done(i) {
        let x = this.state.question;
        x[i].isFinish = true;
        this.setState({ question: x });
    }
    render() {
        if (!this.state.isTesting) {
            return (
                <div style={{
                    backgroundImage: `url(${imgs[0]})`,
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
                                this.setState({ isTesting: true })
                            }}>
                                开始答题
                      </Button>
                        ]}>
                        <b>{this.state.name}同学,你好!</b><br></br>
                        <p>1.本答题共有30道题,其中有20道选择题,10道判断题</p>
                        <p>2.答题时限为30分钟,时间用完自动交卷</p>
                        <p>3.未成功交卷之前,可进行多次答题(但每次生成题目不同)</p>
                    </Modal>
                </div>
            )
        }
        return (
            <React.Fragment>
                <Drawer
                    title="选项"
                    placement="left"
                    closable={false}
                    onClose={this.closeControl}
                    visible={this.state.settingVisible}
                >
                    <p></p>
                    <Button type="default" onClick={this.submit} block={true}>提前交卷</Button>
                    <p></p>
                    <Button type="danger" onClick={this.logout} block={true}>注销/logout</Button>
                </Drawer>
                <body style={{
                    backgroundImage: `url(${imgs[(this.state.focusOn % 3)]})`,
                    backgroundSize: 'cover', backgroundRepeat: 'no-repeat', transition: '2s',
                    top: "0px", bottom: "0px", position: "absolute", width: "100%", height: "100%"
                }}>
                    <header>
                        <Row>
                            <Col span={1} offset={1} style={{ marginTop: "35px" }}>
                                <Button type="primary" onClick={this.openControl}><Icon type="menu-unfold" /></Button>
                            </Col>
                            <Col span={16}>
                                <img src={Title}></img>
                            </Col>
                            <Col span={6}>
                                <br />
                                <br />
                                <Timer state={this.state} setState={this.setState.bind(this)} />
                            </Col>
                        </Row>
                    </header>
                    <Row className="Question">
                        <Col span={18} >
                            <Tabs activeKey={`${this.state.focusOn}`}
                                onTabClick={(x) => { this.setState({ focusOn: x }) }}
                                tabPosition="left"
                                style={{ height: 590 }} >
                                {this.state.question.map((x, i) => (
                                    <TabPane tab={
                                        !x.isFinish ? <div><Icon type="clock-circle" /> {x.kind}{i + 1}</div> :
                                            <div style={{ backgroundColor: "rgb(24, 144, 255)", color: "white", borderRadius: "8px" }}><Icon type="carry-out" />{x.kind}{i + 1}</div>}
                                        key={i}
                                        onChange={() => { this.done(i) }}
                                    >
                                        {x.kind == "选择题" ?
                                            <Choice className="choice" Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} />
                                            : <TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} />
                                        }
                                    </TabPane>))
                                }
                                <Row>
                                    <Col span={9} offset={16} style={{marginTop:"100px"}}>
                                        <Button.Group size="large">
                                            <Button type="primary" onClick={this.Prev}>
                                                <Icon type="left" />
                                                上一题
                                            </Button>
                                            {this.state.focusOn < 29 ?
                                            <Button type="primary" onClick={this.Next}>下一题<Icon type="right" /></Button>:
                                            <Button type='primary' onClick={this.submit}>提交答案<Icon type="right" /></Button>}
                                        </Button.Group>
                                      </Col>  
                                </Row>
                            </Tabs>
                        </Col>
                        <Col span={2} offset={20} style={{ marginTop: "0px" }}>
                            <iframe onClick={this.submit} src="https://zhanyuzhang.github.io/lovely-cat/cat.html"></iframe>
                        </Col>

                    </Row>

                </body>
            </React.Fragment>
        )
    }
}

export default Test