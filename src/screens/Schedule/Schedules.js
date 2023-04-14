import React from 'react';
import './Schedules.css';

import SchedulingService from "../../services/SchedulingService";
import { withRouter } from 'react-router';
import SchedTableRS from '../../components/SchedulingTable/SchedTableRS';
import { Button } from 'reactstrap';
import LeftMenu from '../../components/Menu/LeftMenu';


class Schedules extends React.Component {

    state = {
        scheduling: []
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }

    find = () => {
        this.service.findAll()
            .then(Response => {
                const scheduling = Response.data;
                this.setState({ scheduling: scheduling });
                console.log(scheduling);
            }).catch(error => {
                console.log(error.Response)
            });
    }

    delete = (schedulingId) => {
        this.service.delete(schedulingId)
            .then(Response => {
                this.find();
            }).catch(error => {
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
        return (
            <div className="Principal">
                <LeftMenu/>
                <div className="Fields">
                    <div className='Tabs'>
                        <Button color='primary' id='tabButton01'>ABERTO</Button>
                        <Button color='secondary' id='tabButton02'>ACEITOS(0)</Button>
                        <Button color='secondary' id='tabButton03'>RECUSADOS(0)</Button>
                        <Button color='secondary' id='tabButton04'>CONCLUÍDOS(0)</Button>
                    </div>
                    <div id='border01'/>
                    <SchedTableRS id='tbl01'
                        delete={this.delete} schedulings={this.state.scheduling}>
                    </SchedTableRS>
                </div>
            </div>
        )
    }
}

export default withRouter(Schedules);