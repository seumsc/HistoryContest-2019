import React from 'react';
import {Row, Radio, Button} from 'antd';
import 'antd/dist/antd.css';
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
            lineHeight: '50px',
            fontSize: '20px'
        }
        return (
            <React.Fragment>
                <Row>
                <h2 style={{marginTop:30, marginLeft:20, fontSize:25}}>
                    {this.props.state.title}
                </h2>
                <Radio.Group style={{marginTop:40, marginLeft:40}} onChange={this.onchange} value={this.state.value} buttonStyle={"outline"}>
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
                {/* <Button onClick={this.props.Next}>下一题</Button> */}
                </Row>
            </React.Fragment>
        )
    }
}

export default Choice;