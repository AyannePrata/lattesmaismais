import React from "react";
import { withRouter } from "react-router";
import './ReceiptAnalysis.css';

import LeftMenu from "../../components/Menu/LeftMenu";
import EntriesMap from "../../components/Curriculum/EntriesMap";
import { Button } from "reactstrap";
import CardValidateReceipt from "../../components/Curriculum/CardValidateReceipt";
import PopupSpace from "../../components/FormGroup/PopupSpace";

import VersionsService from "../../services/VersionsService";
import AuthenticationApiService from "../../services/AuthenticationApiService";
import ReceiptWithUrlService from "../../services/ReceiptWithUrlService";
import ValidatorCommentaryService from "../../services/ValidatorCommentaryService";
import SchedulingService from "../../services/SchedulingService";
import StorageService from "../../services/StorageService";

import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";

import iconComeBack from '../../assets/images/ComeBack.svg';
import iconSave from '../../assets/images/Save.svg';

import { FORCEGETSOLICITATIONS } from "../../components/Menu/LeftMenu";

const NEW_STATUS_CHECKED = "newDecision_CHECKED_BY_VALIDATOR";
const NEW_STATUS_INVALID = "newDecision_INVALID";

const ORIGINAL_STATUS_CHECKED = "CHECKED_BY_VALIDATOR"
const ORIGINAL_STATUS_INVALID = "INVALID";
const ORIGINAL_STATUS_WAITING = "WAITING_VALIDATION";

const SOLICITATION_STATUS_DONE = "DONE";
const CURRICULUM_STATUS_CHECKED = "CHECKED";

class ReceiptAnalysis extends React.Component {

    state = {
        curriculumSelected: "",
        entryList: [],
        receiptList: [],
        activeEntry: null,

        selectedReceipt: null,
        renderPopup: false,
        commentary: "",

        updateReceipts: 0,
    }

    constructor() {
        super();
        this.curriculumService = new VersionsService();
        this.authService = new AuthenticationApiService();
        this.receiptService = new ReceiptWithUrlService();
        this.commentaryService = new ValidatorCommentaryService();
        this.schedservice = new SchedulingService();
        this.storageService = new StorageService();
    }

