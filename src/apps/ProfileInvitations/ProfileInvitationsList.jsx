import React from 'react';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ProfileInvitationsActions';
import Store from './ProfileInvitationsStore';

// Components
import {FlatButton, MenuItem} from 'syncano-material-ui';
import {ColumnList} from 'syncano-components';
import {Container, Dialog, Lists} from '../../common';
import ListItem from './ProfileInvitationsListItem';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ProfileInvitationsList',

  mixins: [DialogsMixin],

  componentWillUpdate(nextProps) {
    console.info('ProfileInvitations::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleAccept() {
    console.info('ProfileInvitations::handleAccept');
    Actions.acceptInvitations(Store.getCheckedItems());
  },

  handleDecline() {
    console.info('ProfileInvitations::handleDecline');
    Actions.declineInvitations(Store.getCheckedItems());
  },

  initDialogs() {
    return [
      {
        dialog: Dialog,
        params: {
          key: 'acceptInvitationsDialog',
          ref: 'acceptInvitationsDialog',
          title: 'Accept an Invitation',
          actions: [
            <FlatButton
              label="Cancel"
              secondary={true}
              onTouchTap={this.handleCancel.bind(null, 'acceptInvitationsDialog')}/>,
            <FlatButton
              label="Confirm"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleAccept}/>
          ],
          modal: true,
          children: `Do you really want to accept ${Store.getDeleteItemsPhrase('Invitation')}?`
        }
      },
      {
        dialog: Dialog,
        params: {
          key: 'declineInvitationsDialog',
          ref: 'declineInvitationsDialog',
          title: 'Decline an Invitation',
          actions: [
            <FlatButton
              label="Cancel"
              secondary={true}
              onTouchTap={this.handleCancel.bind(null, 'declineInvitationsDialog')}/>,
            <FlatButton
              label="Confirm"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleDecline}/>
          ],
          modal: true,
          children: `Do you really want to decline ${Store.getDeleteItemsPhrase('Invitation')}?`
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`profile-invitations-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showAcceptDialog={() => this.showDialog('acceptInvitationsDialog', item)}
        showDeclineDialog={() => this.showDialog('declineInvitationsDialog', item)}
        />
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            Instance
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">From</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Accept an Invitation"
                multipleItemsText="Accept Invitations"
                onTouchTap={() => this.showDialog('acceptInvitationsDialog')}/>
              <Lists.MenuItem
                singleItemText="Decline an Invitation"
                multipleItemsText="Decline Invitations"
                onTouchTap={() => this.showDialog('declineInvitationsDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="profile-invitations-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
