import React from 'react';
import './Schedules.css';

import SchedulingTable from "../../components/SchedulingTable/SchedulingTable";
import SchedulingService from "../../services/SchedulingService";

export default class Schedules extends React.Component {

    state = {
        scheduling: []
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }

    find = () => {
        this.service.find('')
        .then( Response => {
            const scheduling = Response.data;
            this.setState({scheduling: scheduling});
            console.log(scheduling);
        }).catch( error => {
            console.log(error.Response)
        });
    }

    delete = (schedulingId) => {
        this.service.delete(schedulingId)
        .then( Response => {
            this.find();
        }).catch( error => {
            console.log(error.Response)
        });
    }

    scheduleValidation = () => {
        this.props.history.push("/scheduling/create");
    }

    componentDidMount() {
        this.find();
    }

    render() {
        return(

            <div className= "Principal">
                <div className= "ScheduleValidation01">
                    <h1>Lattes</h1>
                    <h2>++</h2>

                    <button type="importresume" className="b1">Importar currículo</button>
                    <button onClick={this.scheduleValidation} type="schedulevalidation" className="b2">Agendar validação</button>
                    <button type="Schedules" className="b3">Agendamentos</button>
                    <button type="versions" className="b4">Versões</button>
                    <button type="export" className="b5">Exportar</button>
                    <button type="goout" className="b6">Sair</button>
                </div>

                <div className="Fields">
                    <SchedulingTable schedulings={this.state.scheduling} delete={this.delete}/>
                </div>
            </div>
        )

    }
}