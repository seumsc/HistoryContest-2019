import React from 'react';
import 'antd/dist/antd.css';
import {Row, Radio} from 'antd';
const RadioGroup = Radio.Group;

class TrueFalse extends React.Component {
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
                <h2 style={{marginTop:30, marginLeft:20, fontSize:25, height:60}}>
                    {this.props.state.title}
                </h2>
                <Radio.Group style={{marginTop:40, marginLeft:40, height:250}} onChange={this.onchange} value={this.state.value} buttonStyle={"outline"}>
                    <Radio style={style} value={1}>
                        <b>对</b> &nbsp; {this.props.state.choice[0]}
                    </Radio>
                    <Radio style={style} value={2}>
                        <b>错</b> &nbsp; {this.props.state.choice[1]}
                    </Radio>
                </Radio.Group>
                </Row>
            </React.Fragment>
        )
    }
}

export default TrueFalse;