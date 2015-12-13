import React from 'react';
import Router from 'react-router';

import Actions from './AdminsInvitationsActions';
import Store from './AdminsInvitationsStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './AdminsInvitationsListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'AdminsInvitationsList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleResendInvitation() {
    console.info('Admins::handleResendInvitation');
    Actions.resendInvitation(Store.getCheckedItems());
  },

  handleRemoveInvitation() {
    console.info('Admins::handleRemoveInvitation');
    Actions.removeInvitation(Store.getCheckedItems());
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  initDialogs() {
    let checkedAdminsInvitations = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          title: 'Resend an Invitation',
          key: 'resendInvitationDialog',
          ref: 'resendInvitationDialog',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel.bind(null, 'resendInvitationDialog')},
            {text: 'Confirm', onClick: this.handleResendInvitation}
          ],
          modal: true,
          avoidResetState: true,
          children: [
            `Do you really want to resend ${Store.getDeleteItemsPhrase('Invitation')}?`,
            this.getDialogList(checkedAdminsInvitations, 'email'),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.props.isLoading}/>
          ]
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          title: 'Delete an Invitation',
          key: 'removeInvitationDialog',
          ref: 'removeInvitationDialog',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel.bind(null, 'removeInvitationDialog')},
            {text: 'Confirm', onClick: this.handleRemoveInvitation}
          ],
          modal: true,
          avoidResetState: true,
          children: [
            `Do you really want to delete ${Store.getDeleteItemsPhrase('Invitation')}?`,
            this.getDialogList(checkedAdminsInvitations, 'email'),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.props.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.email, Actions.removeInvitation.bind(null, [item]))}
        showResendDialog={this.showMenuDialog.bind(null, item.email, Actions.resendInvitation.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container className="admins-invitations-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-xs-25 col-md-20">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete an Invitation"
                multipleItemsText="Delete Invitations"
                onTouchTap={this.showDialog.bind(null, 'removeInvitationDialog')}/>
            </Common.Lists.Menu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Common.Lists.Container>
    );
  }
});

