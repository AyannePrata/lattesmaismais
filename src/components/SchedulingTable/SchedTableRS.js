import React from "react";
import { Table } from "reactstrap";

function SchedTableRS(props) {

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
                <td>{scheduling.status}</td>
                <td>
                    <button type="button" title="Cancel" className="btn btn-danger"
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
                    <th>#</th>
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
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );


}
export default SchedTableRS;