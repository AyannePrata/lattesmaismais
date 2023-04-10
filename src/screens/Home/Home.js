import React from 'react';
import './Home.css';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import FileUpload from '../../components/FormGroup/FileUpload';
import HomeService from '../../services/HomeService';

class Home extends React.Component {
    
    constructor() {
        super();
        this.service = new HomeService();
    }

    schedulings = () => {
        this.props.history.push("/scheduling");
    }
    home = () => {
        this.props.history.push("/home");
    }

    sendFile = async (file) => {
        // com o arquivo do campo input, passamos para um formData que é o tipo usado para multipart
        const data = new FormData();
        data.append('file', file);
        data.append('userId', 1); // "1" para exemplo. //TODO implementar lógica de pegar o ID do usuário

        this.service.postWithHeaders(data)
            .then(response => {
                this.props.history.push(`/updateversions/${response.data.id}`);
            }).catch(erro => {
                console.log(erro.response);
            });
    }

    render() {
        return (
            <div className='Principal Fields'>
                <div className='Text-Home'>
                    <p>PARA COMEÇAR VOCÊ PODE:</p>
                    <p>- Importe um novo currículo XML criado na plataforma Lattes, através do botão "IMPORTAR"</p>
                    <p>OU</p>
                    <p id='p-final'>- Escolha uma versão no histórico de "Versões"</p>
                    
                </div>
                <FileUpload accept=".xml" toSendAttribute={this.sendFile}/>

                <div className='Popup-confirmation'>
                    <div className='Popup'>
                        <div className='Popup-content' >
                            <h2>Confirmação de Identidade do Currículo Importado</h2>
                             <h3>DANILO DE SOUSA COSTA</h3>
                             <h4>Confirma?</h4>
                            
                             <Button onClick={this.schedulings} color="primary" size="lg" className="Confirmation">
                                Sim, sou eu
                            </Button>
                            <Button onClick={this.home} color="danger" size="lg" className="ImportAnother">
                                Cancelar
                            </Button>


                         </div>

    

                    </div>
                </div>
               
            </div>
        )
    }
}

export default withRouter(Home);

