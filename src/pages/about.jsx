import React, { Component } from "react";
import Helmet from "react-helmet";
import Main from "../components/Main/Main";
import config from "../../data/SiteConfig";

class AboutPage extends Component {
  render() {
    return (
      <div className="about-container">
        <Helmet>
          <title>{`About | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/main/`} />
        </Helmet>
        <Main />
      </div>
    );
  }
}

export default AboutPage;
