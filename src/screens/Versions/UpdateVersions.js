import React from 'react';
import './UpdateVersions.css';
import VersionService from '../../services/VersionsService';
import EntriesMap from '../../components/Curriculum/EntriesMap';

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
        entryList: [
            {
                "id": 1,
                "group": "Formação Acadêmica",
                "name": "> Instituto Federal de Educa��o, Ci�ncia e Tecnologia da Para�ba - IFPB> An�lise e Desenvolvimento de Sistemas> EM_ANDAMENTO> 2020> --",
                "receipts": null,
                "status": "WITHOUT_RECEIPT"
            },
            {
                "id": 2,
                "group": "Formação Acadêmica",
                "name": "> Universidade Federal de Campina Grande> Interdisciplinar em Educa��o No Campo> CONCLUIDO> 2010> 2014",
                "receipts": null,
                "status": "WITHOUT_RECEIPT"
            },
            {
                "id": 3,
                "group": "Formação Acadêmica",
                "name": "> Instituto Butantan> Controle de pragas e doenças> CONCLUIDO> 2015> 2017",
                "receipts": null,
                "status": "WITHOUT_RECEIPT"
            },
            {
                "id": 4,
                "group": "Atuação Profissional",
                "name": "> UMEIF Jos� Bonif�cio Barbosa de Andrade> 2013> 2014> --> Professor",
                "receipts": null,
                "status": "WITHOUT_RECEIPT"
            },
            {
                "id": 5,
                "group": "Atuação Profissional",
                "name": "> E.E.E.F.M. M�rio de Oliveira Chaves> 2016> 2016> --> Professor",
                "receipts": null,
                "status": "WITHOUT_RECEIPT"
            },
            {
                "id": 6,
                "group": "Atuação Profissional",
                "name": "> Centro Água Azul> 2018> 2019> --> Professor",
                "receipts": null,
                "status": "WITHOUT_RECEIPT"
            }
        ]
    }

    constructor() {
        super();
        this.service = new VersionService();
    }

    componentDidMount() {
        //TODO 
        // const params = this.props.match.params;
        // this.findById(id);
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

    render() {

        return (
            <div className='Fields F-update'>
                <div className='Name-and-entries'>
                    <h2>Danilo de Sousa Costa</h2>
                    <h4>(0 Competências)</h4>
                </div>
                <div className='Version-and-comment'>
                    <h2 id='versao-curriculo'>V_05112022_182432</h2>
                    <h4>Primeira Versão do Currículo</h4>
                </div>

                <div className='Save-return-buttons'>
                    <Button onClick={this.home} color="primary" size="lg" className="Bt-ComeBack-update">
                        <img id="ico-comeBack" className="Button-ComeBack" border="0" src={img7} width="80" height="30" />
                    </Button>
                    <Button color="primary" size="lg" className="Save">
                        <img id="ico-Save" className="Button-Save" border="0" src={img12} width="80" height="30" />
                    </Button>
                </div>

                <div className='Validation-update-curriculum'>
                    <Button color="primary" size="lg" className="Validator-authentication">
                        (+) Auten. Validador
                    </Button>
                    <Button color="primary" size="lg" className="Electronic-authentication">
                        (+) Auten. Eletrônica
                    </Button>
                </div>

                <div className="boxExperiences">
                    <EntriesMap
                        Entries={this.state.entryList}
                        iconWithoutReceipt={img8}
                    ></EntriesMap>
                </div>

                <div className='Bottom-icons'>
                    <div className='Icons-flex'>
                        <img id="ico-WithoutProof" className="Button-WithoutProof" border="0" src={img8} width="40" height="40" />
                        <h6>Sem Comprovante</h6>
                    </div>
                    <div className='Icons-flex'>
                        <img id="ico-Waiting" className="Button-Waiting" border="0" src={img9} width="40" height="40" />
                        <h6>Aguardando Validação</h6>
                    </div>
                    <div className='Icons-flex'>
                        <img id="ico-Proven" className="Button-Proven" border="0" src={img10} width="40" height="40" />
                        <h6>Comprovado por Validador</h6>
                    </div>
                    <div className='Icons-flex'>
                        <img id="ico-Invalidated" className="Button-Invalidated" border="0" src={img11} width="30" height="30" />
                        <h6>Invalidado</h6>
                    </div>
                </div>

            </div>






        )
    }

}

export default withRouter(Versions);