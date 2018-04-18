
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

    componentWillReceiveProps(nextProps) {
        if((nextProps.currentColor !== this.props.currentColor) && this.haveUserClicked) {
            console.log('yayyyy @@@ not same color');
            this.haveUserClicked = false;
            this.insertBall();
        }
    }

    setColor(color) {
        this.setState({
            color: color
        })
    }
    setSingleColor() {
        console.log("....set single color");
        this.setState({
            color: null
        })
    }
    blastBall(){
        console.log(".....blast ball");
        let playerTurn = this.props.currentColor;
        if (this.state.maxBalls > this.state.currentBall) {

            let { rowNumber, colNumber } = this.props;
            this.setState({
                currentBall: this.state.currentBall + 1,
                color: playerTurn
            })

        } else if (this.state.maxBalls > this.state.currentBall) {
            // console.log(".....box with same", playerTurn[0].color);
            this.setState({
                currentBall: this.state.currentBall + 1,
                color: playerTurn
            })
        } else {
            // console.log(".....playerTurn color", playerTurn[0].color);
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
                color: null
            }, () => {
                this.props.callback(rowNumber, colNumber, array);
            })
        }
    }

    insertBall(haveUserClicked) {
        console.log('state color: ', this.state.color, this.props.nextColor);
        if (haveUserClicked && (this.state.color === null || this.state.color === this.props.nextColor)) {
            console.log('why here', this.props.nextColor);
            this.haveUserClicked = true;
            this.props.setPlayerCallback();
        } else {
            console.log(".....insertBal1l ", this.props.nextColor);
            let playerTurn = this.props.nextColor;
            console.log('playerTurn[0].color- @@', this.props.noOfUsers[0].color, this.props.noOfUsers[0].turn);
            console.log('playerTurn[0].color- @@11', this.props.noOfUsers[1].color, this.props.noOfUsers[1].turn)
            if ((this.state.maxBalls > this.state.currentBall) && (this.state.color === null)) {
    
                let { rowNumber, colNumber } = this.props;
                this.setState({
                    currentBall: this.state.currentBall + 1,
                    color: playerTurn
                }, () => {
                     // this.props.setPlayerCallback();
                })
    
            } else if ((this.state.maxBalls > this.state.currentBall) && (this.state.color === playerTurn)) {
                // console.log(".....box with same", playerTurn[0].color);
                this.setState({
                    currentBall: this.state.currentBall + 1,
                    color: playerTurn
                }, () => {
                    // this.props.setPlayerCallback();
                })
            } else if (this.state.maxBalls === this.state.currentBall && this.state.color === playerTurn) {
                // console.log(".....playerTurn color", playerTurn[0].color);
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
                    currentBall: 0
                }, () => {
                    this.props.callback(rowNumber, colNumber, array);
                })
            }
        }
    }

    render() {
        let ball = !this.state.currentBall ? null : this.state.currentBall;

        let style = {
            backgroundColor: this.state.color
        }
        return (

            <button className="boxes" onClick={() => {this.insertBall(true)}}>
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