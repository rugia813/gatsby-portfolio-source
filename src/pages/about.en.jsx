import React, { Component } from "react";
import Helmet from "react-helmet";
import About from "../components/About/About";
import config from "../../data/SiteConfig";

class AboutPage extends Component {
  render() {
    const data = this.props.data.site.siteMetadata.jay.en;
    return (
      <div className="about-container">
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