import React, { Component } from "react";
import Helmet from "react-helmet";
import AboutPage from "./about.en";
import config from "../../data/SiteConfig";

class AboutPageCn extends AboutPage {
  constructor(props) {
    super(props)
    this.lang = 'cn'
  }
}

export default AboutPageCn;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query AboutQueryCn {
    site {
      siteMetadata {
        jay {
          cn {
            titles {
              introduction
              experiances
              education
              skills
            },
            experiances {
              company
              period
              title
              responsibility
            },
            education {
              company
              period
              title
            }
          }
        }
      }
    }
  }
`;