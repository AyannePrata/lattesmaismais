import React, { useState, useEffect } from "react";
import './SchedulingCard.css';

import { Button } from "reactstrap";

import { SOLICITATIONLIST } from "../Menu/LeftMenu";
import StorageService from "../../services/StorageService";
import UserApiService from '../../services/UserApiService';
import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";

const storage = new StorageService();
const userService = new UserApiService();

function dateFormatter(date) {
    // yyyy-mm-dd
    const array = date.split("-");
    return `${array[2]}/${array[1]}/${array[0]}`;
}

function buttonsOrText(methAccept, methDecline, solicitation, editOption, methEdit) {

    let element;

    if (solicitation.status == "OPEN") {
        element = (
            <div className="Buttons">
                <Button onClick={() => methAccept(solicitation)} color="primary" size="lg" > CONFIRMAR </Button>
                <Button onClick={() => methDecline(solicitation)} color="danger" size="lg" id="buttRefuse" > RECUSAR </Button>
            </div>
        );

    } else {
        let decision;
        if (solicitation.status == "ACCEPTED") {
            decision = "Aceita";
        } else if (solicitation.status == "DECLINED") {
            decision = "Recusada";
        } else if (solicitation.status == "DONE") {
            decision = "Resolvida";
        }

        if(editOption) {
            element = (
                <div className="Edit">
                    <Button onClick={() => methEdit(solicitation)} color="success" size="lg" > AVALIAR </Button>
                </div>
            );
        } else {
            element = (
                <div className="Solicitation-resolved">
                    <h3>Solicitação: {decision}</h3>
                </div>
            );
        }

    }

    return element;
}

function SchedulingCard(props) {
    const [cardsMaped, setCards] = useState([]);

    /**
     * array vazio como segundo argumento, indica que essa função deve ser executada apenas uma única vez,
     * no momento da montagem do componente.
     */
    useEffect(() => {
        async function createSolicitationCards() {

            let array = storage.getItem(SOLICITATIONLIST);

            if(props.editOption) {
                array = array.filter(solicitation => solicitation.status == "ACCEPTED");
            }

            const arrayCards = await Promise.all(array.map(async solicitation => {

                const user = await userService.find(`/${solicitation.requesterId}`)
                .then(response => {
                    return response.data;
                }).catch(error => {
                    showErrorMessage("Erro ao tentar encontrar usuário solicitante!");
                    console.log(error);
                });

                return (
                    <div key={solicitation.id} className="Card-solicitation">
                        <div className="Date-time">
                            <h3>{dateFormatter(solicitation.date)}</h3>
                            <h3>{solicitation.time}</h3>
                        </div>
                        <div className="Requester-info">
                            <h3>{user.name}</h3>
                            <h3>{solicitation.version}</h3>
                        </div>
                        {/* dependendo do status da solicitação, são gerados botões ou um aviso sobre decisão tomada */}
                        {buttonsOrText(props.inAcceptSolicitation, props.inDeclineSolicitation, solicitation, props.editOption, props.methEdit)}
                    </div>
                )
            }));

            setCards(arrayCards);
        }

        createSolicitationCards();
    }); // ,[])

    return (
        <div className="All-scheduling-cards">
            {cardsMaped}
        </div>
    )
}

export default SchedulingCard;