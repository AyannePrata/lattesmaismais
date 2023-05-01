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
import img13 from '../../assets/images/createNewCurriculum.svg';
import img14 from '../../assets/images/recyclebinEmpty.svg';
import iconUpReceipt from '../../assets/images/uploadReceipt.svg'

import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import LeftMenu from '../../components/Menu/LeftMenu';
import CardReceipt from '../../components/Curriculum/CardReceipt';
import PopupSpace from '../../components/FormGroup/PopupSpace';

class Versions extends React.Component {

    state = {
        id: "",
        entryCount: "",
        ownerName: "",
        ownerId: "",
        status: "",
        description: "",
        version: "",
        entryList: [],

        //TODO criar método que destaca entrada ativa no momento// activeEntry: null,
        receiptList: [],

        renderPopupImportReceipt: false,
        currentReceiptFile:null,
        currentReceiptFileName: "***",
        currentReceiptCommentary:null,
        newReceiptsFiles: [],
    }

    constructor() {
        super();
        this.service = new VersionService();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.findById(id);
        this.buttAuthValidator.disabled = true;
        this.buttAuthEletronic.disabled = true;
    }

    findById = (curriculumId) => {
        this.service.findById(curriculumId)
            .then(response => {
                const curriculum = response.data;
                this.setState({
                    id: curriculum.id,
                    entryCount: curriculum.entryCount,
                    ownerName: curriculum.ownerName,
                    ownerId: curriculum.ownerId,
                    status: curriculum.status,
                    description: curriculum.description,
                    version: curriculum.version,
                    entryList: curriculum.entryList
                });
            }).catch(error => {
                console.log(error.response);
            });
    }

    showReceipts = async (receipts) => {
        await this.setReceiptList(receipts);
        this.buttAuthValidator.disabled = false;
        this.buttAuthEletronic.disabled = false;
        this.verifyReceipts();
    }

    setReceiptList = async (value) => {
        this.setState({ receiptList: value });
    }
    
    deleteReceipOfList = async (id) => {
        if(`${id}`.includes("new")){
            this.removeFromNewReceips(id);
        }
        var array = this.state.receiptList;
        array = array.filter(rec => rec.id != id);
        await this.deleteOfEntry(array);
        // atualiza a lista em tela
        await this.setReceiptList(this.state.receiptList);
        this.verifyReceipts();
    }

    deleteOfEntry = async (array) => {
        const numbReceipts = this.state.receiptList.length;
        this.state.receiptList.splice(0,numbReceipts);

        for(const rec of array) {
            this.state.receiptList.push(rec);
        }
    }

    removeFromNewReceips = (id) => {
        const currentArray = this.state.newReceiptsFiles;
        this.setState({newReceiptsFiles: currentArray.filter(file => file.id != id)});
    }

    verifyReceipts = () => {
        const numbReceipts = this.state.receiptList.length;

        if (numbReceipts === 5) {
            this.buttAuthValidator.disabled = true;
            this.buttAuthEletronic.disabled = true;
        } else if (numbReceipts > 1) {
            this.buttAuthValidator.disabled = false;
            this.buttAuthEletronic.disabled = true;
        } else if (numbReceipts === 1) {
            this.buttAuthValidator.disabled = false;
            this.buttAuthEletronic.disabled = true;

            if (this.state.receiptList[0].url != null) {
                this.buttAuthValidator.disabled = true;
            }
        } else {
            this.buttAuthValidator.disabled = false;
            this.buttAuthEletronic.disabled = false;
            alert("A entrada ainda não possui comprovantes! Os envie clicando em uma das opções abaixo!");
        }
    }

    setCurrentFile = (file) => {
        if (file != null) {
            this.setState({
                currentReceiptFileName: file.name,
                currentReceiptFile: file
            })
        }
    }

    cancelUploadReceipt = () => {
        this.setState({
            renderPopupImportReceipt: false,
            currentReceiptFile: null,
            currentReceiptFileName: "***",
            currentReceiptCommentary: null,
        });
    }

