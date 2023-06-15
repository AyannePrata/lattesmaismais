import React from "react";
import { Table } from "reactstrap";

function CurriculumTableRS(props) {

    const rows = props.curriculums.map(curriculum => {
        
        const modificationDate = curriculum.lastModification.substring(0, 10);

        return (
            <tr key={curriculum.id}>
                <td>{curriculum.description}</td>
                <td>{`Alterado em: ${modificationDate}`}</td>
                <td>
                    <input type="radio" name="group1" onClick={() => props.versionSelected(curriculum)}/>
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
export default CurriculumTableRS;