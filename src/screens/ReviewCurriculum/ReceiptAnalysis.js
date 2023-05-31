import React from "react";
import { withRouter } from "react-router";
import './ReceiptAnalysis.css';

import LeftMenu from "../../components/Menu/LeftMenu";
import EntriesMap from "../../components/Curriculum/EntriesMap";
import { Button } from "reactstrap";

import VersionsService from "../../services/VersionsService";

import iconComeBack from '../../assets/images/ComeBack.svg';

class ReceiptAnalysis extends React.Component {

    state = {
        curriculumSelected: "",
        entryList: [],
        receiptList: [],
        activeEntry: null,
    }

    constructor() {
        super();
        this.curriculumService = new VersionsService();
    }

    componentDidMount() {
        this.find();
    }

    find = () => {
        const ownerId = this.props.match.params.id;
        const version = this.props.match.params.version;
        this.curriculumService.findByRequesterIdAndVersionName(ownerId, version)
            .then(response => {
                this.setState({
                    curriculumSelected: response.data,
                    entryList: (response.data).entryList,
                });
            }).catch(error => {
                alert('Ocorreu um erro ao carregar o currículo selecionado!');
                console.log(error);
            })
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

    render() {
        return (
            <div className="Principal">
                <LeftMenu />
                <div className="Fields">
                    <div className='Save-return-buttons'>
                        <Button id='buttonComeBack' onClick={() => this.props.history.push("/reviewcurriculum")} color="primary" size="lg" className="Bt-space-between" title='listagem de versões'>
                            <img id="ico-comeBack" className="Button-ComeBack Bt-size1-updateC" border="0" src={iconComeBack} />
                        </Button>
                    </div>
                    <div className="Info-requester">
                        <h2>Solicitante: <b>{this.state.curriculumSelected.ownerName}</b></h2>
                        <h2>Currículo: <b>{this.state.curriculumSelected.version}</b></h2>
                    </div>
                    <div className="boxExperiences">
                        <EntriesMap entries={this.state.entryList} loadReceipts={this.showReceipts} ></EntriesMap>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ReceiptAnalysis);