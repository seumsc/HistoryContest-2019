import React from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Layout, Icon, Radio } from 'antd';

import BG from '../../img/图片2.jpg'

const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const test = require("./question-test.json")
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
        test.question.forEach((x, i) => {
            this.state.question[i] = x;
        });
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
                    <Header style={{ height: 100 }}>
                        <h1 style={{ color: "white", textAlign: "center", fontSize: "40px", marginTop: 15, marginBottom: 30 }}>
                            {this.props.state.userInfo.name}&nbsp;同学，你本次校史校情知识竞赛得分为&nbsp;
                        <b style={{ color: "red", fontSize: "50px" }}>{this.props.state.userInfo.score}</b>
                        </h1>
                    </Header>
                    <Content style={{ backgroundImage: `url(${BG})` }}>
                        <Row style={{ marginTop: 80, marginBottom: 80 }}>
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
                                            {i + 1}&nbsp;{x.isRight ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#E83015" style={{ fontSize: "20px" }} />}
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