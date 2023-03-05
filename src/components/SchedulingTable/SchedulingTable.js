import React from "react";

export default props => {

    const rows = props.schedulings.map( scheduling => {

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
                    <button type="button" title="Exclude" className="btn btn-danger"
                        onClick={e => props.delete(scheduling.id)}>
                        Excluir
                    </button>
                </td>
            </tr>
        )
    });

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">- ID -</th>
                    <th scope="col">- Versão -</th>
                    <th scope="col">- ID do Requisitante -</th>
                    <th scope="col">- Data -</th>
                    <th scope="col">- Horário -</th>
                    <th scope="col">- ID do Validador -</th>
                    <th scope="col">- Local -</th>
                    <th scope="col">- Status -</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}