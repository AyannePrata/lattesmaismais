import React from "react";
import './LoadingComp.css';

import gif from '../../assets/images/gif-lattes2.gif';

export default class LoadingComp extends React.Component {

    render() {
        if (this.props.render) {
            return (
                <div className="Gif-back">
                    <div className="Gif-content">
                        <img src={gif} id="GifImageLoading"/>
                    </div>
                </div>
            )
        }
    }
}