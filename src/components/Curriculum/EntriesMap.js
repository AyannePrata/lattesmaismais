import React from "react";
import './EntriesMap.css';

import iconWithout from '../../assets/images/WithoutProof.svg';
import iconWaiting from '../../assets/images/Waiting.svg';
import iconChecked from '../../assets/images/Proven.svg';
import iconInvalid from '../../assets/images/Invalidated.svg';

function handleMouseEnter(e) {
    e.target.classList.add('Change-color-p');
}

function handleMouseLeave(e) {
    e.target.classList.remove('Change-color-p');
}

function EntriesMap(props) {

    const iconsToLoad = (receipts, entryId) => {

        var waiting = 0;
        var checked = 0;
        var invalid = 0;

        for (const rec of receipts) {

            switch (rec.status) {
                case "WAITING_VALIDATION":
                    waiting++;
                    break;

                case "CHECKED_BY_VALIDATOR":
                    checked++;
                    break;

                case "INVALID":
                    invalid++;
                    break;
            }
        }

        var iconsToLoad = [];
        
        if(waiting + checked + invalid === 0) {
            return(
                <img className="Icons WithoutReceipt" id={`icon${entryId}`} border="0" src={iconWithout} width="30" height="30" /> 
            )
        }else {
            const icons = [iconWaiting, iconChecked, iconInvalid];
            const values = [waiting, checked, invalid];

            var countId = 1;

            values.forEach((v, i) => {
                if(v != 0){
                    const icon = 
                        <p className="Icon-and-count" key={`iconKey${entryId}${countId++}`} id={`count${entryId}${countId++}`}>
                            <img className="Icons" id={`icon${entryId}${countId++}`} border="0" src={icons[i]} width="30" height="30" />
                            {v}
                        </p>
                    
                    iconsToLoad.push(icon);
                }
            })

            return (
                iconsToLoad
            )
        }
    }

    var groupIdentified = "";

    const entries = props.entries.map((entry) => {

        if (groupIdentified != entry.group) {
            groupIdentified = entry.group;

            return (
                <div key={`group${entry.id}`}>
                    <h4>{entry.group}</h4>
                    <div className="Entry-and-icons">
                        <div className="Up-icon">
                            {iconsToLoad(entry.receipts, entry.id)}
                        </div>
                        <p key={entry.id} id={entry.id} onClick={elem => props.loadReceipts(entry.receipts, elem.target)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {entry.name}
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={entry.id} className="Entry-and-icons">
                    <div className="Up-icon">
                        {iconsToLoad(entry.receipts, entry.id)}
                    </div>
                    <p id={entry.id} onClick={elem => props.loadReceipts(entry.receipts, elem.target)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {entry.name}
                    </p>
                </div>
            )
        }

    })

    return (
        <div className="Entries-maped">
            {entries}
        </div>
    );
}
export default EntriesMap;