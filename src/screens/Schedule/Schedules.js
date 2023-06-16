import React from 'react';
import './Schedules.css';

import SchedulingService from "../../services/SchedulingService";
import { withRouter } from 'react-router';
import SchedTableRS from '../../components/SchedulingTable/SchedTableRS';
import { Button } from 'reactstrap';
import LeftMenu from '../../components/Menu/LeftMenu';
import { showErrorMessage } from '../../components/Toastr/Toastr';


class Schedules extends React.Component {

    state = {
        schedulings: [],
        opened: [],
        accepted: [],
        refused: [],
        done: [],

        schedulingsToRender: [],

        numbOpened: 0,
        numbAccepted: 0,
        numbRefuse: 0,
        numbDone: 0,

        tabInEmphasys: "will seted to tabOpened",
    }

    constructor() {
        super();
        this.service = new SchedulingService();
    }

    componentDidMount() {
        this.find();
    }

    find = async () => {
        this.service.findAll()
            .then(response => {
                this.setState({ schedulings: response.data }, () => this.filterSolicitations());
                this.setState({tabInEmphasys: this.tabOpen});
            }).then(() => {
                this.setState({schedulingsToRender: this.state.opened});
            }).catch(error => {
                showErrorMessage("Erro ao tentar carregar solicitações de agendamento.")
                console.log(error.Response)
            });
    }

    setEmphasys = (element) => {
        // console.log(element.classList)
        if(this.state.tabInEmphasys != element) {
            element.classList.add("btn-primary");
            element.classList.remove("btn-secondary");
            this.state.tabInEmphasys.classList.add("btn-secondary");
            this.state.tabInEmphasys.classList.remove("btn-prymary");

            this.setState({tabInEmphasys: element});
        } 
    }

    filterSolicitations = () => {
        for(const solic of this.state.schedulings) {
            switch (solic.status) {
                case "OPEN":
                    this.state.opened.push(solic);
                    break;

                case "ACCEPTED":
                    this.state.accepted.push(solic);
                    break;

                case "DECLINED":
                    this.state.refused.push(solic);
                    break;

                case "DONE":
                    this.state.done.push(solic);
                    break;
                
                default:
                    showErrorMessage("A solicittação apresentta status desconhecido");
                    break;
            }
        }

        this.setState({
            numbOpened: this.state.opened,
            numbAccepted: this.state.accepted,
            numbRefuse: this.state.refused,
            numbDone: this.state.done,
        })
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

    showSchedOpened = () => {
        this.setState({schedulingsToRender: this.state.opened});
        this.setEmphasys(this.tabOpen);
    }

    showSchedAccepted = () => {
        this.setState({schedulingsToRender: this.state.accepted});
        this.setEmphasys(this.tabAccept);
    }

    showSchedRefused = () => {
        this.setState({schedulingsToRender: this.state.refused});
        this.setEmphasys(this.tabRefuse);
    }

    showSchedDoned = () => {
        this.setState({schedulingsToRender: this.state.done});
        this.setEmphasys(this.tabDone);
    }

    render() {
        return (
            <div className="Principal">
                <LeftMenu/>
                <div className="Fields Margin-1">
                    <div className='Tabs'>
                        <Button color='primary' id='tabButton01' onClick={() => this.showSchedOpened()} innerRef={elem => this.tabOpen = elem}>
                            ABERTOS({this.state.opened.length})</Button>
                        <Button color='secondary' id='tabButton02' onClick={() => this.showSchedAccepted()} innerRef={elem => this.tabAccept = elem}>
                            ACEITOS({this.state.accepted.length})</Button>
                        <Button color='secondary' id='tabButton03' onClick={() => this.showSchedRefused()} innerRef={elem => this.tabRefuse = elem}>
                            RECUSADOS({this.state.refused.length})</Button>
                        <Button color='secondary' id='tabButton04' onClick={() => this.showSchedDoned()} innerRef={elem => this.tabDone = elem}>
                            CONCLUÍDOS({this.state.done.length})</Button>
                    </div>
                    <div id='border01'/>
                    <SchedTableRS id='tbl01' delete={this.delete} schedulings={this.state.schedulingsToRender} />
                </div>
            </div>
        )
    }
}

export default withRouter(Schedules);