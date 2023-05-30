import React from "react";
import './LeftMenu.css';
import { withRouter } from 'react-router-dom';

import img1 from '../../assets/images/import.svg';
import img2 from '../../assets/images/calendar.svg';
import img3 from '../../assets/images/clipboard.svg';
import img4 from '../../assets/images/history.svg';
import img5 from '../../assets/images/export.svg';
import img6 from '../../assets/images/off.svg';
import iconSolSched from '../../assets/images/SolicitedScheduling.svg';
import iconHaveSol from '../../assets/images/haveSolicitaions.svg';

import AuthenticationApiService from "../../services/AuthenticationApiService";
import SchedulingService from "../../services/SchedulingService";
import StorageService from "../../services/StorageService";

export const ROLE = "user_role";
export const TIMESTAMP = "timestamp";
export const SOLICITATIONLIST = "solicitationlist";
export const FORCEGETSOLICITATIONS = "forcegetsolicitations";
/** 
 * constante usada para carregar solicitações de agendamento no tempo determinado
 * 300000 ms = 5min
*/ 
const msToVerifySolicitations = 300000;

class LeftMenu extends React.Component {

    state = {
       isValidator: false,
       haveSolicitationsToResolve: false,
       solicitationList: [],
    }

    constructor() {
        super();
        this.authentService = new AuthenticationApiService();
        this.schedulingService = new SchedulingService();
        this.storageService = new StorageService();
    }

    componentDidMount() {

        const url = window.location.href;

        if (url === "http://localhost:3000/home") {
            this.impButton.classList.add('Underline');

        } else if (url === "http://localhost:3000/scheduling") {
            this.schedulingButton.classList.add('Underline');

        } else if (url === "http://localhost:3000/shedulingvalidation") {
            this.doSchedulingButton.classList.add('Underline');

        } else if (url.toLowerCase().includes("3000/updateversions") || url == "http://localhost:3000/versionlisting") {
            this.versionsButton.classList.add('Underline');
        
        } else if (url === "http://localhost:3000/solicitedschedule") {
            this.solicitationButton.classList.add('Underline');
        }
        
        this.verifyRoles();
    }

    verifyRoles = async() => {
        if(this.authentService.getLoggedUser().validatorAddress != null) {
            
            this.setState({isValidator: true});

            if(this.getInDb()) {
                await this.schedulingService.findAllByUserId(this.authentService.getLoggedUser().id, true)
                .then(response => {
                    this.setState({
                        solicitationList: response.data,
                    });
                    this.storageService.setItem(ROLE, 1);
                    this.storageService.setItem(TIMESTAMP, new Date());
                    this.storageService.setItem(SOLICITATIONLIST, response.data);
                }).catch(error => {
                    alert("Ocorreu um erro ao tentar carregar lista de solicitações de validação!");
                    console.log(error);
                });

                this.verifySolicitations();
            } else {
                this.setState({
                    solicitationList: this.storageService.getItem(SOLICITATIONLIST),
                }, () => this.verifySolicitations())
            }
        }
    }

    /**
     * se não houver registro no localStorage ou se tiverem passados 5min desde a última aualização,
     * deve retornar TRUE
     */
    getInDb = () => {
        if(this.storageService.getItem(ROLE) == undefined || this.storageService.getItem(FORCEGETSOLICITATIONS)) {
            this.storageService.setItem(FORCEGETSOLICITATIONS, false);
            return true;
        } else {
            const timeSaved = new Date(this.storageService.getItem(TIMESTAMP));
            // verifica se passaram-se determinados minutos desde a última verificação
            if(new Date().getTime() > timeSaved.getTime() + msToVerifySolicitations) {
                return true;
            }
            return false;
        }
    }

    verifySolicitations = () => {
        for(const solicitation of this.state.solicitationList) {
            if(solicitation.status === "OPEN") {
                this.setState({haveSolicitationsToResolve: true});
                return;
            }
        }
    }

    home = () => {
        this.props.history.push("/home");
    }

    impCurPage = () => {
        this.props.history.push("/home");
    }

    toSchedValidation = () => {
        this.props.history.push("/shedulingvalidation")
    }
    // listagem de agendamentos
    schedulings = () => {
        this.props.history.push("/scheduling");
    }

    versionsPage = () => {
        this.props.history.push("/versionlisting");
    }

    exportPage = () => {

    }

    solicitedSchedule = () => {
        this.props.history.push("/solicitedschedule");
    }

    logout = () => {
        this.authentService.logout()
            .then(() => {
                this.props.history.push("/");
            }).catch(error => {
                alert("(!) A sessão não pode ser encerrada (!)")
                console.log(error);
            })
    }

    render() {
        return (
            <div className="ScheduleValidation01">
                <h1 onClick={this.home}>Lattes</h1>
                <h2>+ +</h2>
                <h5 id="name-owner">{this.authentService.getLoggedUser().name}</h5>
                <div className="AllButtons">
                    <button ref={(button) => { this.impButton = button }}
                        className="b1" onClick={this.impCurPage}>
                        <img id="ico-menu-01" className="Button-icon" border="0" src={img1} width="50" height="50" />
                        Importar currículo
                    </button>
                    <button ref={(button) => { this.doSchedulingButton = button }}
                        className="b2" onClick={this.toSchedValidation}>
                        <img id="ico-menu-02" className="Button-icon" border="0" src={img2} width="40" height="40" />
                        Agendar validação
                    </button>
                    <button ref={(button) => { this.schedulingButton = button }}
                        className="b3" onClick={this.schedulings}>
                        <img id="ico-menu-03" className="Button-icon" border="0" src={img3} width="50" height="50" />
                        Agendamentos
                    </button>
                    <button ref={(button) => { this.versionsButton = button }}
                        className="b4" onClick={this.versionsPage}>
                        <img id="ico-menu-04" className="Button-icon" border="0" src={img4} width="40" height="40" />
                        Versões
                    </button>
                    <button ref={(button) => { this.exportButton = button }}
                        className="b5" onClick={this.exportPage}>
                        <img id="ico-menu-05" className="Button-icon" border="0" src={img5} width="50" height="50" />
                        Exportar
                    </button>
                    <div className="Size-SolSched"  hidden={!this.state.isValidator}>
                        <button id="buttonSSV" className="b6" onClick={() => this.solicitedSchedule()} ref={button => this.solicitationButton = button}>
                            <img id="ico-menu-07" className="Button-icon" border="0" src={iconSolSched} width="45" height="45" />
                            Solicitações de Agendamento
                        </button>
                        <img id="icoHaveSol" src={iconHaveSol} border="0" width="25" height="25" hidden={!this.state.haveSolicitationsToResolve} title="Você possui solicitações abertas!" />
                    </div>
                    <button className="b6" onClick={this.logout}>
                        <img id="ico-menu-06" className="Button-icon" border="0" src={img6} width="40" height="40" />
                        Sair
                    </button>
                </div>
                <div className="Fields Area"></div>
                <div className="Fields Image"></div>
            </div>
        )
    }
}

export default withRouter(LeftMenu);