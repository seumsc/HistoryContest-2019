import React from 'react';
import 'antd/dist/antd.css';
import {Icon, notification} from 'antd';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 2,
            sec: 59,
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
                    this.props.handin();
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
                else if (y == 10 && x == 0) {
                    notification.open({
                        message: "时间还有10分钟",
                        description: "距离自动交卷还有10分钟，同学要加油啦",
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
                <p style={{ color: "white", fontSize: "20px" }}>
                    {/* <Icon type="clock-circle" style={{ color: "rgb(248, 39, 39)", fontSize: "25px" }} /> */}
                    &nbsp;&nbsp;答题倒计时：{this.state.min}分&nbsp;{this.state.sec}秒
                </p>
            </React.Fragment>
        )
    }
}

export default Timer;