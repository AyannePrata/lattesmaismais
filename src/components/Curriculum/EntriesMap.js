import React from "react";
import './EntriesMap.css';

function EntriesMap(props) {

    var groupIdentified = "";

    const entries = props.Entries.map((entry) => {

        var icon = "";

        switch (entry.status) {
            case "value":
                // TODO colocar casos onde já foi enviado comprovação da entry (aguardando/comprovado/inválido)
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
                    <p key={entry.id}>
                        <img className="Icons" id={`icon${entry.id}`} border="0" src={icon} width="30" height="30" />
                        {entry.name}
                    </p>
                </div>
            )
        } else {
            return (
                <p key={entry.id}>
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