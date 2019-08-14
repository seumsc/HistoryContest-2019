import React from 'react';
import './Welcome.css';
import 'antd/dist/antd.css';
import bg1 from '../../img/1.png';
import seu from '../../img/东南大学.png';
import words from '../../img/校史校情知识竞赛 .PNG';
import { Icon } from 'antd';
import LoginModal from '../LoginModal/LoginModal';
import QueueAnim from 'rc-queue-anim';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logining: false,
        };
        this.open = this.open.bind(this);
        this.closModal = this.closModal.bind(this);
    }
    open() {
        this.setState({ logining: true });
    }
    closModal() {
        this.setState({ logining: false });
    }
    componentWillUnmount() {
        console.log(this.props.state.username)
    }
    render() {
        let origin = (
            <div className="WEL" style={{ minWidth: "500px" }}>
                <header className="welcome"
                    id="background"
                    style={{
                        backgroundImage: `url(${bg1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: "100%", height: "100%",
                        position: "absolute",
                        top: "0px",
                        bottom: "0px"
                    }}
                >
                    <QueueAnim interval={40} duration={2000}
                        animConfig={[
                            { opacity: [1, 0], translateY: [0, 50] },
                        ]}>
                        <b key="1" className="sma"><img src={seu} height="30%" width="32%"></img></b><br></br>
                        <b key="2" className="top"><img src={words} height="45%" width="90%"></img><br></br> </b>
                        <p key="space1"></p>
                    </QueueAnim>
                    <QueueAnim animConfig={[
                        { opacity: [1, 0], translateY: [0, 100] },
                    ]}>
                        < button
                            key="button"
                            className="login-button"
                            onClick={this.open}
                        >
                            <Icon type="login" style={{ color: "white" }} />&nbsp;<b>登录 &nbsp; Login</b>
                        </button>
                        <p key="space2"></p>
                    </QueueAnim>
                </header>
            </div>
        );
        let login = (
            <div className="WEL" >
                <LoginModal state={this.state} host={this.props.state.host} setState={this.props.setState} close={this.closModal} />
                <header className="welcome"
                    id="background"
                    style={{
                        backgroundImage: `url(${bg1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: "100%", height: "100%",
                        position: "absolute",
                        top: "0px",
                        bottom: "0px"
                    }}>
                    <b className="sma"><img src={seu} height="100px" width="300px"></img></b><br></br>
                    <b className="top"><img src={words} height="140px" width="936px"></img><br></br> </b>
                    <p></p>
                    < button
                        className="login-button"
                        onClick={this.open}
                        disabled={true}
                    >
                        <Icon type="loading" style={{ color: "white" }} />
                        &nbsp;
                    <b>登录中</b>
                    </button>
                    <p></p>
                </header>            
            </div>
        );
        let x = (this.state.logining ? login : origin);
        return x;
    }
}

export default Welcome;