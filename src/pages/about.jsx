import React, { Component } from "react";
import Helmet from "react-helmet";
import About from "../components/About/About";
import config from "../../data/SiteConfig";

class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.lang = ''
  }
  render() {
    const data = this.props.data.site.siteMetadata.jay[this.lang];
    const transition = this.props.transition
    return (
      <div className="about-container" style={transition && transition.style}>
        <Helmet>
          <title>{`About | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/about/`} />
        </Helmet>
        <About data={data} />
      </div>
    );
  }
}

export default AboutPage;
