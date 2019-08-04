import React from 'react';
import { Row, Radio, Button, Col } from 'antd';
import 'antd/dist/antd.css';
import QueueAnim from 'rc-queue-anim';
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
        this.props.Next(0);
    }
    render() {
        let style = {
            display: 'block',
            height: '70px',
            lineHeight: '70px',
            color: 'white',
            fontSize: '25px',
        }
        return (
            <React.Fragment>
                <Row style={{
                    backgroundImage: `url(${imgs[(this.props.Id % 11)]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: "100%", height: "100%",
                    overflow:"hidden"
                }}>
                    <Col span={4}></Col>
                    <Col span={14} offset={1}>
                        <div style={{
                            backgroundColor: bg[this.props.Id % 11],
                            marginTop: 60,
                            marginBottom: 60,
                            backgroundSize:"cover",
                            width:"100%",
                            height:"100%",
                        }}>
                            <div style={{ height: 620 ,overflow:"hidden"}}>
                                <Row>
                                    <Col span={2} >
                                        <div style={{backgroundColor:"rgb(255,255,255,0.3)",color:"white",fontSize:"80px",width:"90px"}} ><p style={{textAlign:"center"}}>{this.props.Id+1}</p></div>
                                        <div style={{  paddingTop: "90px", marginLeft: "20px" }}>
                                        <Button onClick={this.props.Prev} size="large" ghost type="default" shape="circle-outline" icon="left"></Button> 
                                        </div></Col>
                                    <Col span={20}>
                                        <QueueAnim delay={200}
                                           animConfig={[
                                            { opacity: [1, 0], translateX: [0,80] }
                                          ]}>
                                        <div style={{ marginTop: 95, marginBottom: 60, marginLeft: 50,height:100 }}>
                                        <p key="title" style={{ color: 'white', fontSize: 35 }}>
                                            &nbsp;{this.props.state.title}
                                        </p>
                                        </div>
                                        <Radio.Group key="choice" style={{ color: 'white', marginLeft: 130, marginBottom: 40, minHeight: 250 }} onChange={this.onchange} value={this.props.state.value} buttonStyle={"outline"}>
                                            <Radio style={style} value={this.props.state.option[0].value}>
                                                <b style={{fontSize:30}}>A</b> &nbsp; {this.props.state.option[0].text}
                                            </Radio>
                                            <Radio style={style} value={this.props.state.option[1].value}>
                                                <b style={{fontSize:30}}>B</b> &nbsp; {this.props.state.option[1].text}
                                            </Radio>
                                            <Radio style={style} value={this.props.state.option[2].value}>
                                                <b style={{fontSize:30}}>C</b> &nbsp; {this.props.state.option[2].text}
                                            </Radio>
                                            <Radio style={style} value={this.props.state.option[3].value}>
                                                <b style={{fontSize:30}}>D</b> &nbsp; {this.props.state.option[3].text}
                                            </Radio>
                                        </Radio.Group>
                                        </QueueAnim>
                                    </Col>
                                    <Col span={2}>
                                        <div style={{marginTop:"290px"}}>
                                            {this.props.Id < 29 ?
                                                <Button onClick={()=>{this.props.Next(1
                                                    )}} 
                                                    size="large" ghost type="default" shape="circle-outline" icon="right"></Button> :
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