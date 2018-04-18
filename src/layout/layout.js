import React, { Component }  from 'react';
import BOX from '../box/box';
class Layout extends Component{
    constructor(props){
        super(props);
        this.state ={rows: Array(9).fill(null), cols: Array(6).fill(null),noOfUsers: 2, 
            players: [{
                turn: true,
                color: 'yellow'
            },{
                turn: false,
                color: 'red'
            }],
            currentColor: 'yellow',
            nextColor: 'red'
        };
        this.setBallValueFromChild = this.setBallValueFromChild.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.setPlayer = this.setPlayer.bind(this);
        // this.samePlayerTurn = this.samePlayerTurn.bind(this);   
    }
    render(){
        return(
            <div className="col-md-8 col-md-offset-2">
                <select className="form-control" ref="noOfUsers" onChange={this.selectUser}>
                    <option value="2">2 Users</option>
                    <option value="3">3 Users</option>
                    <option value="2">4 Users</option>
                    <option value="2">5 Users</option>
                    <option value="2">6 Users</option>
                </select>
            <div className="layout container-fluid">
            {
                this.state.rows.map((item,row)=>(
                    <div key={row} className="col-md-6 col-md-offset-4 box-container">
                    {
                        this.state.cols.map((item,index) => (
                            <BOX key={row+index} rowNumber={row} ref={`${row}${index}`} samePlayerTurn={this.samePlayerTurn} noOfUsers={this.state.players} currentColor={this.state.currentColor} nextColor={this.state.nextColor} colNumber={index} callback={this.setBallValueFromChild} setPlayerCallback={this.setPlayer}/>
                        ))
                    }
                    </div>
                ))
            }
            </div>
            </div>
           
        )
    }
   
    setBallValueFromChild(row,col,array){
        this.refs[`${row}${col}`].setSingleColor();
        array.forEach(item => {
            setTimeout(()=> {
                this.refs[`${item.row}${item.col}`].blastBall();
                // this.refs[`${item.row}${item.col}`].setColor(this.state.currentColor);  
            }, 200)
        });
    }
    selectUser(e){}
    setPlayer(){
        let currentColor = '';
        let nextColor= '';
        this.state.players.filter((item,index) => {
            this.state.players[index].turn = !item.turn
            if(!item.turn) {
                nextColor = item.color
            } else {
                currentColor= item.color
            }
        })
        console.log('nextColor:--', nextColor, currentColor, this.state.players[0].color, this.state.players[0].turn);
        this.setState({
            players: this.state.players,
            currentColor,
            nextColor
        },() =>{
            // console.log("....players",this.state.players);
        })
    }
    // samePlayerTurn(players){
    //     this.setState({
    //         players: players
    //     })
    // }
   
}
export default Layout;

