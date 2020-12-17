import React from 'react'
import '../../docs/css//logOut.css'
class LogOut extends React.Component{
    constructor(props){
        super(props);
        this.logOut=this.logOut.bind(this);
    }
    logOut(){
        localStorage.clear('token');
        window.location.href='/';
    }
    render(){
        return(
           <div>
               <input type="button" value="Logout" className="logout"  onClick={this.logOut}/>
           </div>)  
    }
}
export default LogOut;