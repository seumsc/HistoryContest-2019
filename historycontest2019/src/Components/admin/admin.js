import React from 'react';
import { Row, Col, Icon, Tabs, Button, Modal, Layout, Badge, Table, Descriptions, Input, Tag, message } from 'antd';
import 'antd/dist/antd.css';
import bg1 from '../../img/background1.png';
import mark from '../../img/校徽实体.png'
import xlsx from 'node-xlsx'
import { object } from 'prop-types';

const { Header, Footer, Sider, Content } = Layout;
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            departData: [],
            num: 150,
            depart: "计算机类",
            average: 90,
            numOfDone: 80,
            searchText: '',
            loading: false,
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
                name: "",
                username: "",
                password: "",
                attemp:-1
            }
        }
        this.get = this.get.bind(this);
        this.register = this.register.bind(this);
        this.reset = this.reset.bind(this);
        this.exportByExcel = this.exportByExcel.bind(this);
    }
    exportByExcel() {

    }
    async get() {
        const testdata = await require("./Students.json");
        const testdata2 = await require("./student.json");
        await testdata.forEach((x, i) => {
            this.state.data.push({
                "姓名": x.Name,
                "学号": x.ID,
                "一卡通": x.CardID,
                "成绩": 90,
                "用时": 600,
                "院系": "计算机类"
            })
        })
        await testdata2.forEach((x, i) => {
            this.state.data.push({
                "姓名": x.Name,
                "学号": x.ID,
                "一卡通": x.CardID,
                "成绩": -1,
                "用时": 800,
                "院系": "建筑类"
            })
        })
        this.setState({});
        //获取学生列表
        fetch("http://" + that.props.state.host + "/api/",
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "authorization": that.props.state.userInfo.token,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: JSON.stringify({
                    Username:that.props.state.userInfo.username
                })
            }).then(res=>res.json()
            ).then(data=>{
                Object.key(data).forEach((x,i)=>{
                    data[x].forEach((v)=>{
                        this.state.data.push({
                            "学号":v.username,
                            "姓名":v.name,
                            "一卡通":v.password,
                            "院系":v.department,
                            "用时":time_use,
                            "成绩":score
                        })
                    })
                    })
            })
    }
    register() {
        //注册函数
        let that = this;
        this.setState({ register: { post: true } });
        // fetch("http://" + this.props.state.host + "/api/ui/register",
        //     {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //             "authorization": that.props.state.userInfo.token,
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         body: JSON.stringify({
        //             Name:that.state.register.name,
        //             Username: that.state.register.username,
        //             Password:that.state.register.password
        //         }).then(res=>res.json()
        //         ).then(data=>{
        //             if(data.status==200){
        //                 message.success("注册成功");
        //                 that.get();
        //                 that.setState({register:{post:false}})
        //                 setTimeout(() => {
        //                     that.setState({register:{Visible:false}})
        //                 }, 400);
        //             }
        //             else if(data.status==403){
        //                 message.warning("该用户(学号)已存在");
        //                 that.setState({register:{post:false}})
        //             }
        //             else if(data.status==400){
        //                 message.warning("用户名或密码格式不正确");
        //                 that.setState({register:{post:false}})
        //             }
        //         })
        //     }
        // )
    }
    reset() {
        //修改密码函数
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
            record[dataIndex].includes(value),

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },

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
        let title = [
            {
                title: "姓名",
                dataIndex: "姓名",
                key: "姓名",
                width: "15%",
                ...this.getColumnSearchProps("姓名")
            },
            {
                title: "学号",
                dataIndex: "学号",
                key: "学号",
                width: "15%",
                ...this.getColumnSearchProps("学号")
            },
            {
                title: "一卡通",
                dataIndex: "一卡通",
                key: "一卡通",
                width: "15%",
                ...this.getColumnSearchProps("一卡通")
            },
            {
                title: "院系",
                dataIndex: "院系",
                key: "院系",
                width: "15%",
                filters: [
                    {
                        text: "计算机类",
                        value: "计算机类"
                    },
                    {
                        text: "建筑类",
                        value: "建筑类"
                    }
                ],
                onFilter: (value, record) => {
                    return record["院系"] == value;
                }
            },
            {
                title: "成绩",
                dataIndex: "成绩",
                key: "成绩",
                width: "10%",
                filters: [{ text: "已完成", value: "已完成" }, { text: "未完成", value: "未完成" }],
                onFilter: (value, record) => {
                    if (value == "已完成") {
                        return record["成绩"] >= 0;
                    }
                    else {
                        return record["成绩"] == -1
                    }
                },
                sorter: (a, b) => a["成绩"] - b["成绩"],
                render(score) {
                    if (score >= 90) {
                        return <Tag color="green">{score}</Tag>
                    }
                    else if (score >= 0) {
                        return <Tag color="blue">{score}</Tag>
                    }
                    else {
                        return <Tag color="#f50">未完成</Tag>
                    }
                },
            },
            {
                title: "排名",
                dataIndex: "排名",
                key: "排名",
                width: "10%",
                ...this.getColumnSearchProps("排名")
            },
            {
                title: "用时",
                dataIndex: "用时",
                key: "用时",
                width: "10%",
                sorter: (a, b) => a["用时"] - b["用时"],
                render(h) {
                    return h + " s"
                },
            },
            {
                title: "答题详情",
                dataIndex: "答题详情",
                key: "答题详情",
                width: "30%",
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
                        <Button key="注册" type="primary" onClick={this.register} loading={this.state.register.post}>
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
                        <Button key="注册" type="primary" onClick={this.reset} loading={this.state.reset.post}>
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
                                <Button ghost type="dashed" onClick={this.props.logout}><Icon type="logout" />退出</Button>
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
                                    title={() => {
                                        return (
                                            <Row>
                                                <Col span={4}>
                                                    <h1 style={{ fontSize: "20px" }}>学生详细列表</h1>
                                                </Col>
                                                <Col span={2} offset={18}>
                                                    <Button type="primary" size="default" onClick={this.exportByExcel}>导出为<Icon type="file-excel" /></Button>
                                                </Col>
                                            </Row>
                                        )
                                    }}
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

