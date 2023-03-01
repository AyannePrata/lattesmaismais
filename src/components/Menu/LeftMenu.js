import React from "react";
import './LeftMenu.css';
import { withRouter } from 'react-router-dom';

class LeftMenu extends React.Component {

    componentDidMount() {
        switch (window.location.href) {
            case 'http://localhost:3000/':
                break;
            case 'http://localhost:3000/scheduling':
                this.schedulingButton.classList.add('Underline');
                break;
            case 'http://localhost:3000/shedulingvalidation':
                this.doSchedulingButton.classList.add('Underline');
                break;
        }
    }

    home = () => {
        this.props.history.push("/");
    }

    impCurPage = () => {

    }

    toSchedValidation = () => {
        this.props.history.push("/shedulingvalidation")
    }
    // listagem de agendamentos
    schedulings = () => {
        this.props.history.push("/scheduling");
    }

    versionsPage = () => {

    }

    exportPage = () => {

    }

    logout = () => {

    }

    render() {
        return (
            <div className="ScheduleValidation01">
                <h1 onClick={this.home}>Lattes</h1>
                <h2>+ +</h2>
                <div className="AllButtons">
                    <button type="importresume" ref={(button) => { this.impButton = button }}
                        className="b1" onClick={this.impCurPage}>Importar currículo</button>
                    <button type="schedulevalidation" ref={(button) => { this.doSchedulingButton = button }}
                        className="b2" onClick={this.toSchedValidation}>Agendar validação</button>
                    <button type="Schedulings" ref={(button) => { this.schedulingButton = button }}
                        className="b3" onClick={this.schedulings}>Agendamentos</button>
                    <button type="versions" ref={(button) => { this.versionsButton = button }}
                        className="b4" onClick={this.versionsPage}>Versões</button>
                    <button type="export" ref={(button) => { this.exportButton = button }}
                        className="b5" onClick={this.exportPage}>Exportar</button>
                    <button type="goout" ref={(button) => { this.exitButton = button }}
                        className="b6" onClick={this.logout}>Sair</button>
                </div>
                <div className="Fields Area"></div>
                <div className="Fields Image"></div>
            </div>
        )
    }
}

export default withRouter(LeftMenu);