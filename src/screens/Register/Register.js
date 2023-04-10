import React from 'react';
import './Register.css';

import img13 from '../../assets/images/LoginScreen.svg';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Register extends React.Component {

   

    render() {

        return (
            <div className='Register-Screen'>
                <img id="img-RegisterScreen" className="RegisterScreen" border="0" src={img13} width="40" height="40" />
               
            </div>

        )

           
    }
}

export default withRouter(Register);