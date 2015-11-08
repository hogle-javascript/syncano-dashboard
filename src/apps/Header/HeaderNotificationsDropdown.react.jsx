import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

import AuthActions from '../Account/AuthActions';
import HeaderStore from './HeaderStore';
import ProfileInvitationsStore from '../Profile/ProfileInvitationsStore';
import ProfileInvitationsActions from '../Profile/ProfileInvitationsActions';

import MUI from 'syncano-material-ui';
import SnackbarNotificationMixin from '../../common/SnackbarNotification/SnackbarNotificationMixin';

import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import MenuDivider from 'syncano-material-ui/lib/menus/menu-divider';
import Loading from '../../common/Loading';

export default Radium(React.createClass({

  displayName: 'HeaderNotificationsDropdown',

  contextTypes: {
    router: React.PropTypes.func,
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(ProfileInvitationsStore, 'accountInvitations'),
    Router.Navigation,
    Router.State,
    SnackbarNotificationMixin
  ],

  componentDidMount() {
    ProfileInvitationsActions.fetch();
  },

  getStyles() {
    return {
      icon: {
        color: MUI.Styles.Colors.white,
        fontSize: 21
      },
      notificationIcon: {
        color: '#ff3d00'
      },
      resendEmailText: {
        cursor: 'pointer',
        color: MUI.Styles.Colors.lightBlueA700
      },
      menuItem: {
        whiteSpace: 'normal',
        lineHeight: '24px',
        color: '#777',
        minWidth: '400px',
        paddingTop: '12px',
        paddingBottom: '12px',
        position: 'relative'
      },
      menu: {
        cursor: 'auto',
        maxHeight: '500px',
        overflowY: 'auto',
        border: '1px solid #DDD',
        minWidth: '400px'
      }
    };
  },

  hasLastInvitation() {
    if (this.state.accountInvitations.items.length <= 1) {
      this.refs.headerNotificationDropdown.close();
    }
  },

  handleAcceptInvitations(items) {
    console.info('Header::handleAcceptInvitations');
    ProfileInvitationsActions.acceptInvitations(items);
    event.stopPropagation();
    this.hasLastInvitation();
  },

  handleDeclineInvitations(items) {
    console.info('Header::handleDeclineInvitations');
    ProfileInvitationsActions.declineInvitations(items);
    event.stopPropagation();
    this.hasLastInvitation();
  },

  handleResendEmail() {
    console.info('Header::handleResendEmail');
    AuthActions.resendActivationEmail(this.state.user.email);
    this.setSnackbarNotification({
      message: 'Activation e-mail was send',
      autoHideDuration: 3000
    });
    this.hasLastInvitation();
  },

  handleNotificationsIconClick() {
    console.info('Header::handleNotificationsIconClick');
    ProfileInvitationsActions.fetchInvitations();
  },

  renderItems() {
    let styles = this.getStyles();

    if (this.state.user.is_active && this.state.accountInvitations.items.length === 0) {
      let icon = (
        <MUI.FontIcon
          className="synicon-information"
          color={MUI.Styles.Colors.lightBlueA700}/>
      );

      return (
        <MenuItem
          key="empty"
          primaryText="You don't have any notifications"
          disabled={true}
          leftIcon={icon}
          style={styles.menuItem}/>
      );
    }

    let notifications = this.state.accountInvitations.items.map((item) => {
      let icon = (
        <MUI.FontIcon
          key={`${item.id}Icon`}
          className="synicon-share-variant"
          color={MUI.Styles.Colors.lightGreen500}/>
      );
      let content = (
        <div>
          <strong>{`${item.inviter} `}</strong>
            invited you to their instance
          <strong>{` ${item.instance}`}</strong>
        </div>
      );
      let buttons = [
        <MUI.FlatButton
          key={`${item.id}ButtonAccept`}
          onTouchTap={this.handleAcceptInvitations.bind(this, [item])}
          label="Accept"
          primary={true}/>,
        <MUI.FlatButton
          key={`${item.id}ButtonDecline`}
          onTouchTap={this.handleDeclineInvitations.bind(this, [item])}
          label="Decline"/>
      ];

      return (
        <MenuItem
          key={`invitation-${item.id}`}
          disabled={true}
          leftIcon={icon}
          innerDivStyle={{opacity: 1}}
          style={styles.menuItem}>
          {content}
          {buttons}
        </MenuItem>
      );
    });

    if (!this.state.user.is_active) {
      let icon = (
        <MUI.FontIcon
          className="synicon-alert"
          color={MUI.Styles.Colors.orange500}/>
      );

      let resendLink = (
        <div style={this.getStyles().resendEmailText}>
          Your email address is not yet verified. Click here to resend activation email.
        </div>
      );

      notifications.push(
        <MenuItem
          key="resend-link"
          leftIcon={icon}
          style={styles.menuItem}
          onTouchTap={this.handleResendEmail}>
          {resendLink}
        </MenuItem>
      );
    }

    return notifications;
  },

  renderIcon() {
    let notifications = this.renderItems();
    let notificationCountIcon = null;
    let iconClassName = 'synicon-';
    let styles = this.getStyles();

    if (notifications.length > 0) {
      iconClassName += 'bell';
    } else {
      iconClassName += 'bell-outline';
    }

    if (notifications.length > 0) {
      let synIconName = notifications.length < 10 ? notifications.length : '9-plus';

      notificationCountIcon = (
        <MUI.FontIcon
          className={`synicon-numeric-${synIconName}-box notification-count-icon`}
          color={styles.notificationIcon.color}/>
      );
    }

    return (
      <div>
        {notificationCountIcon}
        <MUI.IconButton
          iconStyle={styles.icon}
          iconClassName={iconClassName}
          onTouchTap={this.handleNotificationsIconClick}/>
      </div>
    );
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <MUI.IconMenu
          ref="headerNotificationDropdown"
          iconButtonElement={this.renderIcon()}
          autoWidth={false}
          maxWidth="400px"
          menuStyle={styles.menu}>
          <MenuItem
            key="notificationDropdownHeader"
            primaryText="Notifications"
            disabled={true}/>
          <MenuDivider />
          <Loading show={this.state.accountInvitations.isLoading}>
            {this.renderItems()}
          </Loading>
        </MUI.IconMenu>
      </div>
    );
  }
}));
