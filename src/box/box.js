
import React, { Component }  from 'react';
class BOX extends Component{
    constructor(props) {
        super(props);
        
        let maxBalls = 0;
        let { rowNumber, colNumber } = this.props;
        if((rowNumber === 0 && colNumber === 0) || (rowNumber === 0 && colNumber === 5) || (rowNumber == 5 && colNumber == 0) || (rowNumber === 5 && colNumber === 5)){
            maxBalls = 1
        }
        else if((((rowNumber === 0 || rowNumber === 5) &&  (0 < colNumber < 5))) || ((colNumber === 0 || colNumber === 5) && (0< rowNumber < 5))){
            maxBalls = 2
        }
        else{
           maxBalls = 3
        }
        this.state = {
            maxBalls,
            currentBall: 0
        }
        this.insertBall = this.insertBall.bind(this);
        this.ballArr = [];
    }

    insertBall() {
        if(this.state.maxBalls > this.state.currentBall){
            this.setState({
                currentBall: this.state.currentBall +1
            })
        }
    }

    render(){
        console.log("....this.props.value",this.props.value);
        return <button className="boxes" onClick={this.insertBall}>{!this.state.currentBall ? null : this.state.currentBall }</button>
    }
}
export default BOX;