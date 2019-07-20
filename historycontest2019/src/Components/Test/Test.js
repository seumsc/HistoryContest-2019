import React from 'react';
import { Row, Col, Icon, Tabs, Button, Modal, Layout ,Badge} from 'antd';
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
const testQuestion=require("./question-test.json")
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTesting: false,
            isPaperGet: false,
            isAllDone: false,
            focusOn: 0,
            pic: 0,
            question: []
        }
        for (let i = 0; i < 20; i++) {
            this.state.question.push({
                id:-1,
                isFinish: false,
                kind: "选择题",
                title: "",
                choice: ['', '', '', ''],
                isRight: false,
                value: -1
            });
        }
        for (let i = 20; i < 30; i++) {
            this.state.question.push({
                id:-1,
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
       testQuestion.question.forEach((x,i)=>{
          this.state.question[i]=x
       })
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
        //                     text:data.test[i].option[0],
        //                     value:1
        //                 },
        //                 {
        //                     text:data.test[i].option[1],
        //                     value:2
        //                 },
        //                 {
        //                     text:data.test[i].option[2],
        //                     value:3
        //                 },
        //                 {
        //                     text:data.test[i].option[3],
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
        // if (!this.state.isTesting) {
        //     return (
        //         <div style={{
        //             backgroundImage: `url(${BG})`,
        //             backgroundSize: 'cover',
        //             backgroundPosition: 'center',
        //             width: "100%", height: "100%",
        //             position: "absolute",
        //             top: "0px",
        //             bottom: "0px"
        //         }}>
        //             <Modal
        //                 visible={!this.state.isTesting}
        //                 title="答题须知"
        //                 centered={true}
        //                 footer={[
        //                     <Button type="primary" onClick={() => {
        //                         let that = this;
        //                         //temp
        //                         that.setState({ isTesting: true })

        //                         // fetch("http://" + this.props.state.host + '/api/student/start',
        //                         //     {
        //                         //         method: 'POST',
        //                         //         mode: 'cors',
        //                         //         headers: {
        //                         //             "Content-Type": "application/x-www-form-urlencoded"
        //                         //         },
        //                         //         body: JSON.stringify({
        //                         //             Username: that.props.state.username,
        //                         //         }).then(() => { that.setState({ isTesting: true }) })
        //                         //     })
        //                     }}>
        //                         开始答题
        //               </Button>
        //                 ]}>
        //                 <b style={{fontSize:"18px",color:"#1890ff"}}>&nbsp;{this.props.state.userInfo.name}同学,你好!</b><br></br>
        //                 <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎来到校史校情竞赛答题!</p><p></p>

        //                 <ul style={{fontSize:"15px"}}>
        //                 <li>本答题共有<b>30道题</b>,&nbsp;其中有<b>20道选择题,&nbsp;10道判断题</b></li>
        //                 <li>选择题每道4分,&nbsp;判断题每道2分,&nbsp;满分共<b>100分</b></li>
        //                 <li>答题时限为<b>30分钟</b>,&nbsp;时间用完自动交卷</li>
        //                 <li>在未成功交卷前,&nbsp;出现特殊情况,可重新进入答题</li>
        //                 <li>对本答题有疑问,&nbsp;可联系在场负责老师</li>
        //                 </ul>
        //             </Modal>
        //         </div>
        //     )
        // }
        return (
            <React.Fragment>
                <Layout style={{ overflow: "hidder" }}>
                    <Header>
                        <Row>
                            <Col span={16} offset={1}>
                                <h1 style={{ color: 'white' ,fontSize:"25px"}}>东南大学校史校情知识竞赛</h1>
                            </Col>
                            <Col span={6} offset={1}>
                                <Timer state={this.state} setState={this.setState.bind(this)} submit={this.submit}/>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{ backgroundColor: 'rgb(17,17,19)' }}>
                        <Row >
                          <Col span={22} offset={1}>
                            <Tabs className="background-1" 
                            activeKey={`${this.state.focusOn}`}
                            animated='true'
                            onTabClick={(x) => { this.setState({ focusOn: x }) }}
                            tabBarGutter='0'
                            tabPosition="bottom"
                            style={{marginBottom:"0",marginLeft:"40px"}}>
                            {this.state.question.map((x, i) => (
                                <TabPane tab={!x.isFinish ? 
                                <Badge dot={true} > <div style={{color: 'white'}}>{i + 1}</div></Badge> : 
                                <div style={{ color: 'white'}}>{i + 1}</div>}
                                    key={i}
                                    onChange={() => { this.done(i) }}
                                >
                                    {x.kind == "选择题" ?
                                        <Choice className="choice" Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev} 
                                        submit={this.submint}/>
                                        : <TrueFalse Id={i} state={x} setFinish={this.done.bind(this)} Next={this.Next} Prev={this.Prev} submit={this.submit} />
                                    }
                                </TabPane>)
                            )
                            }
                        </Tabs>
                        </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>图源：东南大学官微 &nbsp;版权所有©</Footer>
                </Layout>
              </React.Fragment>
              )
    }
  }
  export default Test
                {/* <body style={{ backgroundImage: `url(${imgs[(this.state.focusOn % 3)]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: '2s' }}>
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
                    <Row>
                    <Col span={18} >
                        <div className="Question">
                                <Tabs activeKey={`${this.state.focusOn}`}
                                    onTabClick={(x) => { this.setState({ focusOn: x }) }}
                                    tabPosition="left"
                                    style={{ height: 640 }} >
                                    {this.state.question.map((x, i) => (
                                        <TabPane tab={!x.isFinish ? <div><Icon type="clock-circle" /> {x.kind}{i + 1}&nbsp;</div> : <div style={{backgroundColor:'#572A3F', color:'white', borderRadius:20}}><Icon type="clock-circle" />{x.kind}{i + 1}&nbsp;</div>}
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
                                        <Col span={16}></Col>
                                        <Col span={3}>
                                            <Button onClick={this.Prev}>上一题</Button>
                                        </Col>
                                        <Col span={4}>
                                            {this.state.focusOn < 29 && <Button onClick={this.Next}>下一题</Button>}
                                            {this.state.focusOn == 29 && <Button type='primary' onClick={this.submit}>提交</Button>}
                                        </Col>
                                    </Row>
                                </Tabs>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div style={{width:200}}>
                                <br/>
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
                                    <Col span={9} offset={16} style={{ marginTop: "100px" }}>
                                        <Button.Group size="large">
                                            <Button type="primary" onClick={this.Prev}>
                                                <Icon type="left" />
                                                上一题
                                            </Button>
                                            {this.state.focusOn < 29 ?
                                                <Button type="primary" onClick={this.Next}>下一题<Icon type="right" /></Button> :
                                                <Button type='primary' onClick={this.submit}>提交答案<Icon type="right" /></Button>}
                                        </Button.Group>
                                    </Col>
                                </Row>
                            </Tabs>
                        </Col>
                        <Col span={2} offset={20} style={{ marginTop: "0px" }}>
                            <iframe onClick={this.submit} src="https://zhanyuzhang.github.io/lovely-cat/cat.html"></iframe>
                        </Col>

                                x.isFinish?<Button ghost style={{width:10, textAlign:'center'}}>{i+1}</Button>:<Button style={{width:10}} onClick={() => { this.setState({ focusOn: i }) }}>{i+1}</Button>))}
                                </div>
                            </Col>
                        <iframe onClick={this.submit} src="https://zhanyuzhang.github.io/lovely-cat/cat.html"></iframe>
                    </Row>
                </body> */}




