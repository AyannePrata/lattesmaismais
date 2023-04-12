import React from 'react';
import './Register.css';
import UserApiService from '../../services/UserApiService';
import FormGroup from "../../components/FormGroup/FormGroup";
import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";

import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Register extends React.Component {

    state={
        name:'',
        email:'',
        password:''
       
    }
    
    constructor(){
        super();
        this.service = new UserApiService();
    }

    login = () => {
        this.props.history.push("/");
    }

    validate = () =>{
        const errors = [];

        if(!this.state.name){
            errors.push('Pro favor, informe o seu nome!')
        }
        if(!this.state.email){
            errors.push('Por favor, informe o seu e-mail!')
        }
        else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            errors.push('Email inválido!')
        }
        if(!this.state.password){
            errors.push('Por favor, informe a sua senha!')
        }
        
        return errors;
    };

    submit = async() => { 
        const errors = this.validate();
        if(errors.length>0){
            errors.forEach((message,index)=>{
                showErrorMessage(message)
            });
            return false;
        }
        await this.service.create({
      name: this.state.name,
      email:this.state.email,
      password: this.state.password,


    }).then(response =>{
        showSuccessMessage("Usuário Cadastrado com Sucesso!");
        localStorage.setItem('loggedUser', JSON.stringify(response.data));
        console.log(response);
        this.props.history.push(`/home/`);
    }).catch(error =>{
      console.log(error.response)
    });
    console.log("request finished");
    }


    render() {

        return (
            <div className='Register-Screen'>
                <h1>Cadastro</h1>
                <h2>Já possui uma conta? <a href="http://localhost:3000/">clique aqui</a> para fazer Login</h2>

                 <div className='labels'>
                   <FormGroup label='Nome ' htmlFor='lab01'>
                        <input className="form-control" type="text" id="lab01"
                        onChange={(e) => { this.setState({name: e.target.value }) }} />
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
                    <Button  className="RegisterUser" onClick={this.submit}>
                        Cadastrar
                    </Button>
                 </div>
           

            </div>

        )

           
    }
}

export default withRouter(Register);