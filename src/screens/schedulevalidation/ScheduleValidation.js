import React from 'react';
import './ScheduleValidation.css';

import SchedulingService from "../../services/SchedulingService";
import VersionsService from '../../services/VersionsService';
import UserApiService from '../../services/UserApiService';
import AuthenticationApiService from '../../services/AuthenticationApiService';

import { withRouter } from 'react-router';

import LeftMenu from '../../components/Menu/LeftMenu';
import { Button } from 'reactstrap';

import CurriculumTableRS from '../../components/SchedulingTable/CurriculumTableRS';
import ValidatorTableRS from '../../components/SchedulingTable/ValidatorTableRS';

import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";

class ScheduleValidation extends React.Component {

    state = {
        curriculumSelected: null,
        validatorSelected: null,
        dateSelected: null,
        timeSelected: null,

        curriculumList: [],
        validatorList: [],
    }

    constructor() {
        super();
        this.schedulingService = new SchedulingService();
        this.curriculumService = new VersionsService();
        this.userService = new UserApiService();
        this.authService = new AuthenticationApiService();
    }
    
    componentDidMount() {

        this.buttonSolSched.disabled = true;
        this.buttonSolSched.classList.add("Change-box-shadow");

        this.curriculumService.findAllByUserId(this.authService.getLoggedUser().id)
        .then(response => {
            this.setState({curriculumList: response.data});
        }).catch(error => {
            console.log(error);
        });

        this.userService.findAllByRole("role_validator")
        .then(response => {
            this.setState({validatorList: response.data.filter(validator => validator.id != this.authService.getLoggedUser().id)});
        }).catch(error => {
            console.log(error);
        })
    }

    inputVersionSelected = (version) => {
        this.setState({curriculumSelected: version}, () => this.verifyFields());
    }

    inputValidatorSelected = (validator) => {
        this.setState({validatorSelected: validator}, () => this.verifyFields());
    }

    inputDateSelected = (date) => {
        this.setState({dateSelected: date}, () => this.verifyFields());
    }

    inputTimeSelected = (time) => {
        this.setState({timeSelected: time}, () => this.verifyFields());
    }

    post = () => {
        
        this.schedulingService.create(
            {
                date: this.state.dateSelected,
                time: this.state.timeSelected,
                address: "Rua Ainda Falta Colocar Atributo em User Validador",
                version: this.state.curriculumSelected.version,
                validatorId: this.state.validatorSelected.id,
                requesterId: this.authService.getLoggedUser().id,
            }
        ).then(response => {
            showSuccessMessage("Agendamento solicitado!");
        }).catch(error => {
            showErrorMessage("Algo deu errado na solicitação!");
            console.log(error.response);
        });
    }

    verifyFields = () => {
        const curriculum = this.state.curriculumSelected;
        const validator = this.state.validatorSelected;
        const date = this.state.dateSelected;
        const time = this.state.timeSelected;

        if(curriculum !== null && validator !== null && date !== null && time !== null) {
            this.buttonSolSched.disabled = false;
            this.buttonSolSched.classList.remove("Change-box-shadow");
        }
    }

    render() {
        return (
            <div className="Principal">
                <LeftMenu />
                <div className="Fields">
                    <div className='Validation'>
                        <div className='header'>
                            <h3>Selecione uma versão do currículo, o validador, o horário e a data</h3>
                            <Button onClick={() => this.post()} innerRef={elem => this.buttonSolSched = elem} color='primary' size='lg' className='ButtonScheduling'> SOLICITAR AGENDAMENTO </Button>
                        </div>
                        <br/>
                        <br/>
                        <div className='TablesDiv'>
                            <div className='overFlow-y'>
                                <CurriculumTableRS curriculums={this.state.curriculumList} versionSelected={this.inputVersionSelected} className="CurrTable" id="curricTable01" />
                            </div>
                            <div className='overFlow-y'>
                                <ValidatorTableRS validators={this.state.validatorList} validatorSelected={this.inputValidatorSelected} className="ValidatorTable" id="validtb01" />
                            </div>
                            <div className='DateAndHour'>
                                <label htmlFor='date01'>Selecione a data
                                <br/> 
                                <input type='date' id='date01' onChange={(e) => this.inputDateSelected(e.target.value)} /> 
                                </label>
                                <br/>
                                <br/>
                                <label htmlFor='hour01'>Selecione o horário
                                <br/>
                                <input type='time' id='hour01' onChange={(e) => this.inputTimeSelected(e.target.value)} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(ScheduleValidation);