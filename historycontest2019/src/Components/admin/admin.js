import React from 'react';
import { Row, Col, Icon, Tabs, Button, Modal, Layout, Badge, Table, Descriptions, Input,Tag } from 'antd';
import 'antd/dist/antd.css';
import bg1 from '../../img/background1.png';

import mark from '../../img/校徽实体.png'
import { async } from 'q';

const { Header, Footer, Sider, Content } = Layout;
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num: 150,
            depart: "计算机类",
            average: 90,
            numOfDone: 80,
            searchText: '',
            loading:false,
            register: {
                Visible: false,
                post: false,
                name: "",
                username: "",
                password: ""
            },
            reset: {
                Visible: false,
                post: false,
                username: "",
                password: "",
                conpassword:""
            }
        }
        this.logout = this.logout.bind(this);
        this.get = this.get.bind(this);
        this.register = this.register.bind(this);
        this.reset = this.reset.bind(this);
        this.exportByExcel=this.exportByExcel.bind(this);
    }
    exportByExcel(){

    }
    async get() {
        const testdata=await require("./Students.json");
        const testdata2=await require("./student.json");
        await testdata.forEach((x,i)=>{
            this.state.data.push({
                "姓名":x.Name,
                "学号":x.ID,
                "一卡通":x.CardID,
                "成绩":90,
                "院系":"计算机类"
            })
        })
        await testdata2.forEach((x,i)=>{
            this.state.data.push({
                "姓名":x.Name,
                "学号":x.ID,
                "一卡通":x.CardID,
                "成绩":-1,
                "院系":"建筑类"
            })
        })
        this.setState({});
    }
    register() {

    }
    reset() {

    }
    logout() {
        this.props.setState({
            isWelcome: true,
            isLogin: false,
            isStudent: false,
            isAllDone: false,
            isAdmin: false,
            isTeacher: false,
            host: "",
            userInfo:
            {
                name: '',
                username: "",
                token: '',
                access: -1,
                score: -1
            },
            answer: []
        })
    }
    componentWillMount() {
        this.get();
        //测试数据输入

    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`按 ${dataIndex}查找`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              查找
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              重置
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" size="large" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .includes(value),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        }
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };
  

    render() {
        let title=[
            {
                title:"姓名",
                dataIndex:"姓名",
                key:"姓名",
                width:"15%",
                ...this.getColumnSearchProps("姓名")
            },
            {
                title:"学号",
                dataIndex:"学号",
                key:"学号",
                width:"15%",
                ...this.getColumnSearchProps("学号")
            },
            {
                title:"一卡通",
                dataIndex:"一卡通",
                key:"一卡通",
                width:"15%",
                ...this.getColumnSearchProps("一卡通")
            },
            {
                title:"院系",
                dataIndex:"院系",
                key:"院系",
                width:"15%",
                filters:[
                    {
                        text:"计算机类",
                        value:"计算机类"
                    },
                    {
                        text:"建筑类",
                        value:"建筑类"
                    }
                ],
                onFilter:(value,record)=>{
                    return record["院系"]==value;
                }
            },
            {
                title:"成绩",
                dataIndex:"成绩",
                key:"成绩",
                width:"15%",
                filters:[{text:"已完成",value:"已完成"},{text:"未完成",value:"未完成"}],
                onFilter: (value, record) => {
                    if(value=="已完成"){
                        return record["成绩"]>=0;
                    }
                    else{
                        return record["成绩"]==-1
                    }
                },
                render(score) {
                    if(score>=90){
                        return <Tag color="green">{score}</Tag>
                    }   
                    else if(score>=0){
                        return <Tag color="blue">{score}</Tag>
                    }
                    else{
                        return <Tag color="#f50">未完成</Tag>
                    }
                },
            },
            {
                title:"排名",
                dataIndex:"排名",
                key:"排名",
                width:"15%",
                ...this.getColumnSearchProps("排名")
            },
            {
                title:"答题详情",
                dataIndex:"答题详情",
                key:"答题详情",
                width:"30%",
                render(e) {
                    
                },
            },
        ]
        return (
            <React.Fragment>
                <Modal
                    title="注册"
                    visible={this.state.register.Visible}
                    onCancel={() => { this.setState({ register: { Visible: false } }) }}
                    footer={[
                        <Button key="返回" type="defult" onClick={() => { this.setState({ register: { Visible: false } }) }}>
                            返回
              </Button>,
                        <Button key="注册" type="primary" onClick={this.register} loading={this.state.register.posted}>
                            <Icon type="check-circle" theme="twoTone" />
                            注册
              </Button>
                    ]}
                    visible={this.state.register.Visible}
                >   <Input id="name" addonBefore=" 姓名 " placeholder="注册姓名" allowClear onChange={(e) => { this.setState({ register: { name: e.target.value } }) }}></Input>
                    <p></p>
                    <Input id="username" addonBefore=" 账户 " placeholder="学号" allowClear onChange={(e) => { this.setState({ register: { username: e.target.value } }) }}></Input>
                    <p></p>
                    <Input.Password id="password" addonBefore=" 密码 " placeholder="一卡通号码" allowClear onChange={(e) => { this.setState({ register: { password: e.target.value } }) }} />
                    <p></p>

                </Modal>
                <Modal
                    title="注册"
                    visible={this.state.reset.Visible}
                    onCancel={() => { this.setState({ reset: { Visible: false } }) }}
                    footer={[
                        <Button key="返回" type="defult" onClick={() => { this.setState({ reset: { Visible: false } }) }}>
                            返回
              </Button>,
                        <Button key="注册" type="primary" onClick={this.reset} loading={this.state.reset.posted}>
                            <Icon type="check-circle" theme="twoTone" />
                            修改
              </Button>
                    ]}
                    visible={this.state.reset.Visible}
                > 
                    <Input id="username" addonBefore=" 账户 " placeholder="需要修改的账户(学号)" allowClear onChange={(e) => { this.setState({ reset: { username: e.target.value } }) }}></Input>
                    <p></p>
                    <p></p>
                    <Input.Password id="password" addonBefore=" 新密码 " placeholder="推荐一卡通号码" allowClear onChange={(e) => { this.setState({ reset: { password: e.target.value } }) }} />
                    <Input.Password id="repassword" addonBefore=" 新密码 " placeholder="再次输入密码" allowClear onChange={(e) => { this.setState({ reset: { conpassword: e.target.value } }) }} />
                    <p></p>

                </Modal>
                <Layout>
                    <Header>
                        <Row>
                            <Col span={12}>
                                <h1 style={{ color: 'white', fontSize: "25px" }}><img src={mark} height="45px" width="45px" />&nbsp;校史校情知识竞赛&nbsp;&nbsp;管理系统</h1>
                            </Col>
                            <Col span={2} offset={8}>
                                <Button ghost type="primary" onClick={this.get}><Icon type="redo" />刷新</Button>
                            </Col> <Col span={2} >
                                <Button ghost type="dashed" onClick={this.logout}><Icon type="logout" />退出</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        <Row>
                            <Col span={20} offset={2}>
                                <Descriptions bordered title={
                                    <Row>
                                        <Col span={5}><p style={{ fontSize: "30px", marginTop: '20px' }}>{this.state.depart}&nbsp;统计信息</p></Col>
                                        <Col span={2} offset={1}>
                                            <div style={{ marginTop: '20px' }}><Button type="primary" size="large"
                                                onClick={() => { this.setState({ register: { Visible: true } }) }}>
                                                学生注册
                                                </Button>
                                            </div>

                                        </Col>
                                        <Col span={2} offset={0}>
                                            <div style={{ marginTop: '20px' }}><Button type="primary" size="large"
                                                onClick={() => { this.setState({ reset: { Visible: true } }) }}>
                                                学生修改密码
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                }>
                                    <Descriptions.Item label="总人数">{this.state.num}</Descriptions.Item>
                                    <Descriptions.Item label="已完成人数">{this.state.numOfDone}</Descriptions.Item>
                                    <Descriptions.Item label="平均分">{this.state.average}</Descriptions.Item>
                                </Descriptions>
                                <Table 
                                columns={title} 
                                loading={this.state.loading} bordered 
                                dataSource={this.state.data}
                                size="small"
                                title={()=>{return (
                                    <Row>
                                        <Col span={4}>
                                            <h1 style={{fontSize:"20px"}}>详细列表</h1>
                                        </Col>
                                        <Col span={2} offset={18}>
                                            <Button type="primary" size="default" onClick={this.exportByExcel}>导出为<Icon type="file-excel" /></Button>
                                        </Col>
                                    </Row>
                                )}}
                                >

                                </Table>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </React.Fragment>
        )
    }
}

export default Admin