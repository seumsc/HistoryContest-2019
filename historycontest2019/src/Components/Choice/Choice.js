import React from 'react';
import { Row, Radio, Button, Col } from 'antd';
import 'antd/dist/antd.css';
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

const RadioGroup = Radio.Group;
let imgs = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11];
let bg = ['rgba(202,122,44,0.7)', 'rgba(159,53,58,0.7)', 'rgba(98,89,44,0.7)', 'rgba(102, 153, 161,0.7)', 'rgba(135,102,51,0.7)', 'rgba(135,102,51,0.7)', 'rgba(46,169,223, 0.7)', 'rgba(115,67,56,0.7)', 'rgba(98,89,44,0.7)', 'rgba(215,185,142,0.7)', 'rgba(46,169,223,0.7)']

class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
        this.onchange = this.onchange.bind(this);
    }
    onchange(e) {
        this.setState({ value: e.target.value });
        this.props.setFinish(this.props.Id, e.target.value);
        this.props.Next(this.props.Next);
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
                <Row style={{
                    backgroundImage: `url(${imgs[(this.props.Id % 11)]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "100%", height: "100%"
                }}>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div style={{
                            backgroundColor: bg[this.props.Id % 11],
                            marginTop: 60,
                            marginBottom: 60,
                            backgroundSize:"cover",
                            width:"100%",
                            height:"100%"
                        }}>
                            <div style={{ height: 490 }}>
                                <Row>
                                    <Col span={2} ><p style={{ color: "white", fontSize: "60px", marginTop: "200px", marginLeft: "20px" }}>{this.props.Id + 1}</p></Col>
                                    <Col span={20}>
                                        <h2 style={{ color: 'white', fontSize: 25, marginTop: 80, marginBottom: 60, marginLeft: 30 }}>
                                            &nbsp;{this.props.state.title}
                                        </h2>
                                        <Radio.Group style={{ color: 'white', marginLeft: 110, marginBottom: 40, minHeight: 250 }} onChange={this.onchange} value={this.props.state.value} buttonStyle={"outline"}>
                                            <Radio style={style} value={this.props.state.choice[0].value}>
                                                <b>A</b> &nbsp; {this.props.state.choice[0].text}
                                            </Radio>
                                            <Radio style={style} value={this.props.state.choice[1].value}>
                                                <b >B</b> &nbsp; {this.props.state.choice[1].text}
                                            </Radio>
                                            <Radio style={style} value={this.props.state.choice[2].value}>
                                                <b>C</b> &nbsp; {this.props.state.choice[2].text}
                                            </Radio>
                                            <Radio style={style} value={this.props.state.choice[3].value}>
                                                <b>D</b> &nbsp; {this.props.state.choice[3].text}
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={2}>
                                        <div style={{marginTop:"230px"}}>
                                            {this.props.Id < 29 ?
                                                <Button onClick={this.props.Next} size="large" ghost type="default" shape="circle-outline" icon="right"></Button> :
                                                <Button type='primary' onClick={this.submit}>提交</Button>}
                                        </div>
                                    </Col>
                                    {/* <Row>
                                            <Col span={16}></Col>
                                            <Col span={3}>
                                                {this.props.Id > 0 && <Button onClick={this.props.Prev}>上一题</Button>}
                                            </Col>
                                            <Col span={4} style={{ marginBottom: 40 }}>
                                                {this.props.Id < 29 && <Button onClick={this.props.Next}>下一题</Button>}
                                                {this.props.Id == 29 && <Button type='primary' onClick={this.submit}>提交</Button>}
                                            </Col>

                                        </Row> */}

                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Choice;