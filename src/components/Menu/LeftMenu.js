import React from "react";
import './LeftMenu.css';
import { withRouter } from 'react-router-dom';

class LeftMenu extends React.Component {
    home = () => {
        this.props.history.push("/");
    }
    
    impCurPage = () => {
        
    }

    schedValidPage = () => {
        
    }
    
    schedPage = () => {
        this.props.history.push("/scheduling");
    }
    
    versionsPage = () => {
       
    }

    exportPage = () => {
       
    }
   
    logout = () => {
       
    }

    render() {
        return(
            <div className= "ScheduleValidation01">
                    <h1 onClick={this.home}>Lattes</h1>
                    <h2>++</h2>
                    <button type="importresume" className="b1" onClick={this.impCurPage}>Importar currículo</button>
                    <button type="schedulevalidation" className="b2" onClick={this.schedValidPage}>Agendar validação</button>
                    <button type="Schedulings" className="b3" onClick={this.schedPage}>Agendamentos</button>
                    <button type="versions" className="b4" onClick={this.versionsPage}>Versões</button>
                    <button type="export" className="b5" onClick={this.exportPage}>Exportar</button>
                    <button type="goout" className="b6" onClick={this.logout}>Sair</button>
                </div>
        )
    }
}

export default withRouter(LeftMenu);