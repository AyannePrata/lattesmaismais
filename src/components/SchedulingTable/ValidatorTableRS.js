import React from "react";
import { Table } from "reactstrap";

function ValidatorTableRS(props) {

    const rows = props.validators.map(validator => {
        
        return (
            <tr key={validator.id}>
                <td>{validator.name}</td>
                <td>
                    <input type="radio" name="group2" onClick={() => props.validatorSelected(validator)} />
                </td>
            </tr>
        )
    })

    return (
        <Table striped id={props.id} className={props.className}>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );


}
export default ValidatorTableRS;