    componentDidMount() {
        this.find();
        this.saveButton.disabled = true;

        window.onbeforeunload = (event) => {
            // verify reload condition
            if (this.haveValidatedRecipts()) {
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

    find = () => {
        const ownerId = this.props.match.params.id;
        const version = this.props.match.params.version;
        this.curriculumService.findByRequesterIdAndVersionName(ownerId, version)
            .then(response => {
                this.setState({
                    curriculumSelected: response.data,
                }, () => this.filterEntries());

            }).catch(error => {
                showErrorMessage('Ocorreu um erro ao carregar o currículo selecionado!');
                //alert('Ocorreu um erro ao carregar o currículo selecionado!');
                console.log(error);
            })
    }

    haveValidatedRecipts = () => {
        for (const entry of this.state.entryList) {
            for (const rec of entry.receipts) {
                if (rec.status.includes("newDecision")) {
                    return true;
                }
            }
        }
    }

    filterEntries = () => {
        const array = (this.state.curriculumSelected.entryList).filter(this.isEntryToValidate);
        this.setState({ entryList: array });
    }

    // dispensa entradas sem comprovantes
    isEntryToValidate = (entry) => {
        if (entry.receipts != null && entry.receipts.length > 0) {
            return true;
        }
    }

    showReceipts = async (receipts, element) => {
        this.setState({ receiptList: receipts });
        this.emphasis(element);
    }

    emphasis = (element) => {
        if (this.state.activeEntry != null) {
            this.state.activeEntry.classList.remove('Emphasis');
        }

        element.classList.add('Emphasis');
        this.setState({ activeEntry: element });
    }

    validate = (receipt) => {
        receipt.statusOld = receipt.status;
        receipt.status = NEW_STATUS_CHECKED;
        this.verifyButtonSave();
        this.refreshEntries();
    }

    invalidate = (receipt) => {
        this.setState({ selectedReceipt: receipt });
        this.openPopup();
    }

    verifyButtonSave = () => {
        for (const entry of this.state.entryList) {
            for (const rec of entry.receipts) {
                if (rec.status == "WAITING_VALIDATION" || rec.status == "INVALID") {
                    this.saveButton.disabled = true;
                    return;
                }
            }
        }

        this.saveButton.disabled = false;
    }

    changeStatusReceipt = () => {
        this.state.selectedReceipt.statusOld = this.state.selectedReceipt.status;
        this.state.selectedReceipt.status = NEW_STATUS_INVALID;
        this.state.selectedReceipt.commentToSend = this.state.commentary;
        this.verifyButtonSave();
        this.refreshEntries();
        this.closePopup();
    }

    undoDecision = (receipt) => {
        receipt.status = receipt.statusOld;
        this.saveButton.disabled = true;
        this.refreshEntries();
        this.cancelPopup();
    }

    refreshEntries = () => {
        this.setState({updateReceipts: this.state.updateReceipts + 1});
    }

    closePopup = () => {
        this.setState({ renderPopup: false });
    }

    openPopup = () => {
        this.setState({ renderPopup: true })
    }

    cancelPopup = () => {
        this.setState({
            commentary: "",
            selectedReceipt: null,
        });
        this.closePopup();
    }

    updateReceipt = async () => {
        for (const entry of this.state.entryList) {
            for (const rec of entry.receipts) {

                if (rec.status == NEW_STATUS_INVALID) {
                    // primeiro gera comentário no DB
                    const commentId = await this.commentaryService.create(
                        {
                            validatorId: this.authService.getLoggedUser().id,
                            validatorName: this.authService.getLoggedUser().name,
                            commentary: rec.commentToSend
                        }
                    ).then(response => {
                        return response.data.id;
                    }).catch(error => {
                        showErrorMessage('Ocorreu um erro ao tentar salvar o comentário do validador do comprovante invalidado');
                        console.log(error);
                    });

                    // depois atualiza o receipt com id do comentário gerado
                    await this.receiptService.updateByValidator(
                        {
                            id: rec.id,
                            status: ORIGINAL_STATUS_INVALID,
                            commentaryId: commentId
                        }
                    ).catch(error => {
                        showErrorMessage('Ocorreu um erro ao tentar atualizar o comprovante invalidado');
                        console.log(error);
                    });

                } else if (rec.status == NEW_STATUS_CHECKED) {
                    await this.receiptService.updateByValidator(
                        {
                            id: rec.id,
                            status: ORIGINAL_STATUS_CHECKED,
                        }
                    ).catch(error => {
                        showErrorMessage("Ocorreu um erro ao tentar atualizar o comprovante validado");
                        console.log(error);
                    });
                }
            }
        }

        //atualiza solicitação para concluída, após ter atualizado todos os comprovantes
        await this.schedservice.update(
            {
                id: this.props.match.params.solicitationId,
                status: SOLICITATION_STATUS_DONE
            }
        ).then(() => {
            for(const entry of this.state.entryList) {
                for(const rec of entry.receipts) {
                    const statusNegate = [ORIGINAL_STATUS_INVALID, ORIGINAL_STATUS_WAITING, NEW_STATUS_INVALID];
                    if(statusNegate.includes(rec.status)) {
                        return;
                    }
                }
            }
            // caso não encontre um status nos comprovantes que não seja aquele que representa validado, muda o status
            // do currículo para checado.
            this.state.curriculumSelected.status = CURRICULUM_STATUS_CHECKED;
            this.storageService.setItem(FORCEGETSOLICITATIONS, true);
        }).catch(error => {
            showErrorMessage("Houve um erro ao tentar atualizar o status da solicitação!");
            console.log(error);
        });

        // modifica o status do currículo avaliado para checado, em caso de ele possuir todas as entradas validadas.
        // a verificação com o sucesso da requisição anterior
        if(this.state.curriculumSelected.status == CURRICULUM_STATUS_CHECKED) {
            const curriculum = await this.curriculumService.findById(this.state.curriculumSelected.id)
            .then(response => {
                response.data.status = CURRICULUM_STATUS_CHECKED;
                return response.data;
            }).catch(error => {
                showErrorMessage("Erro ao tentar recuperar currículo no banco de dados");
                console.log(error);
            });

            this.curriculumService.update(curriculum)
            .then(() => {
                this.setState({entryList: []});
                showSuccessMessage("Avaliação concluída! Redirecionando à página de revisão!");
                this.props.history.push("/reviewcurriculum");
            }).catch(error => {
                showErrorMessage("Houve um erro ao tentar atualizar o currículo em questão!");
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div className="Principal">
                <LeftMenu />
                <div className="Fields F-analysis">
                    <div className='Save-return-buttons'>
                        <Button id='buttonComeBackRA' onClick={() => this.props.history.push("/reviewcurriculum")} color="primary" size="lg" className="Bt-space-between" title='listagem de versões'>
                            <img id="ico-comeBack" className="Button-ComeBack Bt-size1-updateC" border="0" src={iconComeBack} />
                        </Button>
                        <Button innerRef={button => this.saveButton = button} title="Salvar decisões" id='buttonSaveRA' onClick={() => this.updateReceipt()} color="primary" size="lg" className="Bt-space-between">
                            <img id="ico-comeSaveRA" className="Button-ComeBack Bt-size1-updateC" border="0" src={iconSave} />
                        </Button>
                    </div>
                    <div className="Info-requester">
                        <h2>Solicitante: <b>{this.state.curriculumSelected.ownerName}</b></h2>
                        <h2>Currículo: <b>{this.state.curriculumSelected.version}</b></h2>
                    </div>
                    <div className="Box-line">
                        <div className="boxExperiences">
                            <EntriesMap entries={this.state.entryList} loadReceipts={this.showReceipts} ></EntriesMap>
                        </div>
                        <div className="Read-receipts">
                            <CardValidateReceipt update={this.state.updateReceipts} requesterId={this.props.match.params.id} receiptList={this.state.receiptList} acceptReceipt={this.validate} declineReceipt={this.invalidate} undoDecision={this.undoDecision} />
                        </div>
                    </div>
                    <PopupSpace render={this.state.renderPopup} className="RecAnaly-popup">
                        <h2 className="Center"> Invalidar Comprovante </h2>
                        <h3> Justificativa </h3>
                        <textarea onChange={e => this.setState({ commentary: e.target.value.trim() })} autoFocus={true} />
                        <div className="Buttons">
                            <Button color="primary" size="lg" onClick={() => this.changeStatusReceipt()} disabled={this.state.commentary == ""}> OK </Button>
                            <Button color="danger" size="lg" onClick={() => this.cancelPopup()}> CANCELAR </Button>
                        </div>
                    </PopupSpace>
                </div>
            </div>
        )
    }
}
export default withRouter(ReceiptAnalysis);