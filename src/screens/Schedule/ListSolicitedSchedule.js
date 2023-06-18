import React from "react";
import { withRouter } from 'react-router';
import './ListSolicitedSchedule.css';
import { Button } from "reactstrap";

import LeftMenu from "../../components/Menu/LeftMenu";
import SchedulingCard from "../../components/Solicitations/SchedulingCard";
import PopupSpace from '../../components/FormGroup/PopupSpace';

import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";

import SchedulingService from "../../services/SchedulingService";
import StorageService from "../../services/StorageService";

import { FORCEGETSOLICITATIONS } from "../../components/Menu/LeftMenu";

class ListSolicitedSchedule extends React.Component {

    state = {
        renderPopup: false,
        textPrincipalPopup: "",
        ph: "",
        msgRequired: false,

        solicitationToUpdate: null,
        comment: "",
        newStatus: "",
    }

    constructor() {
        super();
        this.schedulingService = new SchedulingService();
        this.storageService = new StorageService();
    }

    openPopup = () => {
        this.setState({renderPopup: true});
    }

    closePopup = () => {
        this.setState({
            renderPopup: false,
            solicitationToUpdate: null,
            comment: "",
            newStatus: "",
        })
    }

    acceptSolicitation = (solicitation) => {
        this.setState({
            textPrincipalPopup: "Deseja enviar um comentário?",
            ph: "opcional",
            msgRequired: false,
            solicitationToUpdate: solicitation,
            newStatus: "ACCEPTED",
        });
        this.openPopup();
    }

    declineSolicitation = (solicitation) => {
        this.setState({
            textPrincipalPopup: "Informe o movito de não poder agendar",
            ph: "obrigatório",
            msgRequired: true,
            solicitationToUpdate: solicitation,
            newStatus: "DECLINED",
        });
        this.openPopup();
    }

    cancelScheduling = () => {
        this.closePopup();
    }

    confirmScheduling = () => {
        
        this.closePopup();

        this.schedulingService.update(
            {
                id: this.state.solicitationToUpdate.id,
                status: this.state.newStatus,
                returnedValidatorMessage: this.state.comment,
            }
        ).then(() => {
            this.storageService.setItem(FORCEGETSOLICITATIONS, true);
            showSuccessMessage("Resposta enviada! A página será atualizada.");
            window.location.reload();
        }).catch(error => {
            showErrorMessage("Ocorreu um erro na solicitação de resposta!");
            console.log(error);
            this.closePopup();
        });
    }

    render() {
        return (
            <div className="Principal ListSolicit">
                <LeftMenu/>
                <div className="Fields">
                    <SchedulingCard inAcceptSolicitation={this.acceptSolicitation} inDeclineSolicitation={this.declineSolicitation}/>
                </div>
                <PopupSpace render={this.state.renderPopup}>
                    <h2 id="titlePopup01" className='Center'>{this.state.textPrincipalPopup}</h2>
                    <h3 className="Basic-margin">Comentário</h3>
                    <textarea className="Basic-margin" maxLength={120} autoFocus={this.state.msgRequired} placeholder={this.state.ph} onChange={(e) => this.setState({ comment: e.target.value.trim() })}/>
                    <div className="Basic-margin Buttons Buttons-popup">
                        <Button color="primary" disabled={this.state.comment == "" && this.state.msgRequired} size="lg" onClick={() => this.confirmScheduling()}> CONFIRMAR </Button>
                        <Button color="danger" size="lg" onClick={() => this.cancelScheduling()}> CANCELAR </Button>
                    </div>
                </PopupSpace>
            </div>
        )
    }
}
export default withRouter(ListSolicitedSchedule);