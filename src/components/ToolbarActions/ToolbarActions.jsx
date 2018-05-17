import React, { Component } from "react";
import { Button, MenuButton, FontIcon } from "react-md";
import UserLinks from "../UserLinks/UserLinks";
import "./ToolbarActions.scss";

class Toolbar extends Component {
  render() {
    const { config } = this.props;
    
    return (
      <div className="toolbar-actions">
        <div className="userlinks-container">
          <MenuButton
            id="lang-menu"
            anchor={{
              x: MenuButton.HorizontalAnchors.CENTER,
              y: MenuButton.VerticalAnchors.BOTTOM,
            }}
            position={MenuButton.Positions.BELOW}
            flat
            primary
            menuItems={[{
              primaryText: 'English',
              onClick: () => this.props.handleLangChange('en'),
            }, {
              primaryText: '中文',
              onClick: () => this.props.handleLangChange('cn'),
            }]}
          >
            <FontIcon>translate</FontIcon>
          </MenuButton>
        </div>
        <div className="userlinks-container">
          <UserLinks config={config} />
        </div>
      </div>
    );
  }
}

export default Toolbar;
