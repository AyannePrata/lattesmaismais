import React from 'react';
import './Home.css';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import FileUpload from '../../components/FormGroup/FileUpload';
import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";

import HomeService from '../../services/HomeService';
import AuthenticationApiService from '../../services/AuthenticationApiService';

import LeftMenu from '../../components/Menu/LeftMenu';
import PopupSpace from '../../components/FormGroup/PopupSpace';

class Home extends React.Component {

    constructor() {
        super();
        this.service = new HomeService();
        this.authentication = new AuthenticationApiService();
    }

    state = {
        curriculumIdentity: "",
        renderCurriculumConfirmation: false,
        file: null,
    }

    updateVersions = () => {
        this.props.history.push("/updateVersions/1");
    }

    home = () => {
        this.props.history.push("/home");
    }

    sendFile = async () => {
        this.setState({renderCurriculumConfirmation: false});
        // com o arquivo do campo input, passamos para um formData que é o tipo usado para multipart
        const data = new FormData();
        data.append('file', this.state.file);
        data.append('userId', this.authentication.getLoggedUser().id);

        this.service.postWithHeaders(data)
        .then(response => {
            this.props.history.push(`/updateversions/${response.data}`);
        }).catch(erro => {
            console.log(erro.response);
        });
    }

    VerifyIdentity = (file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            const stringXml = e.target.result;
            var parser = new DOMParser();
            var docXml = parser.parseFromString(stringXml, "text/xml");

            const owner = docXml.querySelector("DADOS-GERAIS").attributes.getNamedItem("NOME-COMPLETO").value;
            if(owner === null || owner === undefined) {
                showErrorMessage('Currículo inválido! Reveja o arquivo enviado!');
            } else {
                this.setState({
                    owner: owner,
                    renderCurriculumConfirmation: true,
                    file: file,
                });
            }
        }
    }

    cancelImportCurriculum = () => {
        this.setState({
            owner: "",
            renderCurriculumConfirmation: false,
            file: null,
        })
    }

    render() {
        return (
            <div className='Principal Fields'>
                <LeftMenu/>
                <div className='Text-Home'>
                    <p>PARA COMEÇAR VOCÊ PODE:</p>
                    <p>- Importar um novo currículo XML, criado na plataforma Lattes, através do botão "IMPORTAR"</p>
                </div>
                <FileUpload accept=".xml" toSendAttribute={this.VerifyIdentity} />

                <PopupSpace render={this.state.renderCurriculumConfirmation} className="Popup-home">
                    <h2 className='Center' >Confirmação de identidade do currículo importado</h2>
                    <br/>
                    <h2 className='Center NameOwner' >{this.state.owner}</h2>
                    <br/>
                    <br/>
                    <h2 className='Center'>Confirma?</h2>
                    <div className='Buttons-home-confimation'>
                        <Button color='primary' size='lg' onClick={() => this.sendFile()}>SIM, SOU EU!</Button>
                        <Button color='danger' size='lg' onClick={() => this.cancelImportCurriculum()}>NÃO, CANCELAR!</Button>
                    </div>
                </PopupSpace>
            </div>
        )
    }
}

export default withRouter(Home);

