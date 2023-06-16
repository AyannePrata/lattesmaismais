import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';
import FormGroup from "../../components/FormGroup/FormGroup";
import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";
import './Register.css';
import UserApiService from '../../services/UserApiService';
import { AuthContext } from '../../main/SessionProvider';

class Register extends React.Component {
    
    constructor() {
        super();
        this.service = new UserApiService();
    }

    state = {
        name: '',
        email: '',
        password: ''
    }

    validate = () => {
        const errors = [];

        if (!this.state.name) {
            errors.push('Por favor, informe o seu nome!')
        }
        if (!this.state.email) {
            errors.push('Por favor, informe o seu e-mail!')
        }
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('E-mail inválido!')
        }
        if (!this.state.password) {
            errors.push('Por favor, informe a sua senha!')
        }

        return errors;
    };

    submit = async () => {
        const errors = this.validate();
        //TODO reorganizar mensagens mostradas em casos de erro e sucesso
        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false;
        }

        await this.service.create({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }).then(response => {
            showSuccessMessage("Usuário Cadastrado com Sucesso!");
        }).catch(error => {
            console.log(error.response)
        });
        
        const context = this.context;
        context.login(
            this.state.email,
            this.state.password
        ).then(user => {
            if (user) {
                this.props.history.push('/home');
            } else {
                showErrorMessage('Credenciais inválidas!');   
            }
        }).catch(error => {
            console.log(error);
        })
    }


    render() {

        return (
            <div className='Register-Screen'>
                <h1>Cadastro</h1>
                <h2>Já possui uma conta? <a href="http://localhost:3000/">clique aqui</a> para fazer Login</h2>

                <div className='labels'>
                    <FormGroup label='Nome ' htmlFor='lab01'>
                        <input className="form-control" type="text" id="lab01"
                            onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label='E-mail ' htmlFor='lab02'>
                        <input className="form-control" type="email" id="lab02"
                            onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label='Senha' htmlFor='lab03'>
                        <input className="form-control" type="password" id="lab03"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </FormGroup>
                </div>

                <div className='button'>
                    <Button className="RegisterUser" onClick={this.submit}>
                        CADASTRAR
                    </Button>
                </div>


            </div>

        )


    }
}
Register.contextType = AuthContext;
export default withRouter(Register);