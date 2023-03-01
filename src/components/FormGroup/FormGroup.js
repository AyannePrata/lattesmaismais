import React from "react";
import './FormGroup.css';

export default class FormGroup extends React.Component {

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }

}