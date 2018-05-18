import React, { Component } from "react";
import Helmet from "react-helmet";
import AboutPage from "./about";
import config from "../../data/SiteConfig";

class AboutPageEn extends AboutPage {
  constructor(props) {
    super(props)
    this.lang = 'en'
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