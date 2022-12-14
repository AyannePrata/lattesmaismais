import React from "react";

export default class FormGroup extends React.Component {

    render() {
        return (
            <div className={`form-group ${this.props.className}`}>
                <label className="col-form-label col-form-label-lg mt-4" htmlFor={this.props.htmlFor}>{this.props.label}</label>
                {this.props.children}
            </div>
        );
    }

}