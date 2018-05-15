import React, { Component } from "react";
// import Card from "react-md/lib/Cards/Card";
// import CardText from "react-md/lib/Cards/CardText";
import { Card, CardTitle, CardText } from 'react-md';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from 'react-md';
import UserLinks from "../UserLinks/UserLinks";
import config from "../../../data/SiteConfig";
import "./Main.scss";

class Main extends Component {
  render() {
    return (
      <div className="main-container md-grid mobile-fix">
        <Card className="md-grid md-cell--8">
          <div className="main-wrapper">
            <CardTitle title="Jay Li" subtitle="Introduction" />
            <CardText className="md-cell--12">
              <p>
                The <code>CardText</code> component is really just useful for displaying any
                content with some additional padding.
              </p>
              <hr/>
              <CardTitle title="Experiance" />

              <Card>
                <CardTitle title="Glory (2017/09 ~ present)" subtitle="Front-End Developer"/>
                <CardText>
                  <p>
                    Responsible for maintaining current projects, and develop new functionalities.
                  </p>
                </CardText>
              </Card>
              <br/>
              <Card>
                <CardTitle title="Xct (2016/10 ~ 2017/09)" subtitle="Full-Stack Developer"/>
                <CardText>
                  <p>
                    Responsible for maintaining current projects, and develop new functionalities.
                  </p>
                </CardText>
              </Card>

              <br/>
              <hr/>
              <CardTitle title="Skills" />
              <CardText>
                <p>
                  Responsible for maintaining current projects, and develop new functionalities.
                </p>
              </CardText>

            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}

export default Main;
