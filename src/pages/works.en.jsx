import React, { Component } from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

class WorksPageEn extends React.Component {
  constructor(props) {
    super(props)
    this.lang = 'en'
  }
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="index-container">
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>
        <SEO postEdges={postEdges} />
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

export default WorksPageEn;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query WorksEnQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
