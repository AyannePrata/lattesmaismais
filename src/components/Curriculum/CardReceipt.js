import React from "react";
import './CardReceipt.css';
import { Button } from "reactstrap";

function CardReceipt(props) {

    const iconWaiting = props.iconWaiting;
    const iconChecked = props.iconChecked;
    const iconInvalid = props.iconInvalid;

    const iconRecyclebin = props.iconReciclebin;

    const receiptsToCard = props.receipts.map((rec) => {

        if(rec.url === null) {

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
            //TODO
            return(
                <div key={`recUni${rec.id}`} className="Receipt-unique">
                    <img className="Icons Icon-Entry" border="0" src={icon} />
                    <b id={`nameRec${rec.id}`}> {rec.name} </b>
                    <b id={`extRec${rec.id}`}> {rec.extension} </b>
                    <b id={`commRec${rec.id}`}> {rec.commentary === null ? "---" : rec.commentary} </b>
                    <Button id={`btRec${rec.id}`} onClick={() => {props.deleteMethod(rec.id)}} color="danger" size="sm" >
                        <img className="Icons Icon-Entry" src={iconRecyclebin} />
                    </Button>
                </div>
            )
        }else {
            return(
                <div key={`recUni${rec.id}`} className="Receipt-unique">
                    <a href={rec.url} target="_blank"> Link para comprovação eletrônica </a>
                    <Button id={`btRec${rec.id}`} onClick={() => {props.deleteMethod(rec.id)}} color="danger" size="sm" >
                        <img className="Icons Icon-Entry" src={iconRecyclebin} />
                    </Button>
                </div>
            )
        }
    })

    return(
        <div className="Receipts-of-current-entry">
            {receiptsToCard}
        </div>
    )

}
export default CardReceipt;