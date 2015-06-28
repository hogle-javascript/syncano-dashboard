var React                     = require('react'),
    Reflux                    = require('reflux'),
    Router                    = require('react-router'),
    Link                      = Router.Link,

    HeaderActions             = require('./HeaderActions'),
    HeaderStore               = require('./HeaderStore'),
    ProfileInvitationsStore   = require('../Profile/ProfileInvitationsStore'),
    ProfileInvitationsActions = require('../Profile/ProfileInvitationsActions'),

    MaterialDropdown          = require('../../common/Dropdown/MaterialDropdown.react');


module.exports = React.createClass({

  displayName: 'HeaderNotificationsDropdown',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(ProfileInvitationsStore, 'accountInvitations'),
    Router.Navigation,
    Router.State
  ],

  contextTypes: {
    router   : React.PropTypes.func.isRequired,
    muiTheme : React.PropTypes.object
  },

  componentWillMount: function () {
    ProfileInvitationsActions.fetch();
  },

  handleAccountClick: function (event) {
    this.transitionTo('profile-settings');
    event.stopPropagation();
  },

  handleLogout: function () {
    SessionActions.logout();
  },

  handleBillingClick: function (event) {
    this.transitionTo('profile-billing');
    event.stopPropagation();
  },

  handleAcceptInvitations: function (items, event) {
    console.info("Header::handleAcceptInvitations");
    ProfileInvitationsActions.acceptInvitations(items);
    event.stopPropagation();
  },

  handleDeclineInvitations: function (items, event) {
    console.info("Header::handleDeclineInvitations");
    ProfileInvitationsActions.declineInvitations(items);
    event.stopPropagation();
  },

  handleResendEmail: function (event) {
    console.info("Header::handleResendEmail");
    event.stopPropagation();
  },

  handleClickNotifications: function () {
    ProfileInvitationsActions.fetch();
  },

  getNotifiIcon: function() {
    var notifications = this.getNotificationItems();
    if (notifications.length > 0) {
      return 'bell';
    }
    return 'bell-outline';
  },

  getNotificationItems: function () {
    var notifications = [];
    notifications = this.state.accountInvitations.items.map(function (item) {
      return {
        type: "invitation",
        leftIcon: {
          name  : "synicon-share-variant",
          style : {
            color: "#8bc34a"
          }
        },
        content: {
          text   : <div><b>{item.inviter}</b><span> invited you to his instance </span><b>{item.instance}</b></div>,
          style  : {}
        },
        buttonsText: ["Accept", "Decline"],
        name: "billing",
        handleAccept: this.handleAcceptInvitations.bind(this, [item]),
        handleDecline: this.handleDeclineInvitations.bind(this, [item])
      }
    }.bind(this));

    if (!this.state.user.is_active) {
      notifications.push(
        {
          type: "normal-link",
          leftIcon: {
            name   : "synicon-alert",
            style  : {
              color: "#ff9800"
            }
          },
          content: {
            text          : "You email address is not yet verified.",
            secondaryText : "Resend activation email",
            style         : {}
          },
          name: "activation",
          handleLinkClick: this.handleResendEmail
        }
      )
    }

    if (notifications.length > 0) {
      notifications[0].subheader = "Notifications";
      notifications[0].subheaderStyle = {
        borderBottom: "1px solid #EAEAEA"
      };
    }
    return notifications;
  },

  getStyles: function() {
    return {
      bottomToolbarGroupIcon: {
        color          : '#fff'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return(
      <MaterialDropdown
        type          = "notification"
        icon          = {this.getNotifiIcon()}
        items         = {this.getNotificationItems()}
        isLoading     = {this.state.accountInvitations.isLoading}
        iconStyle     = {styles.bottomToolbarGroupIcon}
        handleOnClick = {this.handleClickNotifications}  />
    )
  }
});
