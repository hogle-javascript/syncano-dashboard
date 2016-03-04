import React from 'react';
import Router from 'react-router';

import Actions from './AdminsInvitationsActions';
import Store from './AdminsInvitationsStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import ListItem from './AdminsInvitationsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'AdminsInvitationsList',

  mixins: [
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
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
          itemLabelName: 'email',
          groupName: 'Invitation'
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
          groupName: 'Invitation'
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`admins-invitations-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeInvitationDialog', item)}
        showResendDialog={() => this.showDialog('resendInvitationDialog', item)} />
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
          <Column.ColumnHeader columnName="DESC"/>
          <Column.ColumnHeader columnName="TEXT">Role</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete an Invitation"
                multipleItemsText="Delete Invitations"
                onTouchTap={() => this.showDialog('removeInvitationDialog')} />
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

