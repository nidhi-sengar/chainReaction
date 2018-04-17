
import React, { Component } from 'react';
class BOX extends Component {
    constructor(props) {
        super(props);
        let maxBalls = 0;
        let { rowNumber, colNumber } = this.props;
        if ((rowNumber === 0 && colNumber === 0) || (rowNumber === 0 && colNumber === 5) || (rowNumber === 8 && colNumber === 0) || (rowNumber === 8 && colNumber === 5)) {
            maxBalls = 1
        }
        else if ((((rowNumber === 0 || rowNumber === 8) && (0 < colNumber < 5))) || ((colNumber === 0 || colNumber === 5) && (0 < rowNumber < 8))) {
            maxBalls = 2
        }
        else {
            maxBalls = 3
        }
        this.state = {
            maxBalls,
            currentBall: 0,
            color: null
        }
        this.insertBall = this.insertBall.bind(this);
        this.setColor = this.setColor.bind(this);
        this.ballArr = [];
    }

    setColor(color) {
        this.props.noOfUsers.filter(item => {
            if (item.color === color) {
                item.turn = true
            }else{
                item.turn = false
            }
        })
        this.setState({
            color: color
        },()=>{
            this.props.samePlayerTurn(this.props.noOfUsers)
        })
    }
    setSingleColor() {
        this.setState({
            color: null
        })
    }
    blastBall(){
        console.log(".....blast ball");
        let playerTurn = this.props.noOfUsers.filter(item => {
            if (item.turn === true) {
                return {
                    item: item.color
                }
            }
        })
        if (this.state.maxBalls > this.state.currentBall) {

            let { rowNumber, colNumber } = this.props;
            this.setState({
                currentBall: this.state.currentBall + 1,
                color: playerTurn[0].color
            })

        } else if (this.state.maxBalls > this.state.currentBall) {
            console.log(".....box with same", playerTurn[0].color);
            this.setState({
                currentBall: this.state.currentBall + 1,
                color: playerTurn[0].color
            })
        } else {
            console.log(".....playerTurn color", playerTurn[0].color);
            let { rowNumber, colNumber } = this.props;
            let array;
            if (this.state.maxBalls === 1) {
                if (rowNumber === 0 && colNumber === 0) {
                    array = [{ row: rowNumber, col: colNumber + 1 }, { row: rowNumber + 1, col: colNumber }];
                } else if (rowNumber === 0 && colNumber === 5) {
                    array = [{ row: rowNumber, col: colNumber - 1 }, { row: rowNumber + 1, col: colNumber }];
                } else if (rowNumber === 8 && colNumber === 0) {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber, col: colNumber + 1 }];
                } else {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber, col: colNumber - 1 }];
                }
            }
            if (this.state.maxBalls === 2) {
                if (rowNumber === 0) {
                    array = [{ row: rowNumber, col: colNumber - 1 }, { row: rowNumber, col: colNumber + 1 }, { row: rowNumber + 1, col: colNumber }]
                }
                if (rowNumber === 8) {
                    array = [{ row: rowNumber, col: colNumber - 1 }, { row: rowNumber, col: colNumber + 1 }, { row: rowNumber - 1, col: colNumber }]
                }
                if (colNumber === 0) {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber + 1, col: colNumber }, { row: rowNumber, col: colNumber + 1 }]
                }
                if (colNumber === 5) {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber + 1, col: colNumber }, { row: rowNumber, col: colNumber - 1 }]
                }
            }
            if (this.state.maxBalls === 3) {
                array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber + 1, col: colNumber }, { row: rowNumber, col: colNumber - 1 }, { row: rowNumber, col: colNumber + 1 }];
            }
            this.setState({
                currentBall: 0,
                color: playerTurn[0].color
            }, () => {
                this.props.callback(rowNumber, colNumber, array);
            })
        }
    }

    insertBall() {
        console.log(".....insertBall");
        let playerTurn = this.props.noOfUsers.filter(item => {
            if (item.turn === true) {
                return {
                    item: item.color
                }
            }
        })
        console.log(".....blah blah blah", this.state.maxBalls > this.state.currentBall, this.state.color, playerTurn[0].color,  this.state.color === playerTurn[0].color);

        if ((this.state.maxBalls > this.state.currentBall) && (this.state.color === null)) {

            let { rowNumber, colNumber } = this.props;
            this.setState({
                currentBall: this.state.currentBall + 1,
                color: playerTurn[0].color
            }, () => {
                this.props.setPlayerCallback();
            })

        } else if ((this.state.maxBalls > this.state.currentBall) && (this.state.color === playerTurn[0].color)) {
            console.log(".....box with same", playerTurn[0].color);
            this.setState({
                currentBall: this.state.currentBall + 1,
                color: playerTurn[0].color
            }, () => {
                this.props.setPlayerCallback();
            })
        } else if (this.state.maxBalls === this.state.currentBall && this.state.color === playerTurn[0].color) {
            console.log(".....playerTurn color", playerTurn[0].color);
            let { rowNumber, colNumber } = this.props;
            let array;
            if (this.state.maxBalls === 1) {
                if (rowNumber === 0 && colNumber === 0) {
                    array = [{ row: rowNumber, col: colNumber + 1 }, { row: rowNumber + 1, col: colNumber }];
                } else if (rowNumber === 0 && colNumber === 5) {
                    array = [{ row: rowNumber, col: colNumber - 1 }, { row: rowNumber + 1, col: colNumber }];
                } else if (rowNumber === 8 && colNumber === 0) {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber, col: colNumber + 1 }];
                } else {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber, col: colNumber - 1 }];
                }
            }
            if (this.state.maxBalls === 2) {
                if (rowNumber === 0) {
                    array = [{ row: rowNumber, col: colNumber - 1 }, { row: rowNumber, col: colNumber + 1 }, { row: rowNumber + 1, col: colNumber }]
                }
                if (rowNumber === 8) {
                    array = [{ row: rowNumber, col: colNumber - 1 }, { row: rowNumber, col: colNumber + 1 }, { row: rowNumber - 1, col: colNumber }]
                }
                if (colNumber === 0) {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber + 1, col: colNumber }, { row: rowNumber, col: colNumber + 1 }]
                }
                if (colNumber === 5) {
                    array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber + 1, col: colNumber }, { row: rowNumber, col: colNumber - 1 }]
                }
            }
            if (this.state.maxBalls === 3) {
                array = [{ row: rowNumber - 1, col: colNumber }, { row: rowNumber + 1, col: colNumber }, { row: rowNumber, col: colNumber - 1 }, { row: rowNumber, col: colNumber + 1 }];
            }
            this.setState({
                currentBall: 0,
                color: playerTurn[0].color
            }, () => {
                this.props.callback(rowNumber, colNumber, array);
            })
        }
    }

    render() {
        let ball = !this.state.currentBall ? null : this.state.currentBall;

        let style = {
            backgroundColor: this.state.color
        }
        return (

            <button className="boxes" onClick={this.insertBall}>
                {
                    ball === 1 && <div className="dots" style={style}></div>
                }{
                    ball === 2 && (
                        <div>
                            <div className="dots" style={style}></div>
                            <div className="dots second" style={style}></div>
                        </div>
                    )
                }{
                    ball === 3 && (
                        <div>
                            <div className="dots" style={style}></div>
                            <div className="dots second" style={style}></div>
                            <div className="dots third" style={style}></div>
                        </div>
                    )
                }

            </button>

        )
    }
}
export default BOX;

// {this.props.rowNumber}{this.props.colNumber}