import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardText from "react-md/lib/Cards/CardText";
import UserLinks from "../UserLinks/UserLinks";
import config from "../../../data/SiteConfig";
import "./Main.scss";

class Main extends Component {
  render() {
    return (
      <div className="main-container md-grid mobile-fix">
        <Card className="md-grid md-cell--8">
          <div className="main-wrapper">
            <img
              src={config.userAvatar}
              className="main-img"
              alt={config.userName}
            />
            <CardText>
              <p className="main-text md-body-1">{config.userDescription}</p>
            </CardText>
            <UserLinks labeled config={config} />
          </div>
        </Card>
      </div>
    );
  }
}

export default Main;
