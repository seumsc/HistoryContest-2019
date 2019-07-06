import React, {
    Component
} from 'react';
import "antd/dist/antd.css";
import { Button, Input, Modal, message, Layout, Menu, Dropdown, Icon, Drawer, Tabs, Row, Col, notification, Radio } from 'antd';
import { stringTypeAnnotation } from '@babel/types';
const RadioGroup = Radio.Group;
class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0
        }
        this.onchange=this.onchange.bind(this);
    }
    onchange(e){
        this.setState({value:e.target.value});
        this.props.setFinish(this.props.Id);
    }
    render() {
        let style = {
            display: 'block',
            height: '50px',
            lineHeight: '50px'
        }
        return (
            <React.Fragment>
                <Row>
                <h2>
                    {this.props.state.title}
                </h2>
                <Radio.Group onChange={this.onchange} value={this.state.value}>
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
                </Row>
            </React.Fragment>
        )
    }
}

class TrueFalse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 1,
            sec: 10,
            isClocking: true
        }
    }
    componentWillMount() {
        this.timerId = setInterval(
            function () {
                let x = this.state.sec;
                let y = this.state.min;
                if (y == 0 && x == 0) {
                    clearInterval(this.timerId);
                    this.state.isClocking = false;
                    this.props.setState({ isAllDone: false });
                }
                else if (x > 0) {
                    this.setState({ sec: x - 1 });
                }
                else {
                    this.setState({ sec: 59, min: y - 1 });
                }
                if (y == 1 && x == 0) {
                    notification.open({
                        message: "时间还有1分钟",
                        description: "距离自动交卷只剩1分钟了哦，同学要加油啦",
                        icon: <Icon type="clock-circle" style={{ color: "rgb(248, 39, 39)" }} />
                    })
                }
                else if (y == 0 && x == 30) {
                    notification.open({
                        message: "时间还有30秒",
                        description: "距离自动交卷只剩30秒了哦，同学要加油啦",
                        icon: <Icon type="clock-circle" style={{ color: "rgb(248, 39, 39)" }} />
                    })
                }

            }.bind(this),
            1000
        )
    }
    componentWillUnmount() {
        if (this.state.isClocking) {
            clearInterval(this.timerId);
        }
    }
    render() {
        return (
            <React.Fragment>
                <p style={{ color: "white", fontSize: "25px" }}>
                    <Icon type="clock-circle" style={{ color: "rgb(248, 39, 39)", fontSize: "25px" }} />
                    &nbsp;&nbsp;答题倒计时：{this.state.min}分&nbsp;{this.state.sec}秒
                </p>
            </React.Fragment>
        )
    }
}

export { Choice, TrueFalse, Timer }