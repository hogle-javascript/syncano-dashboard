import React from 'react';
import Reflux from 'reflux';
import {Navigation, State} from 'react-router';
import Radium from 'radium';

import AuthActions from '../Account/AuthActions';
import HeaderStore from './HeaderStore';
import ProfileInvitationsStore from '../ProfileInvitations/ProfileInvitationsStore';
import ProfileInvitationsActions from '../ProfileInvitations/ProfileInvitationsActions';

import {Utils, Styles, FontIcon, FlatButton, MenuItem, Divider, Badge, IconButton, IconMenu} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {SnackbarNotificationMixin} from '../../mixins';

export default Radium(React.createClass({

  displayName: 'HeaderNotificationsDropdown',

  contextTypes: {
    router: React.PropTypes.func,
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(HeaderStore),
    Reflux.connect(ProfileInvitationsStore, 'accountInvitations'),
    Navigation,
    State,
    SnackbarNotificationMixin,
    Utils.Styles
  ],

  componentDidMount() {
    ProfileInvitationsActions.fetch();
  },

  getStyles() {
    return {
      icon: {
        color: Styles.Colors.white,
        fontSize: 21
      },
      badgeContainer: {
        padding: '0'
      },
      badgeContainerFilled: {
        padding: '0 6px 0 0'
      },
      badge: {
        backgroundColor: 'transparent',
        color: '#fff'
      },
      badgeFilled: {
        background: this.context.muiTheme.rawTheme.palette.accent2Color
      },
      resendEmailText: {
        cursor: 'pointer',
        color: Styles.Colors.lightBlueA700,
        lineHeight: '48px'
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
      message: 'Activation e-mail was sent',
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
        <FontIcon
          className="synicon-information"
          color={Styles.Colors.lightBlueA700}/>
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
        <FontIcon
          key={`${item.id}Icon`}
          className="synicon-share-variant"
          color={Styles.Colors.lightGreen500}/>
      );
      let content = (
        <div>
          <strong>{`${item.inviter} `}</strong>
          invited you to their instance
          <strong>{` ${item.instance}`}</strong>
        </div>
      );
      let buttons = [
        <FlatButton
          key={`${item.id}ButtonAccept`}
          onTouchTap={this.handleAcceptInvitations.bind(this, [item])}
          label="Accept"
          primary={true}/>,
        <FlatButton
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
        <FontIcon
          className="synicon-alert"
          color={Styles.Colors.orange500}/>
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
    let isBadge = notifications.length > 0;
    let notificationCountIcon = isBadge ? notifications.length : '';
    let iconClassName = notifications.length > 0 ? 'synicon-bell' : 'synicon-bell-outline';
    let styles = this.getStyles();
    let badgeContainerStyle = this.mergeStyles(styles.badgeContainer, isBadge && styles.badgeContainerFilled);
    let badgeStyle = this.mergeStyles(styles.badge, isBadge && styles.badgeFilled);

    return (
      <div>
        <Badge
          badgeContent={notificationCountIcon}
          style={badgeContainerStyle}
          badgeStyle={badgeStyle}>
          <IconButton
            iconStyle={styles.icon}
            iconClassName={iconClassName}
            onTouchTap={this.handleNotificationsIconClick}/>
        </Badge>
      </div>
    );
  },

  render() {
    let styles = this.getStyles();

    return (
      <IconMenu
        id={this.props.id}
        ref="headerNotificationDropdown"
        iconButtonElement={this.renderIcon()}
        autoWidth={false}
        maxWidth="400px"
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'middle'
        }}
        targetOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        menuStyle={styles.menu}>
        <MenuItem
          key="notificationDropdownHeader"
          primaryText="Notifications"
          disabled={true}/>
        <Divider/>
        <Loading show={this.state.accountInvitations.isLoading}>
          {this.renderItems()}
        </Loading>
      </IconMenu>
  );
  }
}));
