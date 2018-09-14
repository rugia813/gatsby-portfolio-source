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
import "./About.scss";
import Skills from './Skills'

class About extends Component {
  render() {
    const data = this.props.data
    const titles = data.titles
    const experiances = data.experiances
    const education = data.education
    
    const expList = experiances.map(exp => (
      <div key={exp.company}>
        <Card>
          <CardTitle title={`${exp.company} (${exp.period})`} subtitle={exp.title}/>
          <CardText>
            <p>
              {exp.responsibility}
            </p>
          </CardText>
        </Card>
        <br/>
      </div>
    ))
    const educationList = education.map(exp => (
      <div key={exp.company}>
        <Card>
          <CardTitle title={`${exp.company} (${exp.period})`} subtitle={exp.title}/>
        </Card>
        <br/>
      </div>
    ))
    return (
      <div className="index-container md-grid mobile-fix">
        <Card className="md-grid md-cell--10">
          <div className="about-wrapper">
            <CardTitle title="Jay Li" subtitle={titles.introduction} />
            <CardText className="md-cell--12">
              <p>
                The <code>CardText</code> component is really just useful for displaying any
                content with some additional padding.
              </p>
              {/* <hr/>
              <CardTitle title={titles.experiances} />
              {expList}

              <CardTitle title={titles.education} />
              {educationList}

              <br/>
              <hr/> */}
              <CardTitle title={titles.skills} />
              <CardText>
                <Skills data={data}></Skills>
              </CardText>

            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}

export default About;