{/*
    import BannerAnim from 'rc-banner-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
const { Element, Arrow, Thumb } = BannerAnim;
const BgElement = Element.BgElement;
class Demo extends React.Component {
  constructor() {
    super(...arguments);
    this.imgArray = [
      'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
      'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
    ];
    this.state = {
      intShow: 0,
      prevEnter: false,
      nextEnter: false,
      thumbEnter: false,
    };
    [
      'onChange',
      'prevEnter',
      'prevLeave',
      'nextEnter',
      'nextLeave',
      'onMouseEnter',
      'onMouseLeave',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  onChange(type, int) {
    if (type === 'before') {
      this.setState({
        intShow: int,
      });
    }
  }

  getNextPrevNumber() {
    let nextInt = this.state.intShow + 1;
    let prevInt = this.state.intShow - 1;
    if (nextInt >= this.imgArray.length) {
      nextInt = 0;
    }
    if (prevInt < 0) {
      prevInt = this.imgArray.length - 1;
    }

    return [prevInt, nextInt];
  }

  prevEnter() {
    this.setState({
      prevEnter: true,
    });
  }

  prevLeave() {
    this.setState({
      prevEnter: false,
    });
  }

  nextEnter() {
    this.setState({
      nextEnter: true,
    });
  }

  nextLeave() {
    this.setState({
      nextEnter: false,
    });
  }
  
  onMouseEnter() {
    this.setState({
      thumbEnter: true,
    });
  }

  onMouseLeave() {
    this.setState({
      thumbEnter: false,
    });
  }

  render() {
    const intArray = this.getNextPrevNumber();
    const thumbChildren = this.imgArray.map((img, i) =>
          <span key={i}><i style={{ backgroundImage: `url(${img})` }} /></span>
        );
    return (
      <BannerAnim 
        onChange={this.onChange} 
        onMouseEnter={this.onMouseEnter} 
        onMouseLeave={this.onMouseLeave} 
        prefixCls="custom-arrow-thumb"
      >
        <Element key="aaa"
          prefixCls="banner-user-elem"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              backgroundImage: `url(${this.imgArray[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
            Ant Motion Banner
          </TweenOne>
          <TweenOne 
            className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
            The Fast Way Use Animation In React
            </TweenOne>
        </Element>
        <Element key="bbb"
          prefixCls="banner-user-elem"
        >
          <BgElement
            key="bg"
            className="bg"
            style={{
              backgroundImage: `url(${this.imgArray[1]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
            Ant Motion Banner
          </TweenOne>
          <TweenOne 
            className="banner-user-text" 
            animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
          >
            The Fast Way Use Animation In React
          </TweenOne>
        </Element>
        <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={TweenOne}
          onMouseEnter={this.prevEnter}
          onMouseLeave={this.prevLeave}
          animation={{ left: this.state.prevEnter ? 0 : -120 }}
        >
          <div className="arrow"></div>
          <TweenOneGroup 
            enter={{ opacity: 0, type: 'from' }} 
            leave={{ opacity: 0 }} 
            appear={false} 
            className="img-wrapper" component="ul"
          >
            <li style={{ backgroundImage: `url(${this.imgArray[intArray[0]]})`}} key={intArray[0]} />
          </TweenOneGroup>
        </Arrow>
        <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={TweenOne}
          onMouseEnter={this.nextEnter}
          onMouseLeave={this.nextLeave}
          animation={{ right: this.state.nextEnter ? 0 : -120 }}
        >
          <div className="arrow"></div>
          <TweenOneGroup 
            enter={{ opacity: 0, type: 'from' }} 
            leave={{ opacity: 0 }} 
            appear={false} 
            className="img-wrapper" 
            component="ul"
          >
            <li style={{ backgroundImage: `url(${this.imgArray[intArray[1]]})`}} key={intArray[1]} />
          </TweenOneGroup>
        </Arrow>
        <Thumb prefixCls="user-thumb" key="thumb" component={TweenOne}
          animation={{ bottom: this.state.thumbEnter ? 0 : -70 }}
        >
          {thumbChildren}
        </Thumb>
      </BannerAnim>
    );
  }
}
ReactDOM.render(
  <Demo />
, mountNode);
*/}