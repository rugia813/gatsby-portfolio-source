import WorksPage from './works'

class WorksPageCn extends WorksPage {
  constructor(props) {
    super(props)
    this.lang = 'cn'
  }
}

export default WorksPageCn;

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query WorksCnQuery {
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
