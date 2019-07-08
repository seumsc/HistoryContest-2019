import React from 'react';
import { Row, Col, Layout, Carousel, Radio, Steps, Button, message, Tabs, Anchor, Calendar } from 'antd';
import 'antd/dist/antd.css';
import './Test.css';
import bg1 from '../../img/答题1.jpg';
import bg2 from '../../img/答题2.jpg';
import bg3 from '../../img/答题3.jpg';
import bg4 from '../../img/答题4.jpg';

var imgs = [bg1, bg2, bg3, bg4];
const { Header, Footer, Sider, Content } = Layout;
const RadioGroup = Radio.Group;
const Step = Steps.Step;
const { Link } = Anchor;
const { TabPane } = Tabs;

const steps = [{
    title: 'First',
    content: 'diyiti',
  }, {
    title: 'Second',
    content: 'Second-content',
  }, {
    title: 'Last',
    content: 'Last-content',
  }];

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x : 0,
            value : null,
            current: 0,
        }
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    componentDidMount() {
        this.timer = setInterval(function () {
            var x = this.state.x;
            x++;
            x=x%4;
            this.setState({x:x});
        }.bind(this), 5000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }   
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      }
    render(){
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return(
        <React.Fragment>
            <Layout>
                <Header style={{verticalAlign:'center', height: 100, backgroundColor:'#006666'}}><h1 style={{color:'white'}}>2019东南大学校史校情知识竞赛答题</h1></Header>
                <Layout>
                    <Content style={{backgroundColor:'white'}}>
                        <Row>
                            <Col span={6} style = {{backgroundImage:`url(${imgs[this.state.x]})`, height:900}}>
                                <div style={{ width: 375, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                                    <Calendar fullscreen={false}  />
                                </div>
                            </Col>
                            <Col span={18}>
                                <Tabs defaultActiveKey="1" tabPosition='left' style={{ height: 720 }}>
                                    {[...Array(30).keys()].map(i => (
                                        <TabPane tab={`Q ${i+1}`} key={i+1}>
                                            <h2>第{i+1}题 燃煤联合循环发电技术由哪个研究所长期研究</h2>
                                            <Radio.Group onChange={this.onChange} value={this.state.value}>
                                                <Radio style={radioStyle} value={1}>
                                                A 东大建筑与环境研究所
                                                </Radio>
                                                <Radio style={radioStyle} value={2}>
                                                B 东大热能工程研究所
                                                </Radio>
                                                <Radio style={radioStyle} value={3}>
                                                C 东大能源与环境工程研究所
                                                </Radio>
                                                <Radio style={radioStyle} value={4}>
                                                D 东大动力研究所
                                                </Radio>
                                            </Radio.Group>
                                        </TabPane>
                                    ))}
                                </Tabs>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>        
        </React.Fragment>
        )
    }
}

export default Test