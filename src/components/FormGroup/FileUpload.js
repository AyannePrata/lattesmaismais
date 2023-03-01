import React, { useRef } from "react";
import { Button } from 'reactstrap';
import './FormGroup.css';

function FileUpload(props) {
    // valor inicial nulo - quardamos o input aqui.
    const inputRef = useRef(null);

    const sendAttribute = e => {
        props.toSendAttribute(e);
    }

    return (
        <div className="File-upload">
            <input type="file" accept={props.accept} ref={inputRef}
                onChange={e => sendAttribute(e.target.files[0])}/>
            <Button color="primary" size="lg" className="Button-up"
                onClick={() => inputRef.current.click()}>IMPORTAR</Button>
        </div>
    );

}
export default FileUpload;