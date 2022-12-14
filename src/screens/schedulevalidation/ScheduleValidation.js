import React from 'react';
import './ScheduleValidation.css';

import FormGroup from "../../components/FormGroup";
import SchedulingService from "../../services/SchedulingService";

export default class ScheduleValidation extends React.Component {

    state = {
        version:"",
        validator:"",
        date:"",
        time:""
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }

    post = () => {
        this.service.create(
            {
               name: this.state.name,
               validator: this.state.validator,
               date: this.state.date,
               time: this.state.time
            }
       ) .then( response =>
           {
                // Adicionar mensagem de sucesso
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

                    <button type="importresume" class="b1">Importar currículo</button>
                    <button type="schedulevalidation" class="b2">Agendar validação</button>
                    <button onClick={this.viewScheduling} type="Schedules" class="b3">Agendamentos</button>
                    <button type="versions" class="b4">Versões</button>
                    <button type="export" class="b5">Exportar</button>
                    <button type="goout" class="b6">Sair</button>
                </div>

                <div className="Fields">
                <h3>Selecione uma versão do currículo, o validador, o horário e a data</h3>
                <button onClick={this.post} type="toschedule" class="b7">Agendar</button>
                
                    <FormGroup label='Versão' htmlFor='lab01'>
                        <input className="form-control" type="text" id="lab01"
                        onChange={(e) => {this.setState({version: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Validador' htmlFor='lab02'>
                        <input className="form-control" type="text" id="lab02"
                        onChange={(e) => {this.setState({validator: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Data' htmlFor='lab01' className="FieldSetSc">
                        <input className="form-control noMargin" type="date" id="lab01"
                        onChange={(e) => {this.setState({date: e.target.value})}}/>
                    </FormGroup>
                    <FormGroup label='Horário' htmlFor='lab02' className="FieldSetSc">
                        <input className="form-control noMargin" type="time" id="lab02"
                        onChange={(e) => {this.setState({time: e.target.value})}}/>
                    </FormGroup>

                </div>
            </div>
            
        )
        
    }
}
