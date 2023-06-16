import React from "react";
import { Table } from "reactstrap";
import { showErrorMessage } from "../Toastr/Toastr";

function getStatus(status) {
    switch (status) {
        case "OPEN":
            return "aberta";
        
        case "ACCEPTED":
            return "aceita";

        case "DECLINED":
            return "recusada";
            
        case "DONE":
            return "finalizada";
    
        default:
            showErrorMessage("Encontrada solicitação com status não referenciado");
            break;
    }
}

function SchedTableRS(props) {

    let hiddenButton;

    const rows = props.schedulings.map(scheduling => {

        return (
            <tr key={scheduling.id}>
                <td>{scheduling.id}</td>
                <td>{scheduling.version}</td>
                <td>{scheduling.requesterId}</td>
                <td>{scheduling.date}</td>
                <td>{scheduling.time}</td>
                <td>{scheduling.validatorId}</td>
                <td>{scheduling.address}</td> 
                <td>{getStatus(scheduling.status)}</td>
                <td>
                    <button type="button" title="Cancel" className="btn btn-danger" hidden={scheduling.status === "DONE"}
                        onClick={e => props.delete(scheduling.id)}>
                            Cancelar
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <Table striped bordered id={props.id}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Versão</th>
                    <th>ID do Requisitante</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>ID do Validador</th>
                    <th>Local</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );


}
export default SchedTableRS;