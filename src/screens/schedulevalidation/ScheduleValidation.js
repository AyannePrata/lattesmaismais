import React from 'react';
import './ScheduleValidation.css';

import FormGroup from "../../components/FormGroup/FormGroup";
import LeftMenu from '../../components/Menu/LeftMenu';
import SchedulingService from "../../services/SchedulingService";
import { withRouter } from 'react-router';

class ScheduleValidation extends React.Component {

    state = {
        version:"",
        requesterId:"",
        validatorId:"",
        address:"",
        date:"",
        time:"",
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }

    viewScheduling = () => {
        console.log("funcionou")
        //this.props.history.push("/scheduling");
    }

    post = () => {
        this.service.create(
            {
                version:this.state.version,
                requesterId:this.state.requesterId,
                validatorId:this.state.validatorId,
                date:this.state.date,
                time:this.state.time,
                address:this.state.address,
                status:"OPEN"
            }
            ) .then( response =>
                {
                    // Adicionar mensagem de sucesso
                    console.log("Cadastrado com sucesso!!");
                }
                ).catch(error =>
                    {
                        console.log(error.response);
                    }
                    );
    }

    render() {
        return(
            <div className= "Principal">
                
                <LeftMenu></LeftMenu>

                <div className="Fields">
                    <div className='header'>
                        <h3>Selecione uma versão do currículo, o validador, o horário e a data</h3>
                        <button onClick={this.post} type="toschedule" className="b7">Agendar</button>
                    </div>
                    <div>
                    <FormGroup label='Versão ' htmlFor='lab01'>
                        <input className="form-control" type="text" id="lab01" placeholder='É atributo "único" no DB'
                        onChange={(e) => {this.setState({version: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='ID do requisitante ' htmlFor='lab02'>
                        <input className="form-control" type="number" id="lab02" placeholder='Registrado no DB --> 1'
                        onChange={(e) => {this.setState({requesterId: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='ID do validador ' htmlFor='lab03'> 
                        <input className="form-control" type="number" id="lab03" placeholder='Registrado no DB --> 2'
                        onChange={(e) => {this.setState({validatorId: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Endereço ' htmlFor='lab04'>
                        <input className="form-control" type="text" id="lab04"
                        onChange={(e) => {this.setState({address: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Data ' htmlFor='lab05'>
                        <input className="form-control" type="date" id="lab05"
                        onChange={(e) => {this.setState({date: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Horário ' htmlFor='lab06'>
                        <input className="form-control noMargin" type="time" id="lab06"
                        onChange={(e) => {this.setState({time: e.target.value})}}/>
                    </FormGroup>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default withRouter(ScheduleValidation);
