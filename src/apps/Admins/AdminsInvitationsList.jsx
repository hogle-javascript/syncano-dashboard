import React from 'react';
import Router from 'react-router';

import Actions from './AdminsInvitationsActions';
import Store from './AdminsInvitationsStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './AdminsInvitationsListItem';
import {Dialog, ColumnList, Lists} from '../../common';

let Column = ColumnList.Column;

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

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  initDialogs() {
    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'resendInvitationDialog',
          ref: 'resendInvitationDialog',
          title: 'Resend an Invitation',
          handleConfirm: Actions.resendInvitation,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          actionName: 'resend',
          groupName: 'Channel'
        }
      },
      {
        dialog: Dialog.Delete,
        params: {
          key: 'removeInvitationDialog',
          ref: 'removeInvitationDialog',
          title: 'Delete an Invitation',
          handleConfirm: Actions.removeInvitation,
          isLoading: this.props.isLoading,
          items: Store.getCheckedItems(),
          itemLabelName: 'email',
          groupName: 'Channel'
        }
      }
    ];
  },

  renderItem(item, index) {
    return (
      <ListItem
        key={`admins-invitations-list-item-${index}`}
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeInvitationDialog', item)}
        showResendDialog={this.showDialog.bind(null, 'resendInvitationDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="admins-invitations-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-xs-25 col-md-20">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete an Invitation"
                multipleItemsText="Delete Invitations"
                onTouchTap={this.showDialog.bind(null, 'removeInvitationDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="admins-invitations-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

