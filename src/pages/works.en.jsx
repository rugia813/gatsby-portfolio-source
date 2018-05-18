import WorksPage from './works'

class WorksPageEn extends WorksPage {
  constructor(props) {
    super(props)
    this.lang = 'en'
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
