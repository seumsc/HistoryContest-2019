import React from 'react';
import BG from '../../img/图片2.jpg'

class Grades extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <React.Fragment>
                <body style={{backgroundImage:{BG}}}>
                    
                </body>
            </React.Fragment>
        )
    }
}

export default Grades;