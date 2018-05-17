import React, { Component } from "react";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import ToolbarActions from "../ToolbarActions/ToolbarActions";
import Footer from "../Footer/Footer";
import GetNavList from "./NavList";
import { navigateTo } from "gatsby-link"
import "./Navigation.scss";

class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      lang: 'en'
    }
    this.handleLangChange = this.handleLangChange.bind(this)
  }
  render() {
    const { children, config, LocalTitle } = this.props;
    const footerLinks = LocalTitle !== "About";
    return (
      <NavigationDrawer
        drawerTitle={config.siteTitle}
        toolbarTitle={LocalTitle}
        contentClassName="main-content"
        navItems={GetNavList(config, this.state.lang)}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
        toolbarActions={<ToolbarActions config={config} handleLangChange={this.handleLangChange} />}
      >
        <div className="main-container">{children}</div>
        {/* <Footer userLinks={footerLinks} /> */}
      </NavigationDrawer>
    );
  }
  handleLangChange(lang) {
    console.log(lang, lang === 'cn', lang === 'en')

    if (this.state.lang === 'en' && lang === 'cn') {
      navigateTo(window.location.pathname.replace('en', 'cn'))
    }
    else if (this.state.lang === 'cn' && lang === 'en') {
      navigateTo(window.location.pathname.replace('cn', 'en'))
    }

    this.setState({lang})
  }
}

export default Navigation;
