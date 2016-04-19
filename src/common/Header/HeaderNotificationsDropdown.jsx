import React from 'react';
import Reflux from 'reflux';
import {Navigation, State} from 'react-router';
import Radium from 'radium';

import AuthActions from '../../apps/Account/AuthActions';
import SessionStore from '../../apps/Session/SessionStore';
import ProfileInvitationsStore from '../../apps/ProfileInvitations/ProfileInvitationsStore';
import ProfileInvitationsActions from '../../apps/ProfileInvitations/ProfileInvitationsActions';

import {Utils, Styles, FontIcon, MenuItem, Divider, Badge, IconButton, IconMenu} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import {SnackbarNotificationMixin} from '../../mixins';
import StandardButtons from '../Dialog/DialogStandardButtons';

export default Radium(React.createClass({
  displayName: 'HeaderNotificationsDropdown',

  contextTypes: {
    router: React.PropTypes.func,
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(ProfileInvitationsStore),
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
    const {items} = this.state;

    if (items.length <= 1) {
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
    AuthActions.resendActivationEmail(SessionStore.getUser().email);
    this.setSnackbarNotification({message: 'Activation e-mail was sent'});
    this.hasLastInvitation();
  },

  handleNotificationsIconClick() {
    console.info('Header::handleNotificationsIconClick');
    ProfileInvitationsActions.fetchInvitations();
  },

  renderItems() {
    const styles = this.getStyles();
    const {items} = this.state;
    const user = SessionStore.getUser();

    if (user && user.is_active && !items.length) {
      return (
        <MenuItem
          key="empty"
          primaryText="You don't have any notifications"
          disabled={true}
          leftIcon={
            <FontIcon
              className="synicon-information"
              color={Styles.Colors.lightBlueA700} />
          }
          style={styles.menuItem}/>
      );
    }

    let notifications = items.map((item) => {
      return (
        <div>
          <MenuItem
            key={`invitation-${item.id}`}
            disabled={true}
            leftIcon={
              <FontIcon
                key={`${item.id}Icon`}
                className="synicon-share-variant"
                color={Styles.Colors.lightGreen500} />
            }
            innerDivStyle={{opacity: 1}}
            style={styles.menuItem}>
            <div>
              <strong>{`${item.inviter} `}</strong>
              invited you to their instance
              <strong>{` ${item.instance}`}</strong>
            </div>
            <div className="vp-2-t">
              <StandardButtons
                cancelLabel="Decline"
                submitLabel="Accept"
                handleCancel={() => this.handleDeclineInvitations([item])}
                handleConfirm={() => this.handleAcceptInvitations([item])}/>
            </div>
          </MenuItem>
          <Divider/>
        </div>
      );
    });

    if (SessionStore.getUser() && !SessionStore.getUser().is_active) {
      notifications.push(
        <MenuItem
          key="resend-link"
          leftIcon={
            <FontIcon
              className="synicon-alert"
              color={Styles.Colors.orange500}/>
          }
          style={styles.menuItem}
          onTouchTap={this.handleResendEmail}>
          <div style={styles.resendEmailText}>
            Your email address is not yet verified. Click here to resend activation email.
          </div>
        </MenuItem>
      );
    }

    return notifications;
  },

  renderIcon() {
    const notifications = this.renderItems();
    const isBadge = notifications.length > 0;
    const notificationCountIcon = isBadge ? notifications.length : '';
    const iconClassName = notifications.length ? 'synicon-bell' : 'synicon-bell-outline';
    const styles = this.getStyles();
    const badgeContainerStyle = this.mergeStyles(styles.badgeContainer, isBadge && styles.badgeContainerFilled);
    const badgeStyle = this.mergeStyles(styles.badge, isBadge && styles.badgeFilled);

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
    const styles = this.getStyles();
    const {id} = this.props;
    const {isLoading} = this.state;

    return (
      <IconMenu
        id={id}
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
        <Loading show={isLoading}>
          {this.renderItems()}
        </Loading>
      </IconMenu>
  );
  }
}));
