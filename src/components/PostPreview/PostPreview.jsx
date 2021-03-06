import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Button from "react-md/lib/Buttons";
import Avatar from "react-md/lib/Avatars";
import CardText from "react-md/lib/Cards/CardText";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";
import Media, { MediaOverlay } from "react-md/lib/Media";
import PostTags from "../PostTags/PostTags";
import "./PostPreview.scss";

class PostPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }
  render() {
    const { postInfo } = this.props;
    const { mobile } = this.state;
    const expand = mobile;
    /* eslint no-undef: "off"*/
    const cover = postInfo.cover.startsWith("/")
      ? __PATH_PREFIX__ + postInfo.cover
      : postInfo.cover;
    const coverHeight = mobile ? 217 : 372;
    const codepenEmbed = (title, hash) => {
      return (
        <p 
          data-height="600" 
          data-theme-id="dark" 
          data-slug-hash={hash} 
          data-default-tab="result" 
          data-user="rugia" 
          data-pen-title={title}
          data-preview="true" 
          className="codepen"
        >
          See the Pen <a href={`https://codepen.io/rugia/pen/${hash}/"`}>{title}</a> by Jay (<a href="https://codepen.io/rugia">@rugia</a>) on <a href="https://codepen.io">CodePen</a>.
        </p>
      )
    }
    return (
      <Card key={postInfo.path} raise className="md-grid md-cell md-cell--12">
      
        {
          postInfo.hash && codepenEmbed(postInfo.title, postInfo.hash)
        }
        {
          !postInfo.hash && 
          <Link style={{ textDecoration: "none" }} to={postInfo.path}>
            <Media
              style={{
                backgroundImage: `url(${cover})`,
                backgroundSize: 'cover',
                backgroundPositionY: 'top',
                height: `${coverHeight}px`
              }}
              className="post-preview-cover"
            >
              <MediaOverlay>
                <CardTitle title={postInfo.title}>
                  <Button raised secondary className="md-cell--right">
                    Read
                  </Button>
                </CardTitle>
              </MediaOverlay>
            </Media>
          </Link>
        }
        
        <CardTitle
          expander={expand}
          avatar={<Avatar icon={<FontIcon iconClassName="fa fa-calendar" />} />}
          title={`Published on ${postInfo.date}`}
          // subtitle={`${postInfo.timeToRead} min read`}
        />

        <CardText expandable={expand}>
          {postInfo.excerpt}
          <PostTags tags={postInfo.tags} />
        </CardText>
      </Card>
    );
  }
}

export default PostPreview;
