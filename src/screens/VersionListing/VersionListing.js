import React from 'react';
import './VersionListing.css';
import VersionsService from '../../services/VersionsService';
import FormGroup from "../../components/FormGroup/FormGroup";
import { withRouter } from 'react-router';

import CurriculumCard from '../../components/Curriculum/CurriculumCard';
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

    componentDidMount() {
        this.find();
    }


    render() {
        return (
            <div className="Versions-Screen">
                <LeftMenu/>
                <CurriculumCard/>
              
            </div>
        )


    }
}


export default withRouter(VersionListing);