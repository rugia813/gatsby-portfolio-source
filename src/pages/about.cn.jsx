import React, { Component } from "react";
import Helmet from "react-helmet";
import AboutPage from "./about";
import config from "../../data/SiteConfig";

class AboutPageEn extends AboutPage {
  constructor(props) {
    super(props)
    this.lang = 'cn'
  }
}

export default AboutPageEn;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query AboutQueryCn {
    site {
      siteMetadata {
        jay {
          cn {
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