import React from 'react';
import './Login.css';

import FormGroup from "../../components/FormGroup/FormGroup";
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Login extends React.Component {

    state = {
        email: "",
        password: "",
    }

   

    render() {

        return (
            <div className='Login-Screen'>
                 <h1>Login</h1>
                 <div className='labels'>
                    <FormGroup label='E-mail ' htmlFor='lab01'>
                        <input className="form-control" type="text" id="lab04"
                        onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label='Senha' htmlFor='lab02'>
                        <input className="form-control" type="password" id="lab05"
                        onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </FormGroup>
                 </div>

                 <div className='button'>
                    <Button color="primary" className="Login">
                        Login
                    </Button>
                    <Button  className="Register">
                        Ainda não possui cadastro?
                    </Button>
                    <Button  className="RedefinePassword">
                        Esqueceu a senha?
                    </Button>
           
                 </div>
           
            </div>
            
        )

           
    }
}

export default withRouter(Login);