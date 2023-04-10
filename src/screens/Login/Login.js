import React from 'react';
import './Login.css';

import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Login extends React.Component {

   

    render() {

        return (
            <div className='Login-Screen'>
                 <h1>Login</h1>
                 <h2>E-mail</h2>
                 <div> className='labels' 
                 <label> email </label>
                 </div>
           
            </div>
            
        )

           
    }
}

export default withRouter(Login);