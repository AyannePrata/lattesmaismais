import React from "react";
import { withRouter } from "react-router";

import LeftMenu from "../../components/Menu/LeftMenu";
import SchedulingCard from "../../components/Solicitations/SchedulingCard";

import SchedulingService from "../../services/SchedulingService";
import AuthenticationApiService from "../../services/AuthenticationApiService";

class ReviewCurriculum extends React.Component {

    state = {
        openedSolicitationList: [],
    }

    constructor() {
        super();
        this.schedService = new SchedulingService();
        this.authService = new AuthenticationApiService();
    }

    componentDidMount() {
        this.find();
    }

    find = () => {
        this.schedService.findAllByUserId(this.authService.getLoggedUser().id, true)
        .then(response => {
            const array  = (response.data).filter(solicitation => solicitation.status == "ACCEPTED");
            this.setState({openedSolicitationList: array});
        }).catch(error => {
            alert('Houve um erro ao tentar recuperar a lista de solicitações em aberto');
            console.log(error);
        })
    }

    openCurriculumToValidate = (solicitation) => {
        this.props.history.push(`/receiptanalysis/${solicitation.requesterId}/${solicitation.version}`);
    }

    render() {
        return(
            <div className='Principal'>
                <LeftMenu/>
                <div className="Fields">
                    <SchedulingCard editOption={true} methEdit={this.openCurriculumToValidate}/>
                </div>
            </div>
        )
    }
}

export default withRouter(ReviewCurriculum);