import React from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Layout, Icon, Radio, Button } from 'antd';
import Timer from "../Timer/Timer"
import BG from '../../img/图片2.jpg'

const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const test = require("./question-test.json")
class Grades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.state.answer,
            focusOn: 0,
            name:this.props.state.userInfo.name
        }
        

        this.logout = this.logout.bind(this);
        // test.question.forEach((x, i) => {
        //     this.state.question[i] = x;
        // });
    }
    componentWillMount() {
        let that=this;
        this.state.question.forEach((x,i)=>{
            x.answer=test.question[i].answer;
        })

        // if (that.props.state.isAllDone) {
        //     fetch("http://" + that.props.state.host + "/api/student/result_handin",
        //         {
        //             method: 'POST',
        //             mode: 'cors',
        //             headers: {
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //             body: JSON.stringify({
        //                 Username: that.props.state.username,
        //             })
        //         }
        //     ).then((res)=> res.json()
        //     ).then((data)=>{
        //         data.Answer.forEach((x,i)=>{
        //             that.state.question[i].answer=x;
        //         })
        //     })
        // }
        // else{
        //     fetch("http://" + that.props.state.host + "/api/student/result",
        //         {
        //             method: 'POST',
        //             mode: 'cors',
        //             headers: {
        //                 "Content-Type": "application/x-www-form-urlencoded"
        //             },
        //             body: JSON.stringify({
        //                 Username: that.props.state.username,
        //             })
        //         }
        //     ).then((res)=> res.json()
        //     ).then(data=>{
        //         for(let i=0;i<20;i++){
        //             that.state.question.push({});
        //             that.state.question[i].title=data.Paper.Choice_question[i].text;
        //             that.state.question.choice=[
        //                 {
        //                     text:data.Paper.Choice_question[i].option[0],
        //                     value:1
        //                 },
        //                 {
        //                     text:data.Paper.Choice_question[i].option[1],
        //                     value:2
        //                 },
        //                 {
        //                     text:data.Paper.Choice_question[i].option[2],
        //                     value:3
        //                 },
        //                 {
        //                     text:data.Paper.Choice_question[i].option[3],
        //                     value:4
        //                 }
        //             ]
        //             that.state.name=data.Name;
        //             that.state.question[i].value=data.Paper.Choice_question[i].value;
        //             that.state.question[i].answer=data.Answer.Choice_answer[i];
        //         }
        //         for(let i=20;i<30;i++){
        //             that.state.question.push({});
        //             that.state.question[i].title=data.Paper.Judgment_question[i-20].text;
        //             that.state.question[i].value=data.Paper.Judgment_question[i-20].value;
        //             that.state.question[i].answer=data.Answer.Judgment_answer[i-20];
        //         }
        //     })
        // }
     }
    onmouseover(i) {
        this.setState({ focusOn: i })
    }
    logout() {
        this.props.setState({
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
        let style = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
            color: 'white',
            fontSize: '20px',
        }
        return (
            <React.Fragment>
                <Layout>
                    <Header style={{ height: 80 }}>
                        <Row>
                            <Col span={14}>
                                <h1 style={{ color: "white", fontSize: "30px", marginTop: 15, marginBottom: 30 }}>
                                    {this.state.name}&nbsp;同学，你本次校史校情知识竞赛得分为:&nbsp;&nbsp;
                        <b style={{ color: "red", fontSize: "40px" }}>{this.props.state.userInfo.score}</b>
                                </h1>
                            </Col>
                            <Col span={4} offset={4}>
                                <div style={{ marginTop: "15px" }}>
                                    <Timer min={2} sec={59} finish={this.logout} info={"距离自动注销 : "} />
                                </div>
                            </Col>
                            <Col span={2}>
                                <div style={{ marginTop: "15px" }}>
                                    <Button ghost type="danger" onClick={this.logout}><Icon type="logout" />退出</Button>
                                </div>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ backgroundImage: `url(${BG})` }}>
                        <Row style={{ marginTop: 80, marginBottom: 60 }}>
                            <Col span={2}></Col>
                            <Col span={10}>
                                <Card title="答题情况" headStyle={{ color: "white", fontSize: 25 }} hoverable="true" style={{ backgroundColor: "rgba(225,166,121,0.7)", color: "white" }}>
                                    {this.state.question.map((x, i) => (
                                        <Card.Grid className={"question" + i}
                                            onMouseOver={() => this.onmouseover(i)}
                                            style={{
                                                width: '20%',
                                                textAlign: 'center',
                                                fontSize: '20px',
                                            }}>
                                            {i + 1}&nbsp;{x.value == x.answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#E83015" style={{ fontSize: "20px" }} />}
                                        </Card.Grid>))
                                    }
                                </Card>
                            </Col>
                            <Col span={10} style={{ backgroundColor: "rgba(225,166,121,0.7)", marginTop: 70 }}>
                                <div style={{ marginLeft: 80, overflow: "hidden", height: 160 }}>
                                    <h2 style={{ color: 'white', fontSize: 25, marginTop: 60, marginBottom: 60, marginRight: 80 }}>
                                        {this.state.focusOn + 1}&nbsp;{this.state.question[this.state.focusOn].title}<br />
                                    </h2>
                                </div>
                                <Radio.Group style={{ color: 'white', marginLeft: 160, marginBottom: 40, minHeight: 250 }} value={this.state.question[this.state.focusOn].value} buttonStyle={"outline"}>
                                    {this.state.focusOn < 20 ?
                                        <div>
                                            <Radio style={style} value={this.state.question[this.state.focusOn].choice[0].value}>
                                                <b>A</b> &nbsp; {this.state.question[this.state.focusOn].choice[0].text}&nbsp;{this.state.question[this.state.focusOn].choice[0].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={this.state.question[this.state.focusOn].choice[1].value}>
                                                <b>B</b> &nbsp; {this.state.question[this.state.focusOn].choice[1].text}&nbsp;{this.state.question[this.state.focusOn].choice[1].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={this.state.question[this.state.focusOn].choice[2].value}>
                                                <b>C</b> &nbsp; {this.state.question[this.state.focusOn].choice[2].text}&nbsp;{this.state.question[this.state.focusOn].choice[2].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={this.state.question[this.state.focusOn].choice[3].value}>
                                                <b>D</b> &nbsp; {this.state.question[this.state.focusOn].choice[3].text}&nbsp;{this.state.question[this.state.focusOn].choice[3].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                        </div> :
                                        <div>
                                            <Radio style={style} value={0}>
                                                <b>对</b>&nbsp;{this.state.question[this.state.focusOn].answer == 0 ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={1}>
                                                <b >错</b>&nbsp;{this.state.question[this.state.focusOn].answer == 1 ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                        </div>}
                                </Radio.Group>
                            </Col>
                            <Col span={2}>

                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>图源：东南大学官微 || 王文虞<br />版权所有©</Footer>
                </Layout>
            </React.Fragment>)
    }
}

export default Grades;