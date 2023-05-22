import React from 'react';
import './ScheduleValidation.css';

import FormGroup from "../../components/FormGroup/FormGroup";
import SchedulingService from "../../services/SchedulingService";
import { withRouter } from 'react-router';

import LeftMenu from '../../components/Menu/LeftMenu';
import { Button } from 'reactstrap';

import CurriculumTableRS from '../../components/SchedulingTable/CurriculumTableRS';
import ValidatorTableRS from '../../components/SchedulingTable/ValidatorTableRS';

class ScheduleValidation extends React.Component {

    state = {
        curriculumSelected: null,
        validator: null,
        date: null,
        time: null,

        curriculumList: [
            {
                id: 1,
                description: "Currículo inicial",
                version: "V_120323_130001",
                lastModification: "18/09/2023 - 09:34:02",
            },
            {
                id: 2,
                description: "Currículo para mandar para IF",
                version: "V_140323_130022",
                lastModification: "19/09/2023 - 09:30:22",
            },
            {
                id: 3,
                description: "Currículo para vaga na empresa TAL",
                version: "V_130323_130033",
                lastModification: "20/09/2023 - 09:44:12",
            },
        ],
        validatorList: [
            {
                id: 1,
                name: "Danilo de Sousa Costa",
                email: "dansousac2@gmail.com",
            },
            {
                id: 2,
                name: "Ayanne Prata",
                email: "ayanneP@gmail.com",
            },
            {
                id: 3,
                name: "Keilla Felipe Vitória",
                email: "keillaV@gmail.com",
            },
        ],
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }
    //TODO pegar automaticamente o id do user logado
    componentDidMount() {

    }

    inputVersionSelected = (value) => {
        this.setState({curriculumSelected: value});
    }

    inputValidatorSelected = (validator) => {
        this.setState({validator: validator});
    }

    inputDateSelected = (date) => {
        this.setState({date: date});
    }

    inputTimeSelected = (time) => {
        this.setState({time: time});
    }

    post = () => {
        
        this.service.create(
            {
                date: this.state.date,
                time: this.state.time,
                address: "Rua Ainda Falta Colocar Atributo em User Validador",
                version: this.state.curriculumSelected.version,
                validatorId: this.state.validator.id,
                //TODO pegar automaticamente ID do USER logado
                requesterId: 100,
            }
        ).then(response => {
            // Adicionar mensagem de sucesso
            console.log("Cadastrado com sucesso!!");
        }).catch(error => {
            console.log(error.response);
        });
    }

    render() {
        return (
            <div className="Principal">
                <LeftMenu />
                <div className="Fields">
                    <div className='Validation'>
                        <div className='header'>
                            <h3>Selecione uma versão do currículo, o validador, o horário e a data</h3>
                            <Button onClick={() => this.post()} color='primary' size='lg' className='ButtonScheduling'> Solicitar Agendamento </Button>
                        </div>
                        <br/>
                        <br/>
                        <div className='TablesDiv'>
                            <div className='overFlow-y'>
                                <CurriculumTableRS curriculumns={this.state.curriculumList} versionSelected={this.inputVersionSelected} className="CurrTable" id="curricTable01" />
                            </div>
                            <div className='overFlow-y'>
                                <ValidatorTableRS validators={this.state.validatorList} validatorSelected={this.inputValidatorSelected} className="ValidatorTable" id="validtb01" />
                            </div>
                            <div className='DateAndHour'>
                                <label htmlFor='date01'>Selecione a data: <input type='date' id='date01' onChange={(e) => this.inputDateSelected(e.target.value)} /> </label>
                                <br/>
                                <br/>
                                <label htmlFor='hour01'>Selecione o horário: <input type='time' id='hour01' onChange={(e) => this.inputTimeSelected(e.target.value)} /> </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(ScheduleValidation);