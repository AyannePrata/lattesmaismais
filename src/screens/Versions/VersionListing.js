import React from 'react';
import './VersionListing.css';
import { withRouter } from 'react-router';

import VersionsService from '../../services/VersionsService';
import AuthenticationApiService from '../../services/AuthenticationApiService';

import CurriculumCard from '../../components/Curriculum/CurriculumCard';
import LeftMenu from '../../components/Menu/LeftMenu';
import PopupSpace from '../../components/FormGroup/PopupSpace';
import { Button } from 'reactstrap';


class VersionListing extends React.Component {

    constructor() {
        super();
        this.service = new VersionsService();
        this.authService = new AuthenticationApiService();
    }

    state = {
        version: "",
        commentaryToNewVersion: "",
        lastModification: "",

        curriculumList: [],

        renderConfirmExclusion: false,
        curriculumIdToExclude: null,
    }

    componentDidMount() {
        this.find();
    }

    find = () => {
        this.service.findAllByUserId(this.authService.getLoggedUser().id)
            .then(response => {
                this.setState({ curriculumList: response.data });
            }).catch(error => {
                console.log(error);
            })
    }

    renderPopup = (id) => {
        this.setState({
            renderConfirmExclusion: true,
            curriculumIdToExclude: id,
        })
    }

    cancelExclusion = () => {
        this.setState({
            renderConfirmExclusion: false,
            curriculumIdToExclude: null,
        })
    }

    deleteCurriculum = async (id) => {
        await this.service.delete(id);
        this.find();
        this.setState({renderConfirmExclusion: false})
    }

    editCurriculum = (id) => {
        this.props.history.push(`/updateversions/${id}`);
    }

    render() {
        return (
            <div className="Versions-Screen">
                <LeftMenu />
                <div className='Principal Fields List-curriculum-cards'>
                    <CurriculumCard curriculums={this.state.curriculumList} className={"All-curriculum-cards"} delete={this.renderPopup} edit={this.editCurriculum} />
                </div>
                <PopupSpace render={this.state.renderConfirmExclusion}>
                    <br />
                    <br />
                    <h2 className='Center'><b>Confirmação de exclusão de Versão</b></h2>
                    <h3 className='Center'>Não será mais possível recuperar esta versão!</h3>
                    <br />
                    <br />
                    <div className='Buttons-exclude-popup'>
                        <Button id='buttonConfirm' color="danger" size="lg" onClick={() => this.deleteCurriculum(this.state.curriculumIdToExclude)}>
                            <b>CONFIRMAR</b>
                        </Button>
                        <Button id='buttonCancel' color="primary" size="lg" onClick={() => this.cancelExclusion()}>
                            <b>CANCELAR</b>
                        </Button>
                    </div>
                </PopupSpace>
            </div>
        )
    }
}
export default withRouter(VersionListing);