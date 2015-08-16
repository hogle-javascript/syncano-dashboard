import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ProfileInvitationsActions';
import Store from './ProfileInvitationsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';
import EmptyContainer from '../../common/Container/EmptyContainer.react';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(Store),
    Mixins.Dialogs,
  ],

  initDialogs() {
    let checked = Store.getCheckedItems().length;

    return [
      {
        dialog: Common.Dialog,
        params: {
          ref: 'acceptInvitationsDialog',
          title: 'Accept Invitation',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Yes, I\'m sure.', onClick: this.handleAccept}
          ],
          modal: true,
          children: 'Do you really want to accept ' + checked + ' Invitations?'
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          ref: 'declineInvitationsDialog',
          title: 'Decline Invitation',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Yes, I\'m sure.', onClick: this.handleDecline}
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
    Actions.fetch();
  },

  uncheckAll() {
    console.info('ProfileInvitations::uncheckAll');
    Actions.uncheckAll();
  },

  checkItem(id, state) {
    console.info('ProfileInvitations::checkItem');
    Actions.checkItem(id, state);
  },

  handleAccept() {
    console.info('ProfileInvitations::handleAccept');
    Actions.acceptInvitations(Store.getCheckedItems());
  },

  handleDecline() {
    console.info('ProfileInvitations::handleDecline');
    Actions.declineInvitations(Store.getCheckedItems());
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='account'
          background={MUI.Styles.Colors.blue500}
          checked={item.checked}
          handleIconClick={this.checkItem}>
          {item.instance}
        </Column.CheckIcon>
        <Column.Desc>{item.inviter}</Column.Desc>
        <Column.Desc>{item.role}</Column.Desc>
        <Column.Date date={item.created_at}/>
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    let items = this.state.items.map(item => this.renderItem(item));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
  },

  render() {
    let checkedInvitations = Store.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Common.Show if={checkedInvitations > 0}>
          <Common.Fab position="top">
            <Common.Fab.ItemNew
              tooltip="Click here to unselect all"
              mini={true}
              onClick={this.uncheckAll}
              iconClassName="synicon-checkbox-multiple-marked-outline"/>
            <Common.Fab.ItemNew
              tooltip="Click here to accept Invitations"
              mini={true}
              onClick={this.showDialog.bind(null, 'acceptInvitationsDialog')}
              iconClassName="synicon-check"/>
            <Common.Fab.ItemNew
              tooltip="Click here to decline Invitations"
              mini={true}
              onClick={this.showDialog.bind(null, 'declineInvitationsDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.Loading show={this.state.isLoading}>
          <Common.Show if={this.state.items.length < 1}>
            <EmptyContainer
              icon='synicon-email-outline'
              text='You have no invitations'/>
          </Common.Show>

          <Common.Show if={this.state.items.length > 0}>
            <Common.Lists.Container>
              <Common.ColumnList.Header>
                <Column.CheckIcon.Header>Invitations</Column.CheckIcon.Header>
                <Column.Desc.Header>From</Column.Desc.Header>
                <Column.Desc.Header>Role</Column.Desc.Header>
                <Column.Date.Header>Created</Column.Date.Header>
              </Common.ColumnList.Header>
              <Common.Lists.List>
                {this.renderList()}
              </Common.Lists.List>
            </Common.Lists.Container>
          </Common.Show>
        </Common.Loading>
      </Container>
    );
  }

});
