import React from 'react';
import Reflux from 'reflux';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import DialogsMixin from '../../mixins/DialogsMixin';
import Show from '../../common/Show/Show.react';

// Stores and Actions
import ProfileInvitationsActions from './ProfileInvitationsActions';
import ProfileInvitationsStore from './ProfileInvitationsStore';

// Components
import MUI from 'material-ui';

import FabList from '../../common/Fab/FabList.react';
import FabListItem from '../../common/Fab/FabListItem.react';
import Container from '../../common/Container/Container.react';

// List
import Lists from '../../common/Lists';
import Item from '../../common/ColumnList/Item.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

export default React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(ProfileInvitationsStore),
    HeaderMixin,
    DialogsMixin
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
        dialog: Dialog,
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
        dialog: Dialog,
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
      <Item
        checked = {item.checked}
        key     = {item.id}
      >
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.checkItem}
        >
          {item.instance}
        </ColumnCheckIcon>
        <ColumnDesc>{item.inviter}</ColumnDesc>
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate date={item.created_at} />
      </Item>
    );
  },

  renderList() {
    var items = this.state.items.map(item => {
      return this.renderItem(item);
    });

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

        <Show if={checkedInvitations > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline"
            />

            <FabListItem
              label         = "Click here to accept Invitations"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'acceptInvitationsDialog')}
              iconClassName = "synicon-check"
            />

            <FabListItem
              label         = "Click here to decline Invitations"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'declineInvitationsDialog')}
              iconClassName = "synicon-delete"
            />

          </FabList>
        </Show>

        <Loading show={this.state.isLoading}>
          <div>
            <Show if={this.state.items.length < 1 && this.state.isLoading === false}>
              <div style={styles.container}>
                <FontIcon
                  style     = {styles.icon}
                  className = "synicon-email-outline" />
                <p style={styles.text}>You have no invitations</p>
              </div>
            </Show>

            <Show if={this.state.items.length > 0 && this.state.isLoading === false}>
              <Lists.Container>
                <Header>
                  <ColumnCheckIcon.Header>Invitations</ColumnCheckIcon.Header>
                  <ColumnDesc.Header>From</ColumnDesc.Header>
                  <ColumnDesc.Header>Role</ColumnDesc.Header>
                  <ColumnDate.Header>Created</ColumnDate.Header>
                </Header>
                <Lists.List>
                  {this.renderList()}
                </Lists.List>
              </Lists.Container>
            </Show>
          </div>
        </Loading>
      </Container>
    );
  }

});
