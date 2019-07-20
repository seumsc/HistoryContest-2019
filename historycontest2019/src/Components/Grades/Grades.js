import React from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Layout, Icon, Radio } from 'antd';

import BG from '../../img/图片2.jpg'

const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;

class Grades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            focusOn: 0
        }
        for (let i = 0; i < 20; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "选择题",
                title: "",
                choice: [{}, {}, {}, {}],
                isRight: false,
            });
        }
        for (let i = 20; i < 30; i++) {
            this.state.question.push({
                isFinish: false,
                kind: "判断题",
                title: "",
                choice: [0, 1],
                isRight: false,
            });
        }
        // this.onmouseover=this.onmouseover.bind(this);
        this.state.question[0] = {
            isFinish: false,
            kind: "选择题",
            title: "燃煤联合循环发电技术由哪个研究所长期研究计划",
            choice: [{ text: '东大建筑与环境研究所', value: 2 }, { text: '东大热能工程研究所', value: 3 }, { text: '东大能源与环境工程研究所', value: 1 }, { text: '东大动力研究所', value: 4 }],
            isRight: false,
            value: 1,
            answer: 2,
        }
        this.state.question[1] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 3,
            answer: 2,
        }
        this.state.question[2] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 2,
            answer: 2,
        }
        this.state.question[3] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 3,
            answer: 1,
        }
        this.state.question[4] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 1,
            answer: 1,
        }
        this.state.question[5] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 4,
            answer: 4,
        }
        this.state.question[6] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 3,
            answer: 2,
        }
        this.state.question[7] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 3,
            answer: 3,
        }
        this.state.question[8] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 2,
            answer: 3,
        }
        this.state.question[9] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 3,
            answer: 3,
        }
        this.state.question[10] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 4,
            answer: 2,
        }
        this.state.question[11] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 2,
            answer: 2,
        }
        this.state.question[12] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 1,
            answer: 1,
        }
        this.state.question[13] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 1,
            answer: 2,
        }
        this.state.question[14] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 4,
            answer: 4,
        }
        this.state.question[15] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 2,
            answer: 3,
        }
        this.state.question[16] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 2,
            answer: 2,
        }
        this.state.question[17] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 3,
            answer: 3,
        }
        this.state.question[18] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: false,
            value: 4,
            answer: 2,
        }
        this.state.question[19] = {
            isFinish: false,
            kind: "选择题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [{ text: '1902', value: 2 }, { text: '1988', value: 3 }, { text: '1905', value: 1 }, { text: '1900', value: 4 }],
            isRight: true,
            value: 2,
            answer: 2,
        }
        this.state.question[20] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: false,
            value: 1,
            answer: 0,
        }
        this.state.question[21] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: true,
            value: 1,
            answer: 1,
        }
        this.state.question[22] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: true,
            value: 0,
            answer: 0,
        }
        this.state.question[23] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: false,
            value: 0,
            answer: 1,
        }
        this.state.question[24] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: true,
            value: 1,
            answer: 1,
        }
        this.state.question[25] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: true,
            value: 1,
            answer: 1,
        }
        this.state.question[26] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: false,
            value: 1,
            answer: 0,
        }
        this.state.question[27] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: true,
            value: 0,
            answer: 0,
        }
        this.state.question[28] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: false,
            value: 1,
            answer: 0,
        }
        this.state.question[29] = {
            isFinish: false,
            kind: "判断题",
            title: "东南大学的历史最早可追溯至哪一年?",
            choice: [0, 1],
            isRight: true,
            value: 1,
            answer: 1,
        }
    }
    onmouseover(i) {
        this.setState({ focusOn: i })
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
                    <Header style={{height:100}}>
                        <h1 style={{ color: "white", textAlign: "center", fontSize: "40px", marginTop:15, marginBottom:30 }}>{this.props.state.userInfo.name}&nbsp;同学，你本次校史校情知识竞赛得分为&nbsp;<b style={{ color: "red", fontSize: "50px" }}>{this.props.state.userInfo.score}</b></h1>
                    </Header>
                    <Content style={{ backgroundImage: `url(${BG})` }}>
                        <Row style={{ marginTop: 80, marginBottom: 80 }}>
                            <Col span={2}>

                            </Col>
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
                                                {i + 1}&nbsp;{x.isRight ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#E83015" style={{ fontSize: "20px" }} />}
                                            </Card.Grid>))
                                        }
                                    </Card>
                                </Col>
                                <Col span={10}  style={{ backgroundColor: "rgba(225,166,121,0.7)", marginTop:70 }}>
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