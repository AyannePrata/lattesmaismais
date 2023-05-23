import React from 'react';
import './ScheduleValidation.css';

import SchedulingService from "../../services/SchedulingService";
import VersionsService from '../../services/VersionsService';
import UserApiService from '../../services/UserApiService';

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

        curriculumList: [],
        validatorList: [],
    }

    constructor() {
        super();
        this.schedulingService = new SchedulingService();
        this.curriculumService = new VersionsService();
        this.userService = new UserApiService();
    }
    
    componentDidMount() {
        //TODO pegar id altomaticamente do User logado
        this.curriculumService.findAllByUserId(100)
        .then(response => {
            this.setState({curriculumList: response.data});
        }).catch(error => {
            console.log(error);
        });

        this.userService.findAllByRole("VALIDATOR")
        .then(response => {
            this.setState({validatorList: response.data});
        }).catch(error => {
            console.log(error);
        })
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
        
        this.schedulingService.create(
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