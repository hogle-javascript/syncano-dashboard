import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

import AuthActions from '../Account/AuthActions';
import HeaderStore from './HeaderStore';
import ProfileInvitationsStore from '../Profile/ProfileInvitationsStore';
import ProfileInvitationsActions from '../Profile/ProfileInvitationsActions';

import MUI from 'material-ui';
import SnackbarNotificationMixin from '../../common/SnackbarNotification/SnackbarNotificationMixin';

import MenuItem from 'material-ui/lib/menus/menu-item';
import MenuDivider from 'material-ui/lib/menus/menu-divider';


export default Radium(React.createClass({

  displayName: 'HeaderNotificationsDropdown',

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(ProfileInvitationsStore, 'accountInvitations'),
    Router.Navigation,
    Router.State,
    SnackbarNotificationMixin
  ],

  contextTypes: {
    router: React.PropTypes.func,
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    ProfileInvitationsActions.fetch();
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
        minWidth: '360px',
        paddingTop: '12px',
        paddingBottom: '12px',
        position: 'relative'
      },
      menu: {
        cursor: 'auto',
        maxHeight: '500px',
        overflowY: 'auto',
        border: '1px solid #DDD'
      }
    }
  },

  renderItems() {
    let styles = this.getStyles();

    // if (this.state.accountInvitations.isLoading === true) {
    //   return <Loading show={true}/>
    // }

    if (this.state.user.is_active && this.state.accountInvitations.items.length === 0) {
      let icon = (
        <MUI.FontIcon
          className='synicon-information'
          color={MUI.Styles.Colors.lightBlueA700}
          />
      );

      return (
        <MenuItem
          key="empty"
          primaryText="You dont't have any notifications"
          disabled={true}
          leftIcon={icon}
          style={styles.menuItem}
          />
      )
    }

    let notifications = this.state.accountInvitations.items.map((item) => {
      let icon = (
          <MUI.FontIcon
            className='synicon-share-variant'
            color={MUI.Styles.Colors.lightGreen500}
            />
        );
      let content = (
          <div>
            <strong>{item.inviter + ' '}</strong>
            invited you to their instance
            <strong>{' ' + item.instance}</strong>
          </div>
        );
      let buttons = [
        <MUI.FlatButton
          onTouchTap={this.handleAcceptInvitations.bind(this, [item])}
          label='Accept'
          primary={true}/>,
        <MUI.FlatButton
          onTouchTap={this.handleDeclineInvitations.bind(this, [item])}
          label='Decline'/>
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
            className='synicon-alert'
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
          style={styles.menuItem}>
          {resendLink}
        </MenuItem>
      )
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
          className={'synicon-numeric-' + synIconName + '-box notification-count-icon'}
          color={styles.notificationIcon.color}/>
      )
    }

    return (
      <div>
        {notificationCountIcon}
        <MUI.IconButton
          iconStyle={styles.icon}
          iconClassName={iconClassName}
          onClick={ProfileInvitationsActions.fetchInvitations}/>
      </div>
    )
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <MUI.IconMenu
          ref='headerNotificationDropdown'
          iconButtonElement={this.renderIcon()}
          onItemTouchTap={this.handleResendEmail}
          autoWidth={false}
          maxWidth='400px'
          menuStyle={styles.menu}>
          <MenuItem
            key='notificationDropdownHeader'
            primaryText='Notifications'
            disabled={true}/>
          <MenuDivider />
          {this.renderItems()}
        </MUI.IconMenu>
      </div>
    )
  }
}));
