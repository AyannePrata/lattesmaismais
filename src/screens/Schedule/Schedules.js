import React from 'react';
import './Schedules.css';

export default class Schedules extends React.Component {

    render() {
        return(

            <div className= "Schedules01">
            <h1>Lattes</h1>
            <h2>++</h2>
            

            <button type="importresume" class="b1">Importar currículo</button>
            <button type="schedulevalidation" class="b2">Agendar validação</button>
            <button type="Schedules" class="b3">Agendamentos</button>
            <button type="versions" class="b4">Versões</button>
            <button type="export" class="b5">Exportar</button>
            <button type="goout" class="b6">Sair</button>
            
            
            </div>

        )

    }
}