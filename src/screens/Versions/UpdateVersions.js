import React from 'react';
import './UpdateVersions.css';
import VersionService from '../../services/VersionsService';
import FileUploadService from '../../services/FileUploadService';
import FileUploadWithoutClassCreationService from '../../services/FileUploadWithoutClassCreationService';
import ReceiptWithUrlService from '../../services/ReceiptWithUrlService';
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
import LoadingComp from '../../components/Extra/LoadingComp';

import { showErrorMessage, showSuccessMessage, showWarningMessage } from "../../components/Toastr/Toastr";

class UpdateVersions extends React.Component {

    state = {
        id: "",
        entryCount: "",
        ownerName: "",
        ownerId: "",
        status: "",
        description: "",
        version: "",
        entryList: [],
        lastModification: "",
        version: "",

        activeEntry: null,
        receiptList: [],

        renderPopupImportReceipt: false,
        currentReceiptFile: null,
        currentReceiptFileName: "***",
        currentReceiptCommentary: "",

        newReceiptsFiles: [],
        countNewReceipts: 0,

        renderPopupInformUrl: false,
        currentLink: "",

        renderPopupCommentaryVersion: false,
        commentaryToNewVersion: "",

        haveAllOriginalReceipts: true,

        updateCards: 0,
    }

    constructor() {
        super();
        this.service = new VersionService();
        this.fileUploadService = new FileUploadService();
        this.onlyFileUpload = new FileUploadWithoutClassCreationService();
        this.receiptWithUrlService = new ReceiptWithUrlService();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.findById(id);
        this.buttAuthValidator.disabled = true;
        this.buttAuthEletronic.disabled = true;
        this.buttUpdate.disabled = true;

        window.onbeforeunload = (event) => {
            // verify reload condition
            if (!this.state.haveAllOriginalReceipts || this.state.countNewReceipts > 0 ) {
                const e = event || window.event;
                // Cancel the event
                e.preventDefault();
                if (e) {
                    e.returnValue = ''; // Legacy method for cross browser support
                }
                return ''; // Legacy method for cross browser support
            }
        };
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
                    entryList: curriculum.entryList,
                    lastModification: curriculum.lastModification,
                    version: curriculum.version,
                });
            }).catch(error => {
                console.log(error.response);
            });
    }

    showReceipts = async (receipts, element) => {
        await this.setReceiptList(receipts);
        this.buttAuthValidator.disabled = false;
        this.buttAuthEletronic.disabled = false;
        this.emphasis(element);
        this.verifyReceipts();
    }

    setReceiptList = async (value) => {
        this.setState({ receiptList: value });
    }

    emphasis = (element) => {
        if (this.state.activeEntry != null) {
            this.state.activeEntry.classList.remove('Emphasis');
        }

        element.classList.add('Emphasis');
        this.setState({ activeEntry: element });
    }

    deleteReceipOfList = async (id, isFisicalFile) => {

        if (`${id}`.includes("new")) {

            if(isFisicalFile) {
                await this.removeFromNewReceips(id);
            }
            
            this.countNewReceiptRemove();

            if (this.state.countNewReceipts === 0 && this.state.haveAllOriginalReceipts) {
                this.buttUpdate.disabled = true;
            }
        } else {
            this.setState({ haveAllOriginalReceipts: false });
            this.buttUpdate.disabled = false;
        }
        
        await this.deleteOfEntry(id);
        this.verifyReceipts();
    }

    deleteOfEntry = async (id) => {
        var array = this.state.receiptList.splice(0, this.state.receiptList.length);
        array = array.filter(rec => rec.id != id);

        for (const rec of array) {
            this.state.receiptList.push(rec);
        }

        this.setState({updateCards: this.state.updateCards + 1});
    }

    removeFromNewReceips = async (id) => {
        this.setState({ newReceiptsFiles: this.state.newReceiptsFiles.filter(file => file.id != id) });
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
            showWarningMessage("A entrada ainda não possui comprovantes! Os envie clicando em uma das opções abaixo!");
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
            currentReceiptCommentary: "",
        });
    }

    countNewReceiptAdd = () => {
        const count = this.state.countNewReceipts + 1;
        this.setState({countNewReceipts: count});

        return count;
    }

    countNewReceiptRemove = () => {
        this.setState({ countNewReceipts: this.state.countNewReceipts - 1 });
    }

    addNewReceipt = async () => {
        var receipt;

        if (this.state.currentLink === "") {
            const nameFile = this.state.currentReceiptFile.name;
            const indexDot = nameFile.indexOf(".");

            receipt = {
                id: `new${this.countNewReceiptAdd()}`,
                name: nameFile.substring(0, indexDot),
                extension: nameFile.substring(indexDot),
                commentary: this.state.currentReceiptCommentary,
                status: "WAITING_VALIDATION",
                url: null,

                lastModified: `${this.state.currentReceiptFile.lastModified}`,
            };

            this.state.currentReceiptFile.id = (receipt.id);
            this.state.newReceiptsFiles.push(this.state.currentReceiptFile);

        } else {
            receipt = {
                id: `new${this.countNewReceiptAdd()}`,
                commentary: this.state.currentReceiptCommentary,
                status: "WAITING_VALIDATION",
                url: this.state.currentLink
            };
        }
        this.state.receiptList.push(receipt);
        this.setState({updateCards: this.state.updateCards + 1})
    }

    addReceiptAndUpdateListCard = async () => {
        await this.addNewReceipt();
        this.verifyReceipts();
        this.cancelUploadReceipt();
        this.buttUpdate.disabled = false;
    }

    updateCurriculum = async () => {
        await this.saveNewReceiptsAndSetId();

        this.service.update({
            id: this.state.id,
            ownerId: this.state.ownerId,
            lastModification: this.state.lastModification,
            description: this.state.description,
            entryCount: this.state.entryCount,
            entryList: this.state.entryList,
            version: this.state.version,
        }).then(response => {
            showSuccessMessage('Alterações salvas com sucesso! Atualizando página!');
            this.setState({ countNewReceipts: 0, haveAllOriginalReceipts: true });
            window.location.reload();
        }).catch(error => {
            console.log(error);
        })
    }

    saveNewReceiptsAndSetId = async () => {
        for (const entry of this.state.entryList) {

            for (const receipt of entry.receipts) {

                if (`${receipt.id}`.includes("new")) {
                    var idRec;

                    if (receipt.url === null) {
                        idRec = await this.sendFileToUserFolder(receipt);
                    } else {
                        idRec = await this.receiptWithUrlService.create(receipt).then(response => { return response.data });
                    }
                    receipt.id = idRec;
                }
            }
        }
    }

    sendFileToUserFolder = async (receipt) => {
        const fileToSend = this.state.newReceiptsFiles.filter(file => file.id === receipt.id);

        const data = new FormData();
        data.append('file', fileToSend[0]);
        data.append('userId', this.state.ownerId);
        data.append('userCommentary', receipt.commentary);

        return (
            this.fileUploadService.create(data)
                .then(response => {
                    return response.data;
                }).catch(error => {
                    console.log(error);
                })
        )
    }

    cancelLinkAuth = () => {
        this.setState({
            renderPopupInformUrl: false,
            currentLink: "",
            currentReceiptCommentary: "",
        })
    }

    addLinkReceipt = async () => {
        await this.addNewReceipt();
        this.verifyReceipts();
        this.cancelLinkAuth();
    }

    cancelSaveNewVersion = () => {
        this.setState({
            renderPopupCommentaryVersion: false,
            commentaryToNewVersion: ""
        })
    }

    saveNewVersion = async () => {

        if(this.state.countNewReceipts > 0) {
            await this.removeIdOfNewReceips();
        }

        var idNewVersion = "";

        await this.service.create({
            id: this.state.id,
            ownerId: this.state.ownerId,
            lastModification: this.state.lastModification,
            description: this.state.commentaryToNewVersion,
            entryCount: this.state.entryCount,
            entryList: this.state.entryList,
            version: this.state.version,
        }).then((response) => {
            idNewVersion = response.data.id;
            // envia novos arquivos ao DB caso existam
            if (this.state.newReceiptsFiles.length > 0) {
                this.onlySendNewFiles(response.data.entryList);
            }
        })

        showSuccessMessage("Nova versão salva com sucesso! Atualizando página para edição da nova versão!");
        this.setState({ countNewReceipts: 0, haveAllOriginalReceipts: true });
        this.props.history.push(`/updateversions/${idNewVersion}`);
        window.location.reload();
    }

    removeIdOfNewReceips = async () => {
        for (const entry of this.state.entryList) {

            for (const rec of entry.receipts) {

                if (`${rec.id}`.includes("new")) {
                    rec.id = null;
                }
            }
        }
    }

    onlySendNewFiles = async (entryListSaved) => {
        console.log(this.state.newReceiptsFiles[0]);
        // busca a referência de cada arquivo novo a ser salvo
        for (const file of this.state.newReceiptsFiles) {
            // verifica cada entrada já salva no DB
            for (const entry of entryListSaved) {
                var wasFinded = false;
                // caso encontre, envia e passa para o próximo arquivo a ser enviado
                for (const rec of entry.receipts) {

                    if (rec.lastModified == file.lastModified && `${rec.name}${rec.extension}` === file.name) {
                        const data = new FormData();
                        data.append('file', file);
                        data.append('userId', this.state.ownerId);
                        data.append('userCommentary', 'not used, but @valid stop the request whithout this');
                        data.append('nameOnDB', rec.id + rec.extension);

                        await this.onlyFileUpload.create(data);

                        wasFinded = true;
                        break;
                    }
                }
                if (wasFinded) {
                    break;
                }
            }
        }
    }

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
                    <Button id='buttonComeBack' onClick={() => this.props.history.push("/versionlisting")} color="primary" size="lg" className="Bt-space-between" title='listagem de versões'>
                        <img id="ico-comeBack" className="Button-ComeBack Bt-size1-updateC" border="0" src={img7} />
                    </Button>
                    <Button id='buttonUpdate' color="primary" size="lg" className="Bt-space-between" onClick={() => this.updateCurriculum()} innerRef={elem => this.buttUpdate = elem} title='salvar versão atual'>
                        <img className="Button-Save Bt-size1-updateC Current-version" border="0" src={img12} />
                    </Button>
                    <Button id='buttonNewVersion' color="primary" size="lg" className="Save Save-new-version" onClick={() => this.setState({ renderPopupCommentaryVersion: true })} title='salvar nova versão'>
                        <img className="Button-Save Bt-size1-updateC New-version" border="0" src={img13} />
                    </Button>
                </div>
                <div className='Validation-update-curriculum'>
                    <Button id='butonAuthValidator' color="primary" size="lg" className="Validator-authentication" innerRef={element => this.buttAuthValidator = element}
                        onClick={() => this.setState({ renderPopupImportReceipt: true })} >
                        (+) AUTEN. VALIDADOR
                    </Button>
                    <Button id='buttonAuthEletronic' color="primary" size="lg" className="Electronic-authentication" innerRef={element => this.buttAuthEletronic = element}
                        onClick={() => this.setState({ renderPopupInformUrl: true })} >
                        (+) AUTEN. ELETRÔNICA
                    </Button>
                </div>

                {/* FISICAL Receipt */}
                <PopupSpace render={this.state.renderPopupImportReceipt}>
                    <h2 className='Center'>Autenticação - Validador</h2>
                    <div className='In-line'>
                        <h3>Arquivo:</h3>
                        <input type='text' disabled={true} className='Input-arquive' placeholder={this.state.currentReceiptFileName} />

                        <input type='file' accept='.jpeg, .jpg, .png, .pdf' className='Input-hiden' ref={element => this.fileup01 = element}
                            onChange={(e) => this.setCurrentFile(e.target.files[0])} />
                        <Button id='buttonSendFisicalReceipt' color="primary" size="sm" className="Bt-import-Receipt" onClick={() => this.fileup01.click()} >
                            <img className="Icon" border="0" src={iconUpReceipt} />
                            <b>ENVIAR</b>
                        </Button>
                    </div>
                    <div className='In-line'>
                        <h3>Comentário:</h3>
                        <input type='text' className='Input-commentary' placeholder='(opcional)' onChange={(e) => this.setState({ currentReceiptCommentary: e.target.value.trim() })} />
                    </div>
                    <div className='Buttons-confirm-cancel-receipt'>
                        <Button id='buttonAddFisicalReceipt' color="primary" size="lg" disabled={this.state.currentReceiptFileName === "***"} onClick={() => this.addReceiptAndUpdateListCard()}>
                            <b>ADICIONAR COMP</b>
                        </Button>
                        <Button id='buttonCancelSendFisicalReceipt' color="danger" size="lg" onClick={() => this.cancelUploadReceipt()}>
                            <b>CANCELAR</b>
                        </Button>
                    </div>
                </PopupSpace>

                {/* LINK Receipt */}
                <PopupSpace render={this.state.renderPopupInformUrl}>
                    <h2 className='Center'>Autenticação - Eletrônica</h2>
                    <div className='InputsLink'>
                        <h3>Informe o link:</h3>
                        <textarea className='Paragraph-field' autoFocus={true} onChange={e => this.setState({ currentLink: e.target.value.trim() })} />
                        <br />
                        <h3>Comentário:</h3>
                        <input type='text' className='Commentary' placeholder='(opcional)' onChange={e => this.setState({ currentReceiptCommentary: e.target.value.trim() })} />
                    </div>
                    <div className='Buttons-link'>
                        <Button id='buttonAddReceiptLink' color="primary" size="lg" disabled={this.state.currentLink === ""} onClick={() => this.addLinkReceipt()}>
                            <b>ADICIONAR COMP</b>
                        </Button>
                        <Button id='buttonCancelAddReceiptLink' color="danger" size="lg" onClick={() => this.cancelLinkAuth()}>
                            <b>CANCELAR</b>
                        </Button>
                    </div>
                </PopupSpace>

                {/* ADD COMMENTARY TO SAVE NEW VERSION */}
                <PopupSpace render={this.state.renderPopupCommentaryVersion}>
                    <h2 className='Center'>Salvar nova versão do currículo</h2>
                    <div className='InputsLink'>
                        <h3>Adicione um comentário:</h3>
                        <input type='text' className='Commentary' autoFocus={true} placeholder='(requisitado)' onChange={e => this.setState({ commentaryToNewVersion: e.target.value.trim() })} />
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='Buttons-link'>
                        <Button id='buttonSaveNewVersion' color="primary" size="lg" disabled={this.state.commentaryToNewVersion === ""} onClick={() => this.saveNewVersion()}>
                            <b>SALVAR</b>
                        </Button>
                        <Button id='buttonCancelSaveNewVersion' color="danger" size="lg" onClick={() => this.cancelSaveNewVersion()}>
                            <b>CANCELAR</b>
                        </Button>
                    </div>
                </PopupSpace>

                <div className="boxExperiences">
                    <EntriesMap entries={this.state.entryList} loadReceipts={this.showReceipts} ></EntriesMap>
                </div>

                <div className='Entry-Receipts'>
                    <CardReceipt update={this.state.updateCards} receipts={this.state.receiptList} deleteMethod={this.deleteReceipOfList} iconWaiting={img9} iconChecked={img10} iconInvalid={img11} iconReciclebin={img14} />
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

export default withRouter(UpdateVersions);