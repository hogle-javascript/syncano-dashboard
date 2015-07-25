import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

import AuthActions from '../Account/AuthActions';
import HeaderStore from './HeaderStore';
import ProfileInvitationsStore from '../Profile/ProfileInvitationsStore';
import ProfileInvitationsActions from '../Profile/ProfileInvitationsActions';

import MUI from 'material-ui';
import Loading from '../../common/Loading';

export default Radium(React.createClass({

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

  componentDidMount() {
    ProfileInvitationsActions.fetch();
  },

  handleAcceptInvitations(items) {
    console.info("Header::handleAcceptInvitations");
    ProfileInvitationsActions.acceptInvitations(items);
    event.stopPropagation();
  },

  handleDeclineInvitations(items) {
    console.info("Header::handleDeclineInvitations");
    ProfileInvitationsActions.declineInvitations(items);
    event.stopPropagation();
  },

  handleResendEmail(event) {
    console.info("Header::handleResendEmail");
    AuthActions.resendActivationEmail(this.state.user.email);
    this.refs.snackbar.show();
    event.stopPropagation();
  },

  getStyles() {
    return {
      icon: {
        color    : MUI.Styles.Colors.white,
        fontSize : 21
      },

      notificationIcon: {
        color: '#ff3d00'
      },

      resendEmailLink: {
        cursor : "pointer",
        color  : MUI.Styles.Colors.lightBlueA700
      }
    }
  },

  renderItems() {
    if (this.state.user.isActive && this.state.accountInvitations.items.length > 0) {
      let icon = (
        <MUI.FontIcon
          className = {'synicon-information'}
          color     = {MUI.Styles.Colors.lightBlueA700}
        />
      )
      return (
        <MUI.ListItem
          primaryText = "You dont't have any notifications"
          disabled    = {true}
          leftIcon    = {icon}
        />
      )
    }

    let notifications = this.state.accountInvitations.items.map(item => {
      let icon = (
        <MUI.FontIcon
          className = {'synicon-share-variant'}
          color     = {MUI.Styles.Colors.lightGreen500}
        />
      ),
      content = (
        <div>
          <b>{item.inviter}</b>
          <span> invited you to their instance </span>
          <b>{item.instance}</b>
        </div>
      ),
      buttons = [
        <MUI.FlatButton
          onClick = {this.handleAcceptInvitations.bind(this, [item])}
          label   = 'Accept'
          primary = {true}
        />,
        <MUI.FlatButton
          onClick = {this.handleDeclineInvitations.bind(this, [item])}
          label   = 'Decline'
        />
      ];

      return (
        <MUI.ListItem
          disabled = {true}
          leftIcon = {icon}
        >
          {content}
          {buttons}
        </MUI.ListItem>
      );
    });

    if (!this.state.user.isActive) {
      let icon = (
        <MUI.FontIcon
          className = {'synicon-alert'}
          color     = {MUI.Styles.Colors.orange500}
        />
      ),

      resendLink = (
        <div
          style   = {this.getStyles().resendEmailLink}
          onClick = {this.handleResendEmail}
        >
          Resend activation email
        </div>
      )
      notifications.push(
        <MUI.ListItem
          primaryText   = 'Your email address is not yet verified.'
          secondaryText = {resendLink}
          disabled      = {true}
          leftIcon      = {icon}
        />
      )
    }

    return notifications;
  },

  renderIcon() {
    let notifications         = this.renderItems(),
        notificationCountIcon = null,
        iconClassName         = "synicon-",
        styles                = this.getStyles();

    if (notifications.length > 0) {
      iconClassName += 'bell';
    } else {
      iconClassName += 'bell-outline';
    }

    if (notifications.length > 0) {
      let synIconName = notifications.length < 10 ? notifications.length : "9-plus";
      notificationCountIcon = (
        <MUI.FontIcon
          className = {"synicon-numeric-" + synIconName + "-box notification-count-icon"}
          color     = {styles.notificationIcon.color}
        />
      )
    }

    return (
      <div>
        {notificationCountIcon}
        <MUI.IconButton
          iconStyle     = {styles.icon}
          iconClassName = {iconClassName}
          onClick       = {ProfileInvitationsActions.fetchInvitations}
        />
      </div>
    )
  },

  render() {
    return (
      <div>
        <MUI.IconMenu
          desktop           = {true}
          iconButtonElement = {this.renderIcon()}
        >
          <Loading show={this.state.accountInvitations.isLoading}>
            <MUI.List subheader='Notifications'>
              {this.renderItems()}
            </MUI.List>
          </Loading>
        </MUI.IconMenu>
        <MUI.Snackbar
          ref = 'snackbar'
          message = 'Activation e-mail was send'
          autoHideDuration = {3000}
        />
      </div>
    )
  }
}));
