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
                Hi, my name is Jay, I am a web developer who is focusing on vue.js and laravel.<br/>
                <br/>
                                My current job is javascript developer at a web game developer company, my main job is to maintain or develop new functionalities for the front-end of a lottery web app. The stack is vue.js and some jquery for older projects.<br/>
                <br/>
                                My previous job is full-stack developer at a gaming platform company, where I have taken parts in two projects, one is a simple web game, and the other is a platform that provides various reports based on data retrieved through other business partner's API. Both projects were build with laravel & jquery.<br/>
                <br/>
                                I majored in Applied English in University, and scored 935 in Toeic.<br/>
                                I learned how to programming mostly from various online resources, and I did also finished a six-month training program at III(Institute for information industry).<br/>
                <br/>
                                I am keen on learning new technologies, and I take my code seriously, I always try my best to ensure its readability, scalability and non-repetitivity.<br/>
                                If you have a job that might be suitable for me, please feel free to contact me.<br/>
                                Thanks.
              </p>
              {/* <hr/>
              <CardTitle title={titles.experiances} />
              {expList}

              <CardTitle title={titles.education} />
              {educationList}

              <br/>
              <hr/> */}
              {/* <CardTitle title={titles.skills} /> */}
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

