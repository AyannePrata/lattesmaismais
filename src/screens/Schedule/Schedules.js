import React from 'react';
import './Schedules.css';

import SchedulingTable from "../../components/SchedulingTable/SchedulingTable";
import SchedulingService from "../../services/SchedulingService";
import LeftMenu from '../../components/Menu/LeftMenu';
import { withRouter } from 'react-router';

class Schedules extends React.Component {

    state = {
        scheduling: []
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }

    find = () => {
        this.service.find('')
        .then( Response => {
            const scheduling = Response.data;
            this.setState({scheduling: scheduling});
            console.log(scheduling);
        }).catch( error => {
            console.log(error.Response)
        });
    }

    delete = (schedulingId) => {
        this.service.delete(schedulingId)
        .then( Response => {
            this.find();
        }).catch( error => {
            console.log(error.Response)
        });
    }

    scheduleValidation = () => {
        this.props.history.push("/scheduling/create");
    }

    componentDidMount() {
        this.find();
    }

    render() {
        return(

            <div className= "Principal">
                <div className="Fields">
                    <SchedulingTable schedulings={this.state.scheduling} delete={this.delete}/>
                </div>
            </div>
        )

    }
}

export default withRouter(Schedules);