import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardText from "react-md/lib/Cards/CardText";
import UserLinks from "../UserLinks/UserLinks";
import FillButton from '../FillButton/FillButton'
import config from "../../../data/SiteConfig";
import "./Main.scss";

class Main extends Component {
  render() {
    const name  = this.makeGrowText('Jay Li')
    return (
      <div className="index-container md-grid mobile-fix">
        <div className="md-grid md-cell--8">
          <div className="main-wrapper">
            {/* <img
              src={config.userAvatar}
              className="main-img"
              alt={config.userName}
            /> */}
            
            <div className="intro">
              <div className="intro-author">{ name }</div>
              <div className="intro-occupation">Web Developer</div>
            </div>
            
            {/* <CardText>
              <p className="main-text md-body-1">{config.userDescription}</p>
            </CardText> */}
            {/* <UserLinks labeled config={config} /> */}
            {/* <FillButton text="Enter" /> */}
          </div>
        </div>
      </div>
    );
  }
  makeGrowText(str) {
    return str.split('').map((e) => <span className="grow" key={e}>{e}</span>)
  }
}

export default Main;
