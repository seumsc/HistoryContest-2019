import React from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Layout, Icon, Radio, Button,message,Skeleton,Result,notification} from 'antd';
import Timer from "../Timer/Timer"
import BG from '../../img/图片2.jpg'
const { Header, Footer, Content } = Layout;
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
        console.log(that.props.state.username)
        if (this.props.state.isAllDone) {
            this.state.question=this.props.state.answer;
            this.state.name=this.props.state.name;
            fetch("http://" + that.props.state.host + "/api/student/result",
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "authorization": that.props.state.token
                    }
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
                    notification.open({
                        placement:"bottomRight",
                        message: "恭喜!答题已完成",
                        description: "请记得在离开前,点击右上角退出按钮手动注销哦",
                        icon: <Icon type="check" style={{ color: "rgb(248, 39, 39)" }} />
                    })
                that.setState({messageGet:true});
                }
                else {
                    message.error("登陆已过期",1.5);
                    this.props.logout();
                }
            })
           
        }
        else {
            fetch("http://" + that.props.state.host + "/api/student/result",
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "authorization": that.props.state.token
                    },
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
                    notification.open({
                        placement:"bottomRight",
                        message: "答题已完成",
                        description: "可查看你的答题情况",
                        icon: <Icon type="check" style={{ color:"#1890ff"  }} />
                    })
                    that.setState({question:temp});
                    that.setState({messageGet:true});
                }
                else {
                    message.error("登陆已过期",1.5);
                    this.props.logout();
                }         
                
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
                            {this.props.state.scare==1080/1920?
                            <Col span={this.props.state.name.length>3?7:5} offset={0} style={{ color: "white", fontSize: "calc(10px + 2vmin)"}}>
                            {this.props.state.name}同学，你的得分为：
                            </Col>:
                            <Col span={this.props.state.name.length>3?7:5} offset={0} style={{ color: "white", fontSize: "calc(5px + 2vmin)"}}>
                            {this.props.state.name}同学，你的得分为
                            </Col>
                            }
                            <Col span={2}>
                                <b style={{ color: "red", fontSize: "60px" }}>{this.props.state.score}</b>
                            </Col>
                            <Col span={4} offset={this.props.state.name.length>3?9:11}>
                            {this.props.state.scare==1080/1920?
                                <Timer min={2} sec={59} finish={this.props.logout} info={"距离自动注销 : "} />:
                                <Timer min={2} sec={59} finish={this.props.logout} info={"离注销 : "} />
                            }
                            </Col>
                            <Col span={2}>
                                <Button ghost  onClick={this.props.logout} style={{height:"50px",width:"100px",fontSize:"calc(3px + 2vmin)"}}><Icon type="logout" size="large"/>退出</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ backgroundImage: `url(${BG})` ,height:"830px"}}>
                        <Row style={{ marginTop: 120, marginBottom: 60 }}>
                            <Col span={4}></Col>
                            <Col span={8}>
                                <Card loading={!this.state.messageGet} title="答题详情" headStyle={{ color: "white", fontSize: 25,textAlign:"center" }} hoverable="true" style={{ backgroundColor: "rgba(225,166,121,0.7)", color: "white" }}>
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
                            <Col span={8} style={{ backgroundColor: "rgba(225,166,121,0.7)", marginTop: 71,height:470 }}>
                                <div style={{ marginLeft: 80, overflow: "hidden", height: 200 }}>
                                    <h2 style={{ color: 'white', fontSize: 25, marginTop: 50, marginBottom: 60, marginRight: 80,overflowX:"hidden",overflowY:"auto"}} >
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
                            </Col>
                            <Col span={2}>

                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>图源：东南大学官微 || 王文虞<br />版权所有© 靠脸吃饭工作室</Footer>
                </Layout>
            </React.Fragment>)
        }
        else{
            return <Result status="success" title={<Icon type="loading"/>}><h1 style={{textAlign:"center"}}>提交成功,结果正在加载中</h1></Result>
        }
    }
}

export default Grades;