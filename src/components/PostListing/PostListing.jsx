import React from "react";
import PostPreview from "../PostPreview/PostPreview";
import "./PostListing.scss";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    const pens = [
      {
        // tags: ['three.js'],
        title: 'fireball with three.js',
        hash: 'EbrdKj',
        date: '03/02/2018',
        excerpt: '',
      },
      {
        // tags: ['react.js'],
        title: 'Bingo Game with React',
        hash: 'dRLqja',
        date: '15/08/2017',
        excerpt: 'practice react.js',
      }
    ].forEach((e) => {
      postList.push({
        ...e,
        cover: '',
        tags: ''
      })
    })
    return postList;
  }
  componentDidMount() {
    // init codepen script
    document.getElementsByClassName||(document.getElementsByClassName=function(e){var n,t,r,a=document,o=[];if(a.querySelectorAll)return a.querySelectorAll("."+e);if(a.evaluate)for(t=".//*[contains(concat(' ', @class, ' '), ' "+e+" ')]",n=a.evaluate(t,a,null,0,null);r=n.iterateNext();)o.push(r);else for(n=a.getElementsByTagName("*"),t=new RegExp("(^|\\s)"+e+"(\\s|$)"),r=0;r<n.length;r++)t.test(n[r].className)&&o.push(n[r]);return o}),function(){function e(){function e(){for(var e=document.getElementsByClassName("codepen"),t=e.length-1;t>-1;t--){var u=a(e[t]);if(0!==Object.keys(u).length&&(u=o(u),u.user=n(u,e[t]),r(u))){var c=i(u),l=s(u,c);f(e[t],l)}}m()}function n(e,n){if("string"==typeof e.user)return e.user;for(var t=0,r=n.children.length;t<r;t++){var a=n.children[t],o=a.href||"",i=o.match(/codepen\.(io|dev)\/(\w+)\/pen\//i);if(i)return i[2]}return"anon"}function r(e){return e["slug-hash"]}function a(e){for(var n={},t=e.attributes,r=0,a=t.length;r<a;r++){var o=t[r].name;0===o.indexOf("data-")&&(n[o.replace("data-","")]=t[r].value)}return n}function o(e){return e.href&&(e["slug-hash"]=e.href),e.type&&(e["default-tab"]=e.type),e.safe&&("true"===e.safe?e.animations="run":e.animations="stop-after-5"),e}function i(e){var n=u(e),t=e.user?e.user:"anon",r="?"+l(e),a=e.preview&&"true"===e.preview?"embed/preview":"embed",o=[n,t,a,e["slug-hash"]+r].join("/");return o.replace(/\/\//g,"//")}function u(e){return e.host?c(e.host):"file:"===document.location.protocol?"https://codepen.io":"//codepen.io"}function c(e){return e.match(/^\/\//)||!e.match(/https?:/)?document.location.protocol+"//"+e:e}function l(e){var n="";for(var t in e)""!==n&&(n+="&"),n+=t+"="+encodeURIComponent(e[t]);return n}function s(e,n){var r;e["pen-title"]?r=e["pen-title"]:(r="CodePen Embed "+t,t++);var a={id:"cp_embed_"+e["slug-hash"].replace("/","_"),src:n,scrolling:"no",frameborder:"0",height:d(e),allowTransparency:"true",allowfullscreen:"true",allowpaymentrequest:"true",name:"CodePen Embed",title:r,"class":"cp_embed_iframe "+(e["class"]?e["class"]:""),style:"width: "+p+"; overflow: hidden;"},o="<iframe ";for(var i in a)o+=i+'="'+a[i]+'" ';return o+="></iframe>"}function d(e){return e.height?e.height:300}function f(e,n){if(e.parentNode){var t=document.createElement("div");t.className="cp_embed_wrapper",t.innerHTML=n,e.parentNode.replaceChild(t,e)}else e.innerHTML=n}function m(){"function"==typeof __CodePenIFrameAddedToPage&&__CodePenIFrameAddedToPage()}var p="100%";e()}function n(e){/in/.test(document.readyState)?setTimeout("window.__cp_domReady("+e+")",9):e()}var t=1;window.__cp_domReady=n,window.__CPEmbed=e,n(function(){new __CPEmbed})}();
  }
  render() {
    const postList = this.getPostList();
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle">
        <div className="md-grid md-cell--8 mobile-fix">
          {postList.map(post => (
            <PostPreview key={post.title} postInfo={post} />
          ))}
          {/* {codepenEmbed('fireball with three.js', 'EbrdKj')}
          {codepenEmbed('Bingo Game with React', 'dRLqja')} */}
        </div>
      </div>
    );
  }
}

export default PostListing;
