import React from "react";
import './EntriesMap.css';

function handleMouseEnter(e) {
    e.target.classList.add('Change-color-p');
}

function handleMouseLeave(e) {
    e.target.classList.remove('Change-color-p');
}

function EntriesMap(props) {
    
    var groupIdentified = "";

    const entries = props.entries.map((entry) => {

        var icon = "";

        switch (entry.status) {
            case "WAITING_VALIDATION":
                icon = props.iconWaiting;
                break;

            case "CHECKED_BY_VALIDATOR":
                icon = props.iconChecked;
                break;
                
            case "INVALID":
                icon = props.iconInvalid;
                break;
        
            default:
                icon = props.iconWithoutReceipt;
                break;
        }
        
        if(groupIdentified != entry.group){
            groupIdentified = entry.group;
            
            return(
                <div key={`group${entry.id}`}>
                    <h4>{entry.group}</h4>
                    <p key={entry.id} id={entry.id} onClick={() => props.loadReceipts(entry.receipts)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <img className="Icons" id={`icon${entry.id}`} border="0" src={icon} width="30" height="30" />
                        {entry.name}
                    </p>
                </div>
            )
        } else {
            return (
                <p key={entry.id} id={entry.id} onClick={() => props.loadReceipts(entry.receipts)}onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img className="Icons" id={`icon${entry.id}`} border="0" src={icon} width="30" height="30" />
                    {entry.name}
                </p>
            )
        }

    })

    return(
        <div className="Entries-maped">
            {entries}
        </div>
    );
}
export default EntriesMap;