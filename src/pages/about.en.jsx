import React, { Component } from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import About from "../components/About/About";

class AboutPageEn extends Component {
  constructor(props) {
    super(props)
    this.lang = 'en'
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

export default AboutPageEn;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query AboutQueryEn {
    site {
      siteMetadata {
        jay {
          en {
            titles {
              introduction,
              experiances,
              skills
            },
            experiances {
              company
              period
              title
              responsibility
            }
          }
        }
      }
    }
  }
`;