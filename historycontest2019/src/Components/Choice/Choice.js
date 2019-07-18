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
        this.props.setFinish(this.props.Id);
        this.props.Next(this.props.Next);
    }
    render() {
        let style = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
            color: 'white',
            fontSize: '20px'
        }
        return (
            <React.Fragment>
                <Row style={{
                    backgroundImage: `url(${imgs[(this.props.Id % 11)]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "100%", height: "100%",
                }}>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div style={{
                            backgroundColor: bg[this.props.Id % 11],
                            marginTop: 60,
                            marginBottom: 60
                        }}>
                            <div style={{ marginLeft: 80, overflow: "hidden", height: 160 }}>
                                <h2 style={{color: 'white', fontSize: 25,marginTop:60, marginBottom: 60, marginRight: 80}}>
                                {this.props.Id + 1}&nbsp;{this.props.state.title}
                            </h2>
                            </div>
                            <Radio.Group style={{ color: 'white', marginLeft: 160, marginBottom: 40, minHeight: 250 }} onChange={this.onchange} value={this.state.value} buttonStyle={"outline"}>
                                <Radio style={style} value={1}>
                                    <b>A</b> &nbsp; {this.props.state.choice[0]}
                                </Radio>
                                <Radio style={style} value={2}>
                                    <b>B</b> &nbsp; {this.props.state.choice[1]}
                                </Radio>
                                <Radio style={style} value={3}>
                                    <b>C</b> &nbsp; {this.props.state.choice[2]}
                                </Radio>
                                <Radio style={style} value={4}>
                                    <b>D</b> &nbsp; {this.props.state.choice[3]}
                                </Radio>
                            </Radio.Group>
                            <Row>
                                <Col span={16}></Col>
                                <Col span={3}>
                                    {this.props.Id > 0 && <Button onClick={this.props.Prev}>上一题</Button>}
                                </Col>
                                <Col span={4} style={{marginBottom:40}}>
                                    {this.props.Id < 29 && <Button onClick={this.props.Next}>下一题</Button>}
                                    {this.props.Id == 29 && <Button type='primary' onClick={this.submit}>提交</Button>}
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default Choice;