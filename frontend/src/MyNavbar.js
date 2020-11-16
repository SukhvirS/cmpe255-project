import React from 'react';
import {Link} from 'react-router-dom';
// import './MyNavbar.css';

class MyNavbar extends React.Component{

    render(){
        return(
            <div style={{padding:'40px 100px'}}>
                <Link to='/' style={{float:'left', color:this.props.color}}>
                    <h4 style={{color:this.props.color}}>Home</h4>
                </Link>
                <Link to='/about' style={{float:'right', color:this.props.color}}>
                    <h4 style={{color:this.props.color}}>About</h4>
                </Link>
            </div>
        )
    }

}

export default MyNavbar;