let React = require('react');
let classNames = require('classnames');

let mui = require('material-ui');
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar;
let FontIcon = mui.FontIcon;
let FlatButton = mui.FlatButton;

let Loading = require('../../common/Loading/Loading.react');


module.exports = React.createClass({

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

  renderEmptyNotification() {
    let emptyItem = {
      subheader: "Notifications",
      subheaderStyle: {
        borderBottom: "1px solid #EAEAEA"
      },
      name: "empty-notification",
      leftIcon: {
        name: "synicon-information",
        color: "#0091EA"
      },
      content: {
        text: "You don't have any notifications",
        style: {}
      }
    };
    let icon = <FontIcon
      className={emptyItem.leftIcon.name}
      color={emptyItem.leftIcon.color}/>;

    return <List
      subheader={emptyItem.subheader}
      subheaderStyle={emptyItem.subheaderStyle}>
      <ListItem
        key={emptyItem.name}
        disableTouchTap={true}
        leftIcon={icon}>
               <span>
               {emptyItem.content.text}
               </span>
      </ListItem>
    </List>
  },

  getInvitationItems: function() {
    let invitationItems = this.props.items.filter(function(item, index) {
      return item.type === "invitation";
    });

    return invitationItems;
  },

  renderInvitationItems() {
    let invitationItems = this.getInvitationItems();
    let items = invitationItems.map(function(item) {

        let icon = <FontIcon
            className={item.leftIcon.name || null}
            color={item.leftIcon.color}
            />;
        let buttons = <div>
            <FlatButton
              onClick={item.handleAccept}
              label={item.buttonsText[0]}
              primary={true}
              />
            <FlatButton
              onClick={item.handleDecline}
              label={item.buttonsText[1]}
              />
          </div>;
        return (
          <ListItem
            leftIcon={icon}
            disabled={true}
            >
            {item.content.text}
            {buttons}
          </ListItem>
        )
      });
    return items;
  },

  getLinkItems: function() {
    let linkItems = this.props.items.filter(function(item) {
      return item.type === "normal-link";
    });

    return linkItems;
  },

  renderNormalLinkItems() {
    let linkItems = this.getLinkItems();
    let items = linkItems.map(function(item, index) {

        let icon = <FontIcon
          className={item.leftIcon.name || null}
          color={item.leftIcon.color}
          />;

        return (
          <ListItem
            disabled={true}
            key={item.name + index}
            leftIcon={icon}
            secondaryText={item.content.secondaryText}
            secondaryTextLines={item.content.secondaryTextLines || 1}
            >
            <span
              style={item.content.style}>
              {item.content.text}
            </span>
          </ListItem>
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
