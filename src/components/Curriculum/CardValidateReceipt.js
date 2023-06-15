import React, { useEffect, useState } from "react";
import './CardValidateReceipt.css';

import { Button } from "reactstrap";

import iconValidated from '../../assets/images/Proven.svg';
import iconInvalidated from '../../assets/images/Invalidated.svg';
import iconWaiting from '../../assets/images/Waiting.svg';

function setIcon(recStatus) {
    switch (recStatus) {
        case "CHECKED_BY_VALIDATOR":
            return iconValidated;
        case "newDecision_CHECKED_BY_VALIDATOR":
            return iconValidated;

        case "INVALID":
            return iconInvalidated;
        case "newDecision_INVALID":
            return iconInvalidated;

        case "WAITING_VALIDATION":
            return iconWaiting;
    }
}

function buttonsOrText(receipt, methAccept, methDecline, methUndo) {
    let element;
    if(receipt.status != "CHECKED_BY_VALIDATOR") {
        if(receipt.status.includes("newDecision")) {
            element = (
                <div className="Button-undo-action">
                    <Button color="warning" size="lg" onClick={() => methUndo(receipt)}> DESFAZER </Button>
                </div>
            )

        } else {
            element = (
                <div className="Buttons-validator-actions">
                    <Button color="primary" size="lg" onClick={() => methAccept(receipt)}>VALIDAR</Button>
                    <Button className="Btt-space-before" color="danger" size="lg" onClick={() => methDecline(receipt)}>Invalidar</Button>
                </div>
            );
        }
    } else {
        element = (
            <b>Comprovante já validado</b>
        )
    }

    return element;
}

function CardValidateReceipt(props) {

    const receipts = props.receiptList.map(receipt => {

        return (
            <div key={receipt.id} className="Receipt-card">
                <img className="Icons Icon-Entry" src={setIcon(receipt.status)}/>
                <a href="colocarLink" target="_blank">Lik de verificação</a>
                <b>{receipt.commentary != null ? `"${receipt.commentary}"` : "---"}</b>
                {buttonsOrText(receipt, props.acceptReceipt, props.declineReceipt, props.undoDecision)}
            </div>
        )
    });

    return (
        <div className="Receipts-to-analyse">
            {receipts}
        </div>
    )
}
export default CardValidateReceipt;