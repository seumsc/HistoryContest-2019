import React from 'react';
import 'antd/dist/antd.css';
import bg from '../../img/VerifyCodeBG.png'
import { Row, Col, Input, Button, Icon } from 'antd';

class VerifyCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.initState(),
            inputValue: "",
            verifyCode: "",
        }
        this.isVerify = this.isVerify.bind(this);
    }
    initState() {
        return {
            data: this.getRandom(109, 48, 4),
            rotate: this.getRandom(60, -60, 4),
            fz: this.getRandom(10, 20, 4),
            color: [this.getRandom(100, 200, 3), this.getRandom(100, 200, 3), this.getRandom(100, 200, 3), this.getRandom(100, 200, 3)]
        }
    }

    getRandom(max, min, num) {
        const asciiNum = ~~(Math.random() * (max - min + 1) + min)
        if (!Boolean(num)) {
            return asciiNum
        }
        const arr = []
        for (let i = 0; i < num; i++) {
            arr.push(this.getRandom(max, min))
        }
        return arr
    }
    isVerify(){
        if(this.state.verifyCode.toLowerCase()===this.props.verifyCode.toLowerCase())
        {
            this.props.setState({isVerify:true});
        }
    }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col span={6}>
                        
                    </Col>
                    <Col span={18}>
                        <div style={{ width: 100, height: 25, backgroundImage: `url(${bg})` }} >
                            {this.state.data.map((v, i) =>
                                <div
                                    key={i}
                                    className='itemStr'
                                    style={{
                                        transform: `skewX(${this.state.rotate[i]}deg)`,
                                        fontSize: `${this.state.fz[i]}px`,
                                        color: `rgb(${this.state.color[i].toString()})`,
                                        display: 'inline-block'
                                    }}
                                    onMouseEnter={() => this.setState({ refresh: true })}>
                                    {String.fromCharCode(v > 57 && v < 84 ? v + 7 : (v < 57 ? v : v + 13))}&nbsp;&nbsp;
                                 </div>
                            )}
                            {this.state.refresh
                                ?
                                <div
                                    className='mask'
                                    onClick={() => {
                                        this.setState({ ...this.initState(), refresh: false })
                                    }}
                                    onMouseLeave={() => { this.setState({ refresh: false }) }}
                                    style={{ fontSize: "10px" }}>
                                    看不清？点击此处刷新
                                </div>
                                : 
                                null
                            }
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

}
export default VerifyCode;