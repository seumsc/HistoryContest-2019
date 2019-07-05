import React, {
    Component
} from 'react';
import './student.css';
import "antd/dist/antd.css";
import {Button,Input,Modal,message,Layout,Menu,Dropdown, Icon,Drawer,Tabs,Row, Col} from 'antd';
import logo from "../photo/校徽实体.png"
class Student extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isPaperGet:false,
            isDone:false,
            settingVisible:false,
            focusOn:0,
            answer:[]
        }
        for(let i=0;i<30;i++)
        {
            this.state.answer.push();
            this.state.answer[i]={
                isFinish:false,
                kind:"选择题",
                choice:'',
                isRight:false
            }
        }
        this.openControl=this.openControl.bind(this);
        this.onClose=this.onClose.bind(this);
        this.logout=this.logout.bind(this);
    }
    openControl(){
        this.setState({settingVisible:true});
    }
    onClose(){
        this.setState({settingVisible:false});
    }
    logout(){
        this.props.setState({
            isWelcome:true,
            isLogin:false,
            isStudent:false
        })
    }
    render(){
        const { Header, Footer, Sider, Content } = Layout;
        const {TabPane}=Tabs;
        return(
            <div>
                <Drawer
                title="选项"
                placement="left"
                closable={false}
                onClose={this.onClose}
                visible={this.state.settingVisible}
                >
                <Button type="danger" onclick={this.logout}>注销/logout</Button>
                </Drawer>
                <Layout>
                    <Header >
                        <Row>
                        <Col span={3}> <Button type="primary" onClick={this.openControl}><Icon type="menu-unfold"/></Button> </Col>
                        <Col span={1} ><img src={logo} width="40" height="40"></img> </Col>
                        <Col span={8} style={ {color : "white",fontSize:"25px"}}>东南大学校史校情知识竞赛</Col>
                        </Row>
                    </Header>
                <Layout>                   
                     <Sider style={{backgroundColor:"rgba(2, 61, 9, 1)"}}>
                            <Tabs activeKey={this.state.focusOn} defaultActiveKey="0" tabPosition="left" style={{ height: 660,color:"white", }}>
                                {[...Array(30).keys()].map(i => (    
                                    <TabPane tab={!this.state.answer[i].isFinish ? <div><Icon type="clock-circle" /> 题目{i+1}</div>: <div><Icon type="check" />题目{i+1}></div>} key={i}>      
                                    {i}
                                    </TabPane>))}
                             </Tabs>
                        </Sider>
                        <Layout>
                    <Content>Content</Content>
                    <Footer style={{backgroundColor:"#001529"}}>Footer</Footer>
                    </Layout>
                </Layout>
                
                </Layout>
            </div>
        )
    }
}

export default Student;