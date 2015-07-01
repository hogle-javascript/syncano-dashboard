var React                    = require('react'),
    Reflux                   = require('reflux'),
    Router                   = require('react-router'),

    // Utils
    HeaderMixin              = require('../Header/HeaderMixin'),
    ButtonActionMixin        = require('../../mixins/ButtonActionMixin'),
    DialogsMixin             = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin        = require('../../mixins/InstanceTabsMixin'),
    Show                     = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionActions           = require('../Session/SessionActions'),
    SessionStore             = require('../Session/SessionStore'),
    AdminsActions            = require('./AdminsActions'),
    AdminsStore              = require('./AdminsStore'),
    AdminsInvitationsActions = require('./AdminsInvitationsActions'),
    AdminsInvitationsStore   = require('./AdminsInvitationsStore'),

    // Components
    mui                      = require('material-ui'),
    Dialog                   = mui.Dialog,
    Container                = require('../../common/Container/Container.react'),
    FabList                  = require('../../common/Fab/FabList.react'),
    FabListItem              = require('../../common/Fab/FabListItem.react'),
    ColorIconPickerDialog    = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),
    Loading                  = require('../../common/Loading/Loading.react.jsx'),

    // Local components
    AdminsList               = require('./AdminsList.react'),
    AdminDialog              = require('./AdminDialog.react');

module.exports = React.createClass({

  displayName: 'Admins',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(AdminsStore, 'admins'),
    Reflux.connect(AdminsInvitationsStore, 'invitations'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Admins::componentWillUpdate');
    // Merging "hideDialogs"
    this.hideDialogs(nextState.admins.hideDialogs || nextState.invitations.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Admins::componentWillMount');
    AdminsActions.fetch();
  },

  // Dialogs config
  initDialogs: function() {

    return [
      {
        dialog: Dialog,
        params: {
          ref:    "deleteAdminDialog",
          title:  "Remove an Administrator",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Confirm", onClick: this.handleDeleteAdmin}
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + AdminsStore.getCheckedItems().length +' Administrator(s)?',
            <Loading
              type     = "linear"
              position = "bottom"
              show     = {this.state.admins.isLoading} />
          ]
        }
      },
      {
        dialog: Dialog,
        params: {
          title:  "Resend an Invitation",
          ref  : "resendInvitationDialog",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Confirm", onClick: this.handleResendInvitation}
          ],
          modal: true,
          children: [
            'Do you really want to resend ' + AdminsInvitationsStore.getCheckedItems().length + ' Invitation(s)?',
            <Loading
              type     = "linear"
              position = "bottom"
              show     = {this.state.invitations.isLoading} />
          ]
        }
      },
      {
        dialog: Dialog,
        params: {
          title:  "Delete an Invitation",
          ref  : "removeInvitationDialog",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Confirm", onClick: this.handleRemoveInvitation}
          ],
          modal: true,
           children: [
             'Do you really want to delete ' + AdminsInvitationsStore.getCheckedItems().length +' Invitation(s)?',
             <Loading
               type     = "linear"
               position = "bottom"
               show     = {this.state.invitations.isLoading} />
           ]
        }
      }
    ]
  },

  handleDeleteAdmin: function() {
    console.info('Admins::handleDelete');
    AdminsActions.removeAdmins(AdminsStore.getCheckedItems());
  },

  handleResendInvitation: function() {
    console.info('Admins::handleResendInvitation');
    AdminsInvitationsActions.resendInvitation(AdminsInvitationsStore.getCheckedItems());
  },
  handleRemoveInvitation: function() {
    console.info('Admins::handleRemoveInvitation');
    AdminsInvitationsActions.removeInvitation(AdminsInvitationsStore.getCheckedItems());
  },

  uncheckAll: function() {
    console.info('Admins::uncheckAll');
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.uncheckAll();
  },

  selectAllAdmins: function() {
    console.info('Admins::selectAllAdmins');
    AdminsActions.selectAllAdmins();
  },

  selectAllAdminsInvitations: function() {
    console.info('Admins::selectAll');
    AdminsInvitationsActions.selectAll();
  },

  checkAdminItem: function(id, state) {
    AdminsInvitationsActions.uncheckAll();
    AdminsActions.checkItem(id, state);
  },

  checkInvitationItem: function(id, state) {
    AdminsActions.uncheckAll();
    AdminsInvitationsActions.checkItem(id, state);
  },

  showAdminDialog: function () {
    AdminsActions.showDialog();
  },

  showAdminEditDialog: function () {
    AdminsActions.showDialog(AdminsStore.getCheckedItem());
  },

  render: function() {

    var checkedAdmins      = AdminsStore.getNumberOfChecked(),
        checkedInvitations = AdminsInvitationsStore.getNumberOfChecked();

    return (
      <Container>
        <AdminDialog />
        {this.getDialogs()}

        <Show if={checkedAdmins > 0}>
          <FabList position="top">

            <FabListItem
              label         = {checkedAdmins === 1 ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {checkedAdmins === 1 ? this.selectAllAdmins : this.uncheckAll}
              iconClassName = {checkedAdmins === 1 ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"} />

            <FabListItem
              label         = "Click here to delete Administrator"
              mini          = {true}
              onClick       = {this.showDialog('deleteAdminDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Admin"
              mini          = {true}
              disabled      = {checkedAdmins > 1}
              onClick       = {this.showAdminEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <Show if={checkedInvitations > 0}>
          <FabList position="top">

            <FabListItem
              label         = {checkedInvitations === 1 ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {checkedInvitations === 1 ? this.selectAllAdminsInvitations : this.uncheckAll}
              iconClassName = {checkedInvitations === 1 ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"} />

            <FabListItem
              label         = "Click here to delete Invitation"
              mini          = {true}
              onClick       = {this.showDialog('removeInvitationDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to resend invitation"
              mini          = {true}
              onClick       = {this.showDialog('resendInvitationDialog')}
              iconClassName = "synicon-backup-restore" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to invite Admin"
            onClick       = {this.showAdminDialog}
            iconClassName = "synicon-plus" />
        </FabList>

        <AdminsList
          name       = "Administrators"
          checkItem  = {this.checkAdminItem}
          isLoading  = {this.state.admins.isLoading}
          items      = {this.state.admins.items}/>

        <AdminsList
          name                 = "Invitations"
          mode                 = "invitations"
          emptyItemHandleClick = {this.showAdminDialog}
          emptyItemContent     = "Invite administrators"
          checkItem            = {this.checkInvitationItem}
          isLoading            = {this.state.invitations.isLoading}
          items                = {AdminsInvitationsStore.getPendingInvitations()} />

      </Container>
    );
  }

});
