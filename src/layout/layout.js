import React, { Component }  from 'react';
import BOX from '../box/box';
class Layout extends Component{
    constructor(props){
        super(props);
        this.state ={rows: Array(6).fill(null), cols: Array(6).fill(null)};
    }
    render(){
        return(
            <div>
            {
                this.state.rows.map((item,row)=>(
                    <div key={row} className="col-md-6 col-md-offset-4 box-container">
                    {
                        this.state.cols.map((item,index) => (
                            <BOX key={row+index} rowNumber={row} colNumber={index}/>
                        ))
                    }
                    </div>
                ))
            }
            </div>
           
        )
    }
   
}
export default Layout;

