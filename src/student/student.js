import React, {
    Component
} from 'react';
import './student.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { EditorFormatSize } from 'material-ui/svg-icons';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar';
import "antd/dist/antd.css"
import {Button,Input,Modal,message} from 'antd';
class Student extends Component{
    constructor(props){
        super(props);
    }
    render(){
        message.success('登陆成功！');
        return(
            <MuiThemeProvider>
                <AppBar
                    title="校史校情知识竞赛"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                    style={{ backgroundColor: '#29833D', position: 'fixed', webkitAppRegion: 'drag', webkitUserSelect: 'none' }}
                    titleStyle={{ fontFamily: "NotoSansHans-Regular" }}
                />
            </MuiThemeProvider>
        )
    }
}

export default Student;