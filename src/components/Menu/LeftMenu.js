import React from "react";
import './LeftMenu.css';
import { withRouter } from 'react-router-dom';

export default class LeftMenu extends React.Component {
    
    print = () => {
        console.log("ok");
        this.props.history.push("/scheduling");
    }

    render() {
        return(
            <div className= "ScheduleValidation01">
                    <h1>Lattes</h1>
                    <h2>++</h2>
                    <button type="importresume" className="b1">Importar currículo</button>
                    <button type="schedulevalidation" className="b2">Agendar validação</button>
                    <button onClick={this.print} type="Schedulings" className="b3">Agendamentos</button>
                    <button type="versions" className="b4">Versões</button>
                    <button type="export" className="b5">Exportar</button>
                    <button type="goout" className="b6">Sair</button>
                </div>
        )
    }
}

//export default withRouter(LeftMenu);