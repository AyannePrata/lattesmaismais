import React from "react";
import { withRouter } from 'react-router';
import './ExportPdf.css';

import LeftMenu from "../../components/Menu/LeftMenu";
import { showErrorMessage } from "../../components/Toastr/Toastr";
import CurriculumTableRS from "../../components/SchedulingTable/CurriculumTableRS";
import { Button } from "reactstrap";
import LoadingComp from "../../components/Extra/LoadingComp";

import VersionsService from "../../services/VersionsService";
import AuthenticationApiService from "../../services/AuthenticationApiService";
import PdfService from "../../services/PdfService";
import { getAxcessPath } from "../../services/ServerService";
import StorageService from "../../services/StorageService";

class ExportPdf extends React.Component {

    state = {
        curriculumList: [],
        selectedCurriculum: null,
        renderLoading: false,
        linkPdf: "",
        queryStringGhost: "",
    }

    constructor() {
        super();
        this.curriculumService = new VersionsService();
        this.authService = new AuthenticationApiService();
        this.pdfService = new PdfService();
        this.authService = new AuthenticationApiService();
        this.storage = new StorageService();
    }

    componentDidMount() {
        this.find();
    }

    find = () => {
        this.curriculumService.findAllByUserId(this.authService.getLoggedUser().id)
        .then(response => {
            this.setState({curriculumList: response.data});
        }).catch(error => {
            showErrorMessage(error.data);
            console.log(error);
        })
    }

    setCurriculumSelected = (curriculum) => {
        this.setState({selectedCurriculum: curriculum}, () => {
            if(this.isOnPathList()) {
                this.setState({linkPdf: this.isOnPathList()});
            } else {
                this.setState({linkPdf: ""});
            }
        });
    }

    generatePdf = async () => {
        this.setState({renderLoading: true})

        if(this.state.linkPdf === "") {
            console.log('foi no banco');
            await this.pdfService.generate(this.state.selectedCurriculum.id, this.authService.getLoggedUser().id)
            .then(response => {
                this.setState({linkPdf: getAxcessPath(response.data) + this.noCache()}, () => {
                    this.storage.setItem(this.getSelectedCurriculumKeyMap(), this.state.linkPdf);
                });
            }).catch(error => {
                showErrorMessage(error.data);
                console.log(error);
            });
        } else {
            this.setState({linkPdf: this.storage.getItem(this.getSelectedCurriculumKeyMap())});
        }

        //TODO remover tempo de espera
        await new Promise((resolve, regect) => {
            setTimeout(() => {
                this.setState({renderLoading: false});
                resolve();
            }, 1500);
        })

        this.linkDowload.click();
    }

    isOnPathList = () => {
        return this.storage.getItem(this.getSelectedCurriculumKeyMap());
    }

    noCache = () => {
        const qsg = Date.now().toString();
        this.setState({queryStringGhost: qsg});
        console.log(qsg);
        return "?" + qsg;
    }

    getSelectedCurriculumKeyMap = () => {
        const id = this.state.selectedCurriculum.id;
        const lastMod =this.state.selectedCurriculum.lastModification;
        return id + lastMod;
    }

    render() {
        return(
            <div className="Principal Fields">
                <LeftMenu/>
                <div className="Border-1">
                    <h1>Selecione uma versão para ser exportada</h1>
                    <br/>
                    <div className="Table-div-export">
                        <CurriculumTableRS curriculums={this.state.curriculumList} versionSelected={this.setCurriculumSelected}/>
                        <div className="Button-div">
                            <Button color="primary" size="lg" disabled={this.state.selectedCurriculum === null}
                                onClick={(() => this.generatePdf())}> 
                                GERAR PDF 
                            </Button>
                            <a hidden={true} ref={elem => this.linkDowload = elem} href={this.state.linkPdf} download="CurriculoLMM-comp" target="_blank"/>
                        </div>
                    </div>
                </div>
                <LoadingComp render={this.state.renderLoading}/>
            </div>
        )
    }
}

export default withRouter(ExportPdf);