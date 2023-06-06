import React from "react";
import { withRouter } from "react-router";

import LeftMenu from "../../components/Menu/LeftMenu";
import SchedulingCard from "../../components/Solicitations/SchedulingCard";


import SchedulingService from "../../services/SchedulingService";
import AuthenticationApiService from "../../services/AuthenticationApiService";

class ReviewCurriculum extends React.Component {

    openCurriculumToValidate = (solicitation) => {
        this.props.history.push(`/receiptanalysis/${solicitation.requesterId}/${solicitation.version}/${solicitation.id}`);
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