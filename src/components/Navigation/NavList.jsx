import React from "react";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";

function GetNavList(config, lang) {
  const NavList = [
    {
      primaryText: "Home",
      leftIcon: <FontIcon>home</FontIcon>,
      component: Link,
      to: "/"
    },
    {
      primaryText: "About Me",
      leftIcon: <FontIcon>person</FontIcon>,
      component: Link,
      to: `/${lang}/about/`
    },
    {
      primaryText: "Works",
      leftIcon: <FontIcon>mail</FontIcon>,
      component: Link,
      to: `/${lang}/works/`
    },
    {
      divider: true
    }
  ];

  if (config.userLinks) {
    config.userLinks.forEach(link => {
      NavList.push({
        primaryText: link.label,
        leftIcon: <FontIcon forceSize iconClassName={link.iconClassName} />,
        component: "a",
        href: link.url
      });
    });
  }
  return NavList;
}
export default GetNavList;