    addNewReceipt = async () => {
        const type = this.state.currentReceiptFile.type;
        const indexBarr = type.indexOf("/");

        const receipt = {
            id: `new${this.state.newReceiptsFiles.length}`,
            name: this.state.currentReceiptFileName,
            extension: type.substring(indexBarr + 1, type.length),
            commentary: this.state.currentReceiptCommentary,
            status: "WAITING_VALIDATION",
            url: null
        };
        this.state.receiptList.push(receipt);

        this.state.currentReceiptFile.id=(receipt.id);
        this.state.newReceiptsFiles.push(this.state.currentReceiptFile);
    }

    addReceiptAndUpdateListCard = async () => {
        await this.addNewReceipt();
        this.verifyReceipts();
        this.cancelUploadReceipt();
    }
    //TODO
    updateCurriculum = async () => {
        for(const entry of this.state.entryList) {
            
        }
    }

    //TODO botão de voltar deve ir para tela de listagem de currículos
    render() {

        return (
            <div className='Fields F-update'>
                <LeftMenu />
                <div className='Name-and-entries'>
                    <h2 id='nameCurriculumOwner'>{this.state.ownerName}</h2>
                    <h4 id='countEntry'>(Entradas identificadas: {this.state.entryCount})</h4>
                </div>
                <div className='Version-and-comment'>
                    <h2 id='versionCurriculum'>{this.state.version}</h2>
                    <h4 id='descriptionCurriculum'>{this.state.description}</h4>
                </div>

                <div className='Save-return-buttons'>
                    {/** TODO */}
                    <Button onClick={this.home} color="primary" size="lg" className="Bt-space-between">
                        <img id="ico-comeBack" className="Button-ComeBack Bt-size1-updateC" border="0" src={img7} />
                    </Button>
                    <Button color="primary" size="lg" className="Bt-space-between" onClick={() => this.updateCurriculum()}>
                        <img className="Button-Save Bt-size1-updateC Current-version" border="0" src={img12} />
                    </Button>
                    <Button color="primary" size="lg" className="Save Save-new-version">
                        <img className="Button-Save Bt-size1-updateC New-version" border="0" src={img13} />
                    </Button>
                </div>

                <div className='Validation-update-curriculum'>
                    <Button color="primary" size="lg" className="Validator-authentication" innerRef={element => this.buttAuthValidator = element}
                        onClick={() => this.setState({ renderPopupImportReceipt: true })} >
                        (+) Auten. Validador
                    </Button>
                    <Button color="primary" size="lg" className="Electronic-authentication" innerRef={element => this.buttAuthEletronic = element} >
                        (+) Auten. Eletrônica
                    </Button>
                </div>

                <PopupSpace render={this.state.renderPopupImportReceipt}>
                    <h2 className='Center'>Autenticação - Validador</h2>
                    <div className='In-line'>
                        <h3>Arquivo:</h3>
                        <input type='text' disabled={true} className='Input-arquive' placeholder={this.state.currentReceiptFileName}/>

                        <input type='file' accept='.jpeg, .jpg, .png, .pdf' className='Input-hiden' ref={element => this.fileup01 = element}
                            onChange={(e) => this.setCurrentFile(e.target.files[0])}/>
                        <Button color="primary" size="sm" className="Bt-import-Receipt" onClick={() => this.fileup01.click()} >
                            <img className="Icon" border="0" src={iconUpReceipt} />
                            <b>ENVIAR</b>
                        </Button>
                    </div>
                    <div className='In-line'>
                        <h3>Comentário:</h3>
                        <input type='text' className='Input-commentary' placeholder='(opcional)' onChange={(e) => this.setState({currentReceiptCommentary: e.target.value})}/>
                    </div>
                    <div className='Buttons-confirm-cancel-receipt'>
                        <Button color="primary" size="lg" disabled={this.state.currentReceiptFileName === "***"} onClick={() => this.addReceiptAndUpdateListCard()}>
                            <b>ADICIONAR COMP</b>
                        </Button>
                        <Button color="danger" size="lg" onClick={() => this.cancelUploadReceipt()}>
                            <b>CANCEL</b>
                        </Button>
                    </div>
                </PopupSpace>

                <div className="boxExperiences">
                    <EntriesMap entries={this.state.entryList} loadReceipts={this.showReceipts} ></EntriesMap>
                </div>

                <div className='Entry-Receipts'>
                    <CardReceipt receipts={this.state.receiptList} deleteMethod={this.deleteReceipOfList} iconWaiting={img9} iconChecked={img10} iconInvalid={img11} iconReciclebin={img14} />
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