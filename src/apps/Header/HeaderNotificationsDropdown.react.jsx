var React                     = require('react'),
    Reflux                    = require('reflux'),
    Router                    = require('react-router'),
    Link                      = Router.Link,
    Radium                    = require('radium'),

    AuthActions               = require('../Account/AuthActions'),
    HeaderActions             = require('./HeaderActions'),
    HeaderStore               = require('./HeaderStore'),
    ProfileInvitationsStore   = require('../Profile/ProfileInvitationsStore'),
    ProfileInvitationsActions = require('../Profile/ProfileInvitationsActions'),

    MUI                       = require('material-ui'),
    Colors                    = MUI.Styles.Colors,
    IconMenu                  = MUI.IconMenu,
    MenuItem                  = MUI.MenuItem,
    FontIcon                  = MUI.FontIcon,
    MenuDivider               = MUI.ListDivider,
    IconButton                = MUI.IconButton,
    DropdownNotifiItem        = require("../../common/Dropdown/DropdownNotifiItem.react");


module.exports = Radium(React.createClass({

  displayName: 'HeaderNotificationsDropdown',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(ProfileInvitationsStore, 'accountInvitations'),
    Router.Navigation,
    Router.State
  ],

  contextTypes: {
    router   : React.PropTypes.func,
    muiTheme : React.PropTypes.object
  },

  componentWillMount: function () {
    ProfileInvitationsActions.fetch();
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
    AuthActions.resendActivationEmail(this.state.user.email);
    event.stopPropagation();
  },

  getStyles: function() {
    return {
      icon: {
        color : '#fff',
        fontSize: 21
      },

      notificationIcon: {
        color: '#ff3d00'
      },

      resendEmailLink: {
        cursor : "pointer",
        color  : Colors.lightBlueA700
      }
    }
  },

  getNotificationItems: function () {
    var notifications = [];
    notifications = this.state.accountInvitations.items.map(function (item) {
      return {
        type: "invitation",
        leftIcon: {
          name  : "synicon-share-variant",
          color: "#8bc34a"
        },
        content: {
          text   : <div><b>{item.inviter}</b><span> invited you to his instance </span><b>{item.instance}</b></div>,
          style  : {}
        },
        buttonsText: ["Accept", "Decline"],
        name: "invitation",
        handleAccept: this.handleAcceptInvitations.bind(this, [item]),
        handleDecline: this.handleDeclineInvitations.bind(this, [item])
      }
    }.bind(this));

    if (!this.state.user.is_active) {
      var secondaryLinkStyle = this.getStyles().resendEmailLink;
      notifications.push(
        {
          type: "normal-link",
          leftIcon: {
            name   : "synicon-alert",
            color: "#ff9800"
          },
          content: {
            text          : "You email address is not yet verified.",
            secondaryText : <div style={secondaryLinkStyle} onClick={this.handleResendEmail}>Resend activation email</div>,
            style         : {}
          },
          name: "activation"
        }
      )
    }

    return notifications;
  },

  renderIcon: function () {
    var notifications         = this.getNotificationItems(),
        notificationCountIcon = null,
        iconClassName         = "synicon-",
        styles                = this.getStyles();

    if (notifications.length > 0) {
      iconClassName += 'bell';
    } else {
      iconClassName += 'bell-outline';
    }

    if (notifications.length > 0) {
      var synIconName = notifications.length < 10 ? notifications.length : "9-plus";
      notificationCountIcon = <FontIcon
        className = {"synicon-numeric-" + synIconName + "-box notification-count-icon"}
        color     = {styles.notificationIcon.color}/>
    }

    return(
      <div>
        {notificationCountIcon}
        <IconButton iconStyle={styles.icon} iconClassName={iconClassName} />
      </div>
    )
  },

  renderItems: function (items) {
    return(
      <DropdownNotifiItem
        items={items}
        isLoading={this.props.isLoading} />
    )
  },

  render: function() {
    return(
      <IconMenu desktop={true} iconButtonElement={this.renderIcon()}>
        <MenuItem>Notifications</MenuItem>
        <MenuDivider />
        {this.renderItems(this.getNotificationItems())}
      </IconMenu>
    )
  }
}));
