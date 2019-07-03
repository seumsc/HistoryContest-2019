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

class Student extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="WEL" >
            <header id="background"
                className="welcome1" >

                <b>2019东南大学</b><br></br>
                <b className="top">校史校情答题页面 </b>
                <p></p>
                < button className="login-button"
                    onClick={this.test}
                >
                    登陆 / login
                    </button>

            </header>
        </div>
        )
    }
}

export default Student;