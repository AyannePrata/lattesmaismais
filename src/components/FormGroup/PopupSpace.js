import React from "react";
import './PopupSpace.css';

export default class PopupSpace extends React.Component {

    render() {
        if (this.props.render) {
            return (
                <div className="Popup-2">
                    <div className={`Popup-content-2 ${this.props.className}`}>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }
}