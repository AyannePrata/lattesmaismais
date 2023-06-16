import React from 'react';
import './Login.css';
import FormGroup from "../../components/FormGroup/FormGroup";
import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";
import { AuthContext } from '../../main/SessionProvider';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Login extends React.Component {

    state = {
        email: "",
        password: ""
    }

    validate = () => {
        const errors = [];
        if (!this.state.email) {
            errors.push('Por favor, informe o seu e-mail!')
        }
        if (!this.state.password) {
            errors.push('Por favor, digite a sua senha!')
        }

        return errors;
    };

    login = () => {
        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message)
            });
            return false;
        }
        //TODO reorganizar mensagens mostradas em casos de sucesso e erro
        const context = this.context;
        context.login(
            this.state.email,
            this.state.password
        ).then(user => {
            if (user) {
                showSuccessMessage(`Usuário(a) ${user.name}, logado(a)!`);
                this.props.history.push('/home');
            } else {
                showErrorMessage('Login inválido!');
            }
        }).catch(error => {
            console.log(error);

        })
    }

    render() {

        return (
            <div className='Login-Screen'>
                <h1>Login</h1>
                <h2>Já possui uma conta? <a href="http://localhost:3000/register">clique aqui</a> para fazer o seu cadastro</h2>

                <div className='labels'>
                    <FormGroup label='E-mail ' htmlFor='lab01'>
                        <input className="form-control" type="email" id="lab04"
                            onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label='Senha' htmlFor='lab02'>
                        <input className="form-control" type="password" id="lab05"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </FormGroup>
                </div>

                <div className='button'>

                    <Button className="Login" onClick={this.login}>
                        LOGIN
                    </Button>

                </div>



            </div>

        )


    }
}

Login.contextType = AuthContext;
export default withRouter(Login);