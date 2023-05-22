import React from 'react';
import './VersionListing.css';

import VersionsService from '../../services/VersionsService';
import FormGroup from "../../components/FormGroup/FormGroup";
import { withRouter } from 'react-router';


import img14 from '../../assets/images/recyclebinEmpty.svg';
import LeftMenu from '../../components/Menu/LeftMenu';


class VersionListing extends React.Component {

    constructor() {
        super();
        this.service = new VersionsService();
    }

    state = {
        version: "",
        commentaryToNewVersion: "",
        lastModification: "",
    }


    render() {
        return (
            <div className="Versions-Screen">
                <LeftMenu/>
                <div className="box">
                    <h1 id='version'>{this.state.version}</h1>
                    <h2 id='commentary'>{this.state.commentaryToNewVersion}</h2>
                    <h3>Alterado em:</h3>
                    <h4 id='modificationDateAndTime'>{this.state.lastModification}</h4>
                    <button type="toedit" className="b1" >
                    </button>
                    <button type="delete" className="b2">
                        <img id="ico-delete" className="Button-delete"  border="0" src={img14} width="120" height="30" />


                    </button>


                </div>
               
               
               
            </div>
        )


    }
}


export default withRouter(VersionListing);