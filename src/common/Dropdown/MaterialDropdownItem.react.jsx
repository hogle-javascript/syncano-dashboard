import React from 'react';
import Gravatar from 'gravatar';

import MUI from 'material-ui';

export default React.createClass({

  displayName: 'MaterialDropdwonItem',

  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      leftIcon : React.PropTypes.shape({
        name   : React.PropTypes.string,
        style  : React.PropTypes.object
      }),
      subheader      : React.PropTypes.string,
      subheaderStyle : React.PropTypes.object,
      content        : React.PropTypes.shape({
        text  : React.PropTypes.string,
        style : React.PropTypes.object
      }),
      secondaryText      : React.PropTypes.string,
      secondaryTextLines : React.PropTypes.number,                // Content to view as item can be any object too
      name               : React.PropTypes.string,     // name for DropdownMenuItems kys
      handleItemClick    : React.PropTypes.func        // function to call after DropdownMenuItem click
    })),
    headerContent: React.PropTypes.shape({
      userFullName     : React.PropTypes.string,
      userEmail        : React.PropTypes.string,
      handleItemClick  : React.PropTypes.func,                  // if "clickable" props is defined as false or
      clickable        : React.PropTypes.bool                   // is not defined function will not be triggered
    })
  },

  isHeaderNecessary() {
    let headerContentProps = this.props.headerContent;

    return headerContentProps && headerContentProps.userFullName || headerContentProps.userEmail;
  },

  getStyles() {
    return {
      avatar: {
        Transform: 'translateY(-50%)',
        top: '50%'
      }
    }
  },

  renderHeaderContent() {
    let styles             = this.getStyles(),
        headerContentProps = this.props.headerContent,
        headerContentElement;

    if (this.isHeaderNecessary()) {
      let gravatarUrl   = Gravatar.url(headerContentProps.userEmail, {}, true),
          avatar        = <MUI.Avatar style={styles.avatar} src={gravatarUrl} />,
          primaryText   = headerContentProps.userFullName || headerContentProps.userEmail,
          secondaryText = headerContentProps.userFullName ? headerContentProps.userEmail : null;

      headerContentElement = (
        <MUI.ListItem
          leftAvatar      = {avatar}
          primaryText     = {primaryText}
          secondaryText   = {secondaryText}
          disableTouchTap = {!headerContentProps.clickable}
          onClick         = {headerContentProps.handleItemClick} />
      )
    }

    return headerContentElement;
  },

  renderHeaderContentDivider() {
    return this.isHeaderNecessary() ? <MUI.ListDivider /> : null;
  },

  renderItems() {
    let items = this.props.items.map((item, index) => {
      let icon = <MUI.FontIcon
                   className = {item.leftIcon.name || null}
                   style     = {item.leftIcon.style} />;
      return (
        <MUI.List
          key            = {item.name + index}
          subheader      = {item.subheader || null}
          subheaderStyle = {item.subheaderStyle}>
          <MUI.ListItem
            onClick            = {item.handleItemClick}
            leftIcon           = {icon}
            secondaryText      = {item.secondaryText}
            secondaryTextLines = {item.secondaryTextLines || 1}>
            <span style={item.content.style}>
              {item.content.text}
            </span>
          </MUI.ListItem>
        </MUI.List>
      )
    });
    return items
  },

  render() {
    return (
      <MUI.List>
        {this.renderHeaderContent()}
        {this.renderHeaderContentDivider()}
        {this.renderItems()}
      </MUI.List>
    );
  }
});
