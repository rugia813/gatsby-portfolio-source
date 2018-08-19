import React from "react";
import Helmet from "react-helmet";
import Main from "../components/Main/Main";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    return (
      <div className="index-container">
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>
        <Main />
      </div>
    );
  }
}

export default Index;
