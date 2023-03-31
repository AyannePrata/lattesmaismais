import React from 'react';
import './UpdateVersions.css';
import VersionService from '../../services/VersionsService';
import img7 from '../../assets/images/ComeBack.svg';
import img8 from '../../assets/images/WithoutProof.svg';
import img9 from '../../assets/images/Waiting.svg';
import img10 from '../../assets/images/Proven.svg';
import img11 from '../../assets/images/Invalidated.svg';
import img12 from '../../assets/images/Save.svg';

import { Button } from 'reactstrap';
import { withRouter } from 'react-router';

class Versions extends React.Component {

    state = {
        id: "",
        entryCount: "",
        ownerName: "",
        ownerId: "",
        entryList: "",
    }

    constructor() {
        super();
        this.service = new VersionService();
    }
    
    findById = (curriculumId) => {
        this.service.find(curriculumId)
        .then(response => {
            const curriculum = response.data;

            this.setState({
                id: curriculum.id,
                entryCount: curriculum.entryCount,
                ownerName: curriculum.ownerName,
                ownerId: curriculum.ownerId,
                entryList: curriculum.entryList
            });
        }).catch(error => {
            console.log(error.response);
        });
    }
    
    componentDidMount() {
        // const params = this.props.match.params;
        // this.findById(id);
    }

    render() {
        
        return (
            <div className="Versions01">
                <h1>Danilo de Sousa Costa</h1>
                <h2>(0 Competências)</h2>
                <h3>Primeira Versão do Currículo</h3>
                {/* 
                <h4>Sem Comprovante</h4>
                <h5>Aguardando Validação</h5>
                <h6>Comprovado por Validador</h6>
                <h7>Invalidado</h7>
                <h8>V_12345</h8>

                <Button onClick={this.home}  color="primary" size="lg" className="ComeBack">
                    <img id="ico-comeBack" className="Button-ComeBack" border="0" src={img7} width="70" height="70" />
                </Button>
                <Button color="primary" size="lg" className="Save">
                    <img id="ico-Save" className="Button-Save" border="0" src={img12} width="40" height="40" />
                </Button>
                <Button color="primary" size="lg" className="Validator-authentication">
                    (+) Auten. Validador
                </Button>
                <Button color="primary" size="lg" className="Electronic-authentication">
                    (+) Auten. Eletrônica
                </Button>
                
                <div className="boxExperiences">
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                    <p> aggdhgdkfgkfdgkjdkafkj</p>
                    <p>khfgehgfiikefh</p>
                    <p>jeufhejiwhfjeigf</p>
                </div>

                <img id="ico-WithoutProof" className="Button-WithoutProof" border="0" src={img8} width="40" height="40" />
                <img id="ico-Waiting" className="Button-Waiting" border="0" src={img9} width="40" height="40" />
                <img id="ico-Proven" className="Button-Proven" border="0" src={img10} width="40" height="40" />
                <img id="ico-Invalidated" className="Button-Invalidated" border="0" src={img11} width="30" height="30" /> */}
            </div>

               

                
               

        )
    }

}

export default withRouter(Versions);