import React, { useEffect, useState } from "react";
import './CardReceipt.css';
import { Button } from "reactstrap";

import iconWaiting from '../../assets/images/Waiting.svg';
import iconChecked from '../../assets/images/Proven.svg';
import iconInvalid from '../../assets/images/Invalidated.svg';
import iconRecyclebin from '../../assets/images/recyclebinEmpty.svg';

import { createLinkToRead } from "../../services/ServerService";
import { showErrorMessage, showSuccessMessage } from "../../components/Toastr/Toastr";
import AuthenticationApiService from "../../services/AuthenticationApiService";

const authService = new AuthenticationApiService();

//TODO realizar import de ícones usados ao invés de trazê-los via props
function CardReceipt(props) {

    const [receipts, setReceipts] = useState([]);

    useEffect(() => {

        const createCard = async () => {

            const receiptsToCard = await Promise.all(props.receipts.map(async rec => {

                var icon = "";

                switch (rec.status) {

                    case "WAITING_VALIDATION":
                        icon = iconWaiting;
                        break;

                    case "CHECKED_BY_VALIDATOR":
                        icon = iconChecked;
                        break;

                    case "INVALID":
                        icon = iconInvalid;
                        break;
                }

                if (rec.url == null) {

                    let readLink;
                    if(!`${rec.id}`.includes("new")) {
                        if(rec.heritage) {
                            readLink = await createLinkToRead(authService.getLoggedUser().id, "","", rec.heritage);
                        } else {
                            readLink = await createLinkToRead(authService.getLoggedUser().id, rec.id, rec.extension);
                        }
                    }

                    return (
                        <div key={`recUni${rec.id}`} className="Receipt-unique">
                            <div className="UR-icon Subdivs-in-receipts">
                                <img className="Icons Icon-Entry" border="0" src={icon} />
                            </div>
                            <div className="UR-link Subdivs-in-receipts">
                                {/* "rel" é usado como uma medida de segurança para evitar ataques de phishing. */}
                                <a href={readLink} target="_blank" rel="noopener noreferrer"> {rec.name} </a>
                            </div>
                            <div className="UR-extension Subdivs-in-receipts">
                                <b id={`extRec${rec.id}`}> {rec.extension} </b>
                            </div>
                            <div className="UR-comment Subdivs-in-receipts">
                                <b id={`commRec${rec.id}`}> {(rec.commentary === "") ? "---" : `"${rec.commentary}"`} </b>
                            </div>
                            <Button id={`btRec${rec.id}`} onClick={() => { props.deleteMethod(rec.id, true) }} color="danger" size="sm" >
                                <img className="Icons Icon-Entry" src={iconRecyclebin} />
                            </Button>
                        </div>
                    )
                } else {
                    return (
                        <div key={`recUni${rec.id}`} className="Receipt-unique">
                            <img className="Icons Icon-Entry" border="0" src={icon} />
                            <b id={`commRec${rec.id}`}> {rec.commentary === null ? "---" : rec.commentary} </b>
                            <a href={rec.url} target="_blank"> Link para comprovação eletrônica </a>
                            <Button id={`btRec${rec.id}`} onClick={() => { props.deleteMethod(rec.id, false) }} color="danger" size="sm" >
                                <img className="Icons Icon-Entry" src={iconRecyclebin} />
                            </Button>
                        </div>
                    )
                }
            }));

            setReceipts(receiptsToCard);
        };

        createCard();

        // atualiza sempre que alterações forem feitas na lista de receipts passadas como propriedade
    }, [props.receipts, props.update]);


    return (
        <div className="Receipts-of-current-entry">
            {receipts}
        </div>
    )

}
export default CardReceipt;