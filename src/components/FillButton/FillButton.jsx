import React, { Component } from "react";
import "./FillButton.scss";

class FillButton extends Component {
  render() {
    return (
        <div className="primaryBtn">
            <button className="border">
            <div className="filler">
                <div className="text">{this.props.text}</div>
            </div>
            </button>
            <button className="border rearBtn">
                <div className="filler"></div>
            </button>
        </div>
    );
  }
}

export default FillButton;

