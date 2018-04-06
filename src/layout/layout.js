import React, { Component }  from 'react';
import BOX from '../box/box';
class Layout extends Component{
    constructor(props){
        super(props);
        this.state ={rows: Array(9).fill(null), cols: Array(6).fill(null),noOfUsers: 2};
        this.setBallValueFromChild = this.setBallValueFromChild.bind(this);
        this.selectUser = this.selectUser.bind(this);
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
                            <BOX key={row+index} rowNumber={row} ref={`${row}${index}`} noOfUsers={this.state.noOfUsers} colNumber={index} callback={this.setBallValueFromChild}/>
                        ))
                    }
                    </div>
                ))
            }
            </div>
            </div>
           
        )
    }
    setBallValueFromChild(array){
        console.log("....row number",array);
        array.forEach(item => {
            setTimeout(()=> {
                this.refs[`${item.row}${item.col}`].insertBall();
            }, 200)
        });
    }
    selectUser(e){
        let noOfUser = this.refs.noOfUsers.value;
        console.log("....no of users", noOfUser); 
    }
   
}
export default Layout;

