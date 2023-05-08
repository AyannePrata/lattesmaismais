import React from "react";
import './CardReceipt.css';
import { Button } from "reactstrap";

import iconWaiting from '../../assets/images/Waiting.svg';
import iconChecked from '../../assets/images/Proven.svg';
import iconInvalid from '../../assets/images/Invalidated.svg';
import iconRecyclebin from '../../assets/images/recyclebinEmpty.svg';

function CardReceipt(props) {

    const receiptsToCard = props.receipts.map((rec) => {

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

        if (rec.url === null) {
            return (
                <div key={`recUni${rec.id}`} className="Receipt-unique">
                    <img className="Icons Icon-Entry" border="0" src={icon} />
                    <b id={`nameRec${rec.id}`}> {rec.name} </b>
                    <b id={`extRec${rec.id}`}> {rec.extension} </b>
                    <b id={`commRec${rec.id}`}> {rec.commentary === null ? "---" : rec.commentary} </b>
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
    })

    return (
        <div className="Receipts-of-current-entry">
            {receiptsToCard}
        </div>
    )

}
export default CardReceipt;