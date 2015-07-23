import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import ProfileInvitationsActions from './ProfileInvitationsActions';
import ProfileInvitationsStore from './ProfileInvitationsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

export default React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(ProfileInvitationsStore),
    Mixins.Dialogs,
    HeaderMixin
  ],

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile'
    },
    {
      route: 'profile-authentication',
      label: 'Authentication'
    },
    {
      route: 'profile-billing',
      label: 'Billing'
    },
    {
      route: 'profile-invitations',
      label: 'Invitations'
    }
  ],

  initDialogs() {
    var checked = ProfileInvitationsStore.getCheckedItems().length;

    return [
      {
        dialog: Common.Dialog,
        params: {
          ref:    "acceptInvitationsDialog",
          title:  "Accept Invitation",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleAccept}
          ],
          modal: true,
          children: 'Do you really want to accept ' + checked + ' Invitations?'
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          ref  : "declineInvitationsDialog",
          title:  "Decline Invitation",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure.", onClick: this.handleDecline}
          ],
          modal: true,
          children: 'Do you really want to decline ' + checked + ' Invitations?'
        }
      }
    ]
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('ProfileInvitations::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount() {
    console.info('ProfileInvitations::componentDidMount');
    ProfileInvitationsActions.fetch();
  },

  uncheckAll() {
    console.info('ProfileInvitations::uncheckAll');
    ProfileInvitationsActions.uncheckAll();
  },

  checkItem(id, state) {
    console.info('ProfileInvitations::checkItem');
    ProfileInvitationsActions.checkItem(id, state);
  },

  handleAccept() {
    console.info('ProfileInvitations::handleAccept');
    ProfileInvitationsActions.acceptInvitations(ProfileInvitationsStore.getCheckedItems());
  },

  handleDecline() {
    console.info('ProfileInvitations::handleDecline');
    ProfileInvitationsActions.declineInvitations(ProfileInvitationsStore.getCheckedItems());
  },

  getStyles() {
    return {
      container: {
        margin       : '64px auto',
        textAlign    : 'center'
      },
      icon: {
        fontSize     : 96,
        lineHeight   : 1,
        marginBottom : 16,
        color        : 'rgba(0, 0, 0, 0.24)'
      },
      text: {
        color        : 'rgba(0, 0, 0, 0.87)',
        fontSize     : 34,
        margin       : 0
      }
    }
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked = {item.checked}
        key     = {item.id}
      >
        <Common.ColumnList.Column.CheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.checkItem}
        >
          {item.instance}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.inviter}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Desc>{item.role}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    var items = this.state.items.map(item => this.renderItem(item));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
  },

  render() {
    var styles             = this.getStyles(),
        checkedInvitations = ProfileInvitationsStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Common.Show if={checkedInvitations > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline"
            />
            <Common.Fab.Item
              label         = "Click here to accept Invitations"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'acceptInvitationsDialog')}
              iconClassName = "synicon-check"
            />
            <Common.Fab.Item
              label         = "Click here to decline Invitations"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'declineInvitationsDialog')}
              iconClassName = "synicon-delete"
            />
          </Common.Fab>
        </Common.Show>

        <Common.Loading show={this.state.isLoading}>
          <div>
            <Common.Show if={this.state.items.length < 1 && this.state.isLoading === false}>
              <div style={styles.container}>
                <MUI.FontIcon
                  style     = {styles.icon}
                  className = "synicon-email-outline" />
                <p style={styles.text}>You have no invitations</p>
              </div>
            </Common.Show>

            <Common.Show if={this.state.items.length > 0 && this.state.isLoading === false}>
              <Common.Lists.Container>
                <Common.ColumnList.Header>
                  <Common.ColumnList.Column.CheckIcon.Header>Invitations</Common.ColumnList.Column.CheckIcon.Header>
                  <Common.ColumnList.Column.Desc.Header>From</Common.ColumnList.Column.Desc.Header>
                  <Common.ColumnList.Column.Desc.Header>Role</Common.ColumnList.Column.Desc.Header>
                  <Common.ColumnList.Column.Date.Header>Created</Common.ColumnList.Column.Date.Header>
                </Common.ColumnList.Header>
                <Common.Lists.List>
                  {this.renderList()}
                </Common.Lists.List>
              </Common.Lists.Container>
            </Common.Show>
          </div>
        </Common.Loading>
      </Container>
    );
  }

});
