
import React, { Component }  from 'react';
class BOX extends Component{
    constructor(props) {
        super(props);
        
        let maxBalls = 0;
        let { rowNumber, colNumber } = this.props;
        if((rowNumber === 0 && colNumber === 0) || (rowNumber === 0 && colNumber === 5) || (rowNumber === 8 && colNumber === 0) || (rowNumber === 8 && colNumber === 5)){
            maxBalls = 1
        }
        else if((((rowNumber === 0 || rowNumber === 8) &&  (0 < colNumber < 5))) || ((colNumber === 0 || colNumber === 5) && (0< rowNumber < 8))){
            maxBalls = 2
        }
        else{
           maxBalls = 3
        }
        this.state = {
            maxBalls,
            currentBall: 0,
            isNext: false
        }
        this.insertBall = this.insertBall.bind(this);
        this.ballArr = [];
    }

    insertBall() {
        console.log(".....insertBall")
        if(this.state.maxBalls > this.state.currentBall){
            this.setState({    
                currentBall: this.state.currentBall +1,
                isNext: !this.state.isNext
            })
        }else{
            let {rowNumber, colNumber} = this.props;
            let array;
            if(this.state.maxBalls === 1){
                if( rowNumber === 0 && colNumber === 0){
                    array  = [{row: rowNumber, col: colNumber+1},{row: rowNumber+1,col: colNumber}];  
                }else if(rowNumber === 0 && colNumber === 5){
                    array  = [{row: rowNumber, col: colNumber-1},{row: rowNumber+1,col: colNumber}];
                }else if(rowNumber === 8 && colNumber === 0){
                    array  = [{row: rowNumber-1, col: colNumber},{row: rowNumber,col: colNumber+1}];
                }else{
                    array  = [{row: rowNumber-1, col: colNumber},{row: rowNumber,col: colNumber-1}];
                }
            }
            if(this.state.maxBalls === 2){
                if(rowNumber === 0 ){
                    array = [{row: rowNumber, col: colNumber-1},{row: rowNumber, col: colNumber+1},{row: rowNumber+1, col: colNumber}]
                }
                if(rowNumber === 8 ){
                    array = [{row: rowNumber, col: colNumber-1},{row: rowNumber, col: colNumber+1},{row: rowNumber-1, col: colNumber}]
                }
                if(colNumber === 0 ){
                    array = [{row: rowNumber-1, col: colNumber},{row: rowNumber+1, col: colNumber},{row: rowNumber, col: colNumber+1}]
                }
                if(colNumber === 5 ){
                    array = [{row: rowNumber-1, col: colNumber},{row: rowNumber+1, col: colNumber},{row: rowNumber, col: colNumber-1}]
                }
            }
            if(this.state.maxBalls === 3){
                array = [{row: rowNumber-1, col: colNumber},{row: rowNumber+1, col: colNumber},{row: rowNumber, col: colNumber-1},{row: rowNumber, col: colNumber+1}];
            }
            this.setState({
                currentBall: 0,
            }, () => {
                this.props.callback(array);
            })
        }
    }

    render(){
       let ball = !this.state.currentBall ? null : this.state.currentBall;
       let turn = this.state.isNext;
       console.log("...turn",turn);
    
        console.log("....this.props.value",this.props.value);
        return (
        
        <button className="boxes" onClick={this.insertBall}>
        {
            ball == 1 &&  <div className="dots"></div>
        }{
            ball == 2 && (
            <div>
                <div className="dots"></div>
                <div className="dots second"></div>
            </div>
            )
        }
        {
            ball == 3 && (
            <div> 
                <div className="dots"></div>
                <div className="dots second"></div>
                <div className="dots third"></div>
            </div>
            )
        }
       
        </button>
        
         )
    }
}
export default BOX;

// {this.props.rowNumber}{this.props.colNumber}