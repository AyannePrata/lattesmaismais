import React from 'react';
import './ScheduleValidation.css';

import FormGroup from "../../components/FormGroup";
import SchedulingService from "../../services/SchedulingService";

export default class ScheduleValidation extends React.Component {

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

    viewScheduling = () => {
        this.props.history.push("/scheduling/");
    }

    render() {
        return(
            <div className= "Principal">
                <div className= "ScheduleValidation01">
                    <h1>Lattes</h1>
                    <h2>++</h2>

                    <button type="importresume" className="b1">Importar currículo</button>
                    <button type="schedulevalidation" className="b2">Agendar validação</button>
                    <button onClick={this.viewScheduling} type="Schedules" className="b3">Agendamentos</button>
                    <button type="versions" className="b4">Versões</button>
                    <button type="export" className="b5">Exportar</button>
                    <button type="goout" className="b6">Sair</button>
                </div>

                <div className="Fields">
                <h3>Selecione uma versão do currículo, o validador, o horário e a data</h3>
                <button onClick={this.post} type="toschedule" className="b7">Agendar</button>
                
                    <FormGroup label='Versão' htmlFor='lab01'>
                        <input className="form-control" type="text" id="lab01" placeholder='É atributo "único" no DB'
                        onChange={(e) => {this.setState({version: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='ID do requisitante' htmlFor='lab02'>
                        <input className="form-control" type="number" id="lab02" placeholder='Registrado no DB --> 1'
                        onChange={(e) => {this.setState({requesterId: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='ID do validador' htmlFor='lab03'> 
                        <input className="form-control" type="number" id="lab03" placeholder='Registrado no DB --> 2'
                        onChange={(e) => {this.setState({validatorId: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Endereço' htmlFor='lab04'>
                        <input className="form-control" type="text" id="lab04"
                        onChange={(e) => {this.setState({address: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Data' htmlFor='lab05'>
                        <input className="form-control noMargin" type="date" id="lab05"
                        onChange={(e) => {this.setState({date: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Horário' htmlFor='lab06'>
                        <input className="form-control noMargin" type="time" id="lab06"
                        onChange={(e) => {this.setState({time: e.target.value})}}/>
                    </FormGroup>

                </div>
            </div>
            
        )
        
    }
}
