import React from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Layout, Icon, Radio, Button,message,Skeleton,Result,Progress} from 'antd';
import Timer from "../Timer/Timer"
import BG from '../../img/图片2.jpg'

const { Header, Footer, Sider, Content } = Layout;
const allChoiceQuestion = require("../../data/choice_question.json")
const allJudgeQuestion = require("../../data/judgment_question.json")
class Grades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            focusOn: 0,
            name: "",
            messageGet:false
        }

    
    }
    
    componentWillMount() {
        const that = this;
        let data={
            Username:that.props.state.username //this.props.state.userInfo.username,
        }
        console.log(that.props.state.username)
        if (this.props.state.isAllDone) {
            this.state.question=this.props.state.answer;
            this.state.name=this.props.state.name;
            fetch("http://" + that.props.state.host + "/api/student/result",
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "authorization": that.props.state.token,//that.props.state. .token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            ).then((res) => res.json()
            ).then((data) => {
                if (data.message == undefined) {
                    data.Answer.Choice_answers.forEach((x, i) => {
                            that.state.question[i].answer=x;
                    })
                    data.Answer.Judgment_answers.forEach((x,i) => {
                        that.state.question[i+20].answer=x;
                    });
                that.setState({messageGet:true});
                }
                else {
                    message.error("登陆已过期");
                    this.props.logout();
                }
            })
           
        }
        else {
            fetch("http://" + that.props.state.host + "/api/student/result",
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "authorization": that.props.state.token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Username: that.props.state.username,
                    })
                }
            ).then((res) => res.json()
            ).then(async data => {             
                if (data.message == undefined) {
                    let temp=[];              
                    for (let i = 0; i < 20; i++) {

                        temp.push({title:""});
                        temp[i].title = allChoiceQuestion[data.Paper.Choice_question[i]-1]["title"];
                        temp[i].option = await [
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
                        temp[i].value = data.User_answer[i];
                        temp[i].answer = data.Answer.Choice_answers[i];
                    }

                    for (let i = 20; i < 30; i++) {
                        temp.push({title:""});
                        temp[i].title =allJudgeQuestion[data.Paper.Judgment_question[i - 20]-1]["title"];
                        temp[i].value = data.User_answer[i];
                        temp[i].answer = data.Answer.Judgment_answers[i - 20];
                    }
                    that.setState({question:temp});
                    console.log(that.state.question)
                }
                else {
                    message.error("登陆已过期");
                    this.props.logout();
                }
                that.setState({messageGet:true});
            }).catch((err)=>{console.log(err)})
        }
    }
    onmouseover(i) {
        this.setState({ focusOn: i })
        console.log(Number(this.state.question[this.state.focusOn].value));
    }

    render() {
        console.log("render");
        let style = {
            display: 'block',
            height: '50px',
            lineHeight: '50px',
            color: 'white',
            fontSize: '20px',
        }
        
        if(this.state.messageGet){
        return (
            <React.Fragment>
                <Layout>
                    <Header style={{ height: 80 }}>
                        <Row>
                            <Col span={14}>
                                <h1 style={{ color: "white", fontSize: "30px", marginTop: 15, marginBottom: 30 }}>
                                    {this.state.name}&nbsp;同学，你本次校史校情知识竞赛得分为:&nbsp;&nbsp;
                                <b style={{ color: "red", fontSize: "40px" }}>{this.props.state.score}</b>
                                </h1>
                            </Col>
                            <Col span={4} offset={4}>
                                <div style={{ marginTop: "15px" }}>
                                    <Timer min={2} sec={59} finish={this.props.logout} info={"距离自动注销 : "} />
                                </div>
                            </Col>
                            <Col span={2}>
                                <div style={{ marginTop: "15px" }}>
                                    <Button ghost type="danger" onClick={this.props.logout}><Icon type="logout" />退出</Button>
                                </div>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ backgroundImage: `url(${BG})` }}>
                        <Row style={{ marginTop: 80, marginBottom: 60 }}>
                            <Col span={2}></Col>
                            <Col span={10}>
                                <Card loading={!this.state.messageGet} title="答题情况" headStyle={{ color: "white", fontSize: 25 }} hoverable="true" style={{ backgroundColor: "rgba(225,166,121,0.7)", color: "white" }}>
                                    {this.state.question.map((x, i) => (
                                        <Card.Grid className={"question" + i}
                                            key={i}
                                            onMouseOver={() => this.onmouseover(i)}
                                            style={{
                                                width: '20%',
                                                textAlign: 'center',
                                                fontSize: '20px',
                                            }}>
                                            {i + 1}&nbsp;{x.value == x.answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> 
                                            : <Icon type="close-circle" theme="twoTone" twoToneColor="#E83015" style={{ fontSize: "20px" }} />}
                                        </Card.Grid>))
                                    }
                                </Card>
                            </Col>
                            <Col span={10} style={{ backgroundColor: "rgba(225,166,121,0.7)", marginTop: 70 }}>
                                <Skeleton loading={!this.state.messageGet} active >
                                <div style={{ marginLeft: 80, overflow: "hidden", height: 160 }}>
                                    <h2 style={{ color: 'white', fontSize: 25, marginTop: 60, marginBottom: 60, marginRight: 80 }} >
                                        {this.state.focusOn + 1}&nbsp;{this.state.question[this.state.focusOn].title}<br />
                                    </h2>
                                </div>
                                <Radio.Group style={{ color: 'white', marginLeft: 160, marginBottom: 40, minHeight: 250 }} value={Number(this.state.question[this.state.focusOn].value)} buttonStyle={"outline"}>
                                    {this.state.focusOn < 20 ?
                                        <div>   
                                            <Radio style={style} value={Number(this.state.question[this.state.focusOn].option[0].value)}>
                                                <b>A</b> &nbsp; {this.state.question[this.state.focusOn].option[0].text}&nbsp;
                                                {this.state.question[this.state.focusOn].option[0].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={Number(this.state.question[this.state.focusOn].option[1].value)}>
                                                <b>B</b> &nbsp; {this.state.question[this.state.focusOn].option[1].text}&nbsp;
                                                {this.state.question[this.state.focusOn].option[1].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={Number(this.state.question[this.state.focusOn].option[2].value)}>
                                                <b>C</b> &nbsp; {this.state.question[this.state.focusOn].option[2].text}&nbsp;
                                                {this.state.question[this.state.focusOn].option[2].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={Number(this.state.question[this.state.focusOn].option[3].value)}>
                                                <b>D</b> &nbsp; {this.state.question[this.state.focusOn].option[3].text}&nbsp;
                                                {this.state.question[this.state.focusOn].option[3].value == this.state.question[this.state.focusOn].answer ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                        </div> :
                                        <div>
                                            <Radio style={style} value={1}>
                                                <b>对</b>&nbsp;{this.state.question[this.state.focusOn].answer == 1 ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                            <Radio style={style} value={0}>
                                                <b >错</b>&nbsp;{this.state.question[this.state.focusOn].answer == 0 ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: "20px" }} /> : <div />}
                                            </Radio>
                                        </div>}
                                </Radio.Group>
                                </Skeleton>
                            </Col>
                            <Col span={2}>

                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>图源：东南大学官微 || 王文虞<br />版权所有©</Footer>
                </Layout>
            </React.Fragment>)
        }
        else{
            return <Result status="success" title={<Icon type="loading"/>}><h1 style={{textAlign:"center"}}>提交成功,结果正在加载中</h1></Result>
        }
    }
}

export default Grades;