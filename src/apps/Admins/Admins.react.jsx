import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import AdminsActions from './AdminsActions';
import AdminsStore from './AdminsStore';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container';

// Local components
import AdminsList from './AdminsList.react';
import AdminDialog from './AdminDialog.react';

export default React.createClass({

  displayName: 'Admins',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(AdminsStore, 'admins'),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('Admins::componentWillUpdate');
    // Merging "hideDialogs"
    this.hideDialogs(nextState.admins.hideDialogs || nextState.invitations.hideDialogs);
  },

  componentDidMount() {
    console.info('Admins::componentDidMount');
    AdminsActions.fetch();
  },

  // Dialogs config
  initDialogs() {
    let checkedAdmins            = AdminsStore.getCheckedItems();
    let checkedAdminsInvitations = AdminsInvitationsStore.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          key:    'deleteAdminDialog',
          ref:    'deleteAdminDialog',
          title:  'Remove an Administrator',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleDeleteAdmin}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedAdmins) + ' Administrator(s)?',
            this.getDialogList(checkedAdmins, 'email'),
            <Common.Loading
              type     = "linear"
              position = "bottom"
              show     = {this.state.admins.isLoading}
            />
          ]
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          title:  'Resend an Invitation',
          key  : 'resendInvitationDialog',
          ref  : 'resendInvitationDialog',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleResendInvitation}
          ],
          modal: true,
          children: [
            'Do you really want to resend ' + this.getDialogListLength(checkedAdminsInvitations) + ' Invitation(s)?',
            this.getDialogList(checkedAdminsInvitations),
            <Common.Loading
              type     = "linear"
              position = "bottom"
              show     = {this.state.invitations.isLoading}
            />
          ]
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          title:  'Delete an Invitation',
          key  : 'removeInvitationDialog',
          ref  : 'removeInvitationDialog',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleRemoveInvitation}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedAdminsInvitations) + ' Invitation(s)?',
            this.getDialogList(checkedAdminsInvitations),
            <Common.Loading
              type     = "linear"
              position = "bottom"
              show     = {this.state.invitations.isLoading}
            />
          ]
        }
      }
    ]
  },

  handleDeleteAdmin() {
    console.info('Admins::handleDelete');
    AdminsActions.removeAdmins(AdminsStore.getCheckedItems());
  },

  handleResendInvitation() {
    console.info('Admins::handleResendInvitation');
    AdminsInvitationsActions.resendInvitation(AdminsInvitationsStore.getCheckedItems());
  },
  handleRemoveInvitation() {
    console.info('Admins::handleRemoveInvitation');
    AdminsInvitationsActions.removeInvitation(AdminsInvitationsStore.getCheckedItems());
  },

  uncheckAll() {
    console.info('Admins::uncheckAll');
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.uncheckAll();
  },

  selectAllAdmins() {
    console.info('Admins::selectAllAdmins');
    AdminsActions.selectAllAdmins();
  },

  selectAllAdminsInvitations() {
    console.info('Admins::selectAllAdminsInvitations');
    AdminsInvitationsStore.selectAllAdminsInvitations();
  },

  checkAdminItem(id, state) {
    AdminsInvitationsActions.uncheckAll();
    AdminsActions.checkItem(id, state);
  },

  checkInvitationItem(id, state) {
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.checkItem(id, state);
  },

  showAdminDialog() {
    AdminsActions.showDialog();
  },

  showAdminEditDialog() {
    AdminsActions.showDialog(AdminsStore.getCheckedItem());
  },

  render() {
    let checkedAdmins                = AdminsStore.getNumberOfChecked();
    let checkedInvitations           = AdminsInvitationsStore.getNumberOfChecked();
    let isAnyAdminSelected           = checkedAdmins >= 1 && checkedAdmins < (this.state.admins.items.length - 1);
    let isAnyAdminInvitationSelected = checkedInvitations >= 1 && checkedInvitations < (AdminsInvitationsStore.getPendingInvitations().length);
    let markedIcon                   = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon                    = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <AdminDialog />
        {this.getDialogs()}

        <Common.Show if={checkedAdmins > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyAdminSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyAdminSelected ? this.selectAllAdmins : this.uncheckAll}
              iconClassName = {isAnyAdminSelected ? markedIcon : blankIcon}
            />
            <Common.Fab.Item
              label         = "Click here to delete Administrator"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'deleteAdminDialog')}
              iconClassName = "synicon-delete"
            />
            <Common.Fab.Item
              label         = "Click here to edit Admin"
              mini          = {true}
              disabled      = {checkedAdmins > 1}
              onClick       = {this.showAdminEditDialog}
              iconClassName = "synicon-pencil"
            />
          </Common.Fab>
        </Common.Show>

        <Common.Show if={checkedInvitations > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyAdminInvitationSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyAdminInvitationSelected ? this.selectAllAdminsInvitations : this.uncheckAll}
              iconClassName = {isAnyAdminInvitationSelected ? markedIcon : blankIcon}
            />
            <Common.Fab.Item
              label         = "Click here to delete Invitation"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'removeInvitationDialog')}
              iconClassName = "synicon-delete"
            />
            <Common.Fab.Item
              label         = "Click here to resend invitation"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'resendInvitationDialog')}
              iconClassName = "synicon-backup-restore"
            />
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to invite Admin"
            onClick       = {this.showAdminDialog}
            iconClassName = "synicon-plus"
          />
        </Common.Fab>

        <AdminsList
          name       = "Administrators"
          checkItem  = {this.checkAdminItem}
          isLoading  = {this.state.admins.isLoading}
          items      = {this.state.admins.items}
        />
        <AdminsList
          name                 = "Invitations"
          mode                 = "invitations"
          emptyItemHandleClick = {this.showAdminDialog}
          emptyItemContent     = "Invite administrator"
          checkItem            = {this.checkInvitationItem}
          isLoading            = {this.state.invitations.isLoading}
          items                = {AdminsInvitationsStore.getPendingInvitations()}
        />
      </Container>
    );
  }

});
