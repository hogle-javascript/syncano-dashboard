import React from 'react';

import MUI from 'material-ui';
import Loading from '../../common/Loading';

export default React.createClass({

  displayName: 'DropdownNotifiItem',

  propTypes: {
    items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    isLoading: React.PropTypes.bool,
    headerContent: React.PropTypes.shape({
      userFullName: React.PropTypes.string.isRequired,
      userEmail: React.PropTypes.string.isRequired,
      handleItemClick: React.PropTypes.func,                  // if "clickable" props is defined as false or
      clickable: React.PropTypes.bool                   // is not defined function will not be triggered
    })
  },

  getInvitationItems() {
    let invitationItems = this.props.items.filter((item) => item.type === 'invitation');

    return invitationItems;
  },

  getLinkItems() {
    let linkItems = this.props.items.filter((item) => item.type === 'normal-link');

    return linkItems;
  },

  renderInvitationItems() {
    let invitationItems = this.getInvitationItems();
    let items = invitationItems.map((item) => {
      let icon = (
        <MUI.FontIcon
          className={item.leftIcon.name || null}
          color={item.leftIcon.color}/>
      );

      let buttons = (
        <div>
          <MUI.FlatButton
            onClick={item.handleAccept}
            label={item.buttonsText[0]}
            primary={true}/>
          <MUI.FlatButton
            onClick={item.handleDecline}
            label={item.buttonsText[1]}/>
        </div>
      );

      return (
        <MUI.ListItem
          leftIcon={icon}
          disabled={true}>
          {item.content.text}
          {buttons}
        </MUI.ListItem>
      )
    });

    return items;
  },

  renderEmptyNotification() {
    let emptyItem = {
      subheader: 'Notifications',
      subheaderStyle: {
        borderBottom: '1px solid #EAEAEA'
      },
      name: 'empty-notification',
      leftIcon: {
        name: 'synicon-information',
        color: '#0091EA'
      },
      content: {
        text: `You don't have any notifications`,
        style: {}
      }
    };
    let icon = (
    <MUI.FontIcon
      className={emptyItem.leftIcon.name}
      color={emptyItem.leftIcon.color}/>
    );

    return (
    <MUI.List
      subheader={emptyItem.subheader}
      subheaderStyle={emptyItem.subheaderStyle}>
      <MUI.ListItem
        key={emptyItem.name}
        disableTouchTap={true}
        leftIcon={icon}>
          <span>
            {emptyItem.content.text}
          </span>
      </MUI.ListItem>
    </MUI.List>
    )
  },

  renderNormalLinkItems() {
    let linkItems = this.getLinkItems();
    let items = linkItems.map((item, index) => {
      let icon = (
        <MUI.FontIcon
          className={item.leftIcon.name || null}
          color={item.leftIcon.color}/>
      );

      return (
        <MUI.ListItem
          disabled={true}
          key={item.name + index}
          leftIcon={icon}
          secondaryText={item.content.secondaryText}
          secondaryTextLines={item.content.secondaryTextLines || 1}>
          <span
            style={item.content.style}>
            {item.content.text}
          </span>
        </MUI.ListItem>
      )
    });

    return items
  },

  renderItems() {
    let items = [];

    if (this.props.items.length === 0) {
      return this.renderEmptyNotification();
    }

    items.push(this.renderInvitationItems());
    items.push(this.renderNormalLinkItems());

    return items;
  },

  render() {
    return (
      <Loading
        show={this.props.isLoading}
        size={1}>
        {this.renderItems()}
      </Loading>
    );
  }
});
