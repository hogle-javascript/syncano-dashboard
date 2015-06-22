var React                    = require('react'),
    Reflux                   = require('reflux'),
    Router                   = require('react-router'),

    // Utils
    HeaderMixin              = require('../Header/HeaderMixin'),
    ButtonActionMixin        = require('../../mixins/ButtonActionMixin'),
    DialogsMixin             = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin        = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    SessionActions           = require('../Session/SessionActions'),
    SessionStore             = require('../Session/SessionStore'),

    UsersActions             = require('./UsersActions'),
    UsersStore               = require('./UsersStore'),
    GroupsActions            = require('./GroupsActions'),
    GroupsStore              = require('./GroupsStore'),

    // Components
    mui                      = require('material-ui'),
    FloatingActionButton     = mui.FloatingActionButton,
    Dialog                   = mui.Dialog,
    Container                = require('../../common/Container/Container.react'),
    FabList                  = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog    = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    UsersList            = require('./UsersList.react'),
    GroupsList             = require('./GroupsList.react'),
    UserAddDialog       = require('./UserAddDialog.react'),
    GroupAddDialog        = require('./GroupAddDialog.react');


module.exports = React.createClass({

  displayName: 'Users',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(UsersStore),
    Reflux.connect(GroupsStore, 'invitations'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Users::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs || nextState.invitations.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Users::componentWillMount');
    UsersStore.refreshData();
    GroupsStore.refreshData();
  },

  getStyles: function() {
    return {
      fabListTop: {
        top: 200
      },
      fabListButton: {
        margin: '5px 0'
      },
      fabListBottom: {
        bottom: 100
      }
    }
  },
  // Dialogs config
  initDialogs: function () {

    return [
      // Groups
      {
        dialog: GroupAddDialog,
        params: {
          ref  : "addGroupDialog",
          mode : "add"
        }
      },
      {
        dialog: GroupAddDialog,
        params: {
          ref  : "editGroupDialog",
          mode : "edit"
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    "removeGroupDialog",
          title:  "Delete Group",
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancel},
            {
              text    : "Yes, I'm sure",
              onClick : this.handleRemoveGroups}
          ],
          modal: true,
          children: 'Do you really want to delete ' + GroupsStore.getCheckedItems().length +' groups?'
        }
      },

      // Users
      {
        dialog: UserAddDialog,
        params: {
          ref  : "addUserDialog",
          mode : "add"
        }
      },
      {
        dialog: UserAddDialog,
        params: {
          ref  : "editUserDialog",
          mode : "edit"
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    "removeUserDialog",
          title:  "Delete User",
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: "Yes, I'm sure", onClick: this.handleRemoveUsers}
          ],
          modal: true,
          children: 'Do you really want to delete ' + UsersStore.getCheckedItems().length +' users?'
        }
      }
    ]
  },

  handleRemoveGroups: function() {
    console.info('Users::handleDelete');
    GroupsActions.removeGroups(GroupsStore.getCheckedItems());
  },

  handleRemoveUsers: function() {
    console.info('Users::handleRemoveUsers');
    UsersActions.removeUsers(UsersStore.getCheckedItems());
  },

  uncheckAll: function() {
    console.info('Users::uncheckAll');
    UsersActions.uncheckAll();
    GroupsActions.uncheckAll();
  },

  render: function () {

    var styles = this.getStyles();

    var checkedUsers      = UsersStore.getNumberOfChecked(),
        checkedGroups       = GroupsStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <FabList
          style={{top: 200, display: checkedUsers ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect all" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Users" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('removeUserDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit User" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedUsers > 1}
            onClick       = {this.showDialog('editUserDialog')}
            iconClassName = "synicon-pencil" />

        </FabList>

        <FabList
          style={{top: 200, display: checkedGroups ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect all" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Users" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('removeGroupDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit Group" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedUsers > 1}
            onClick       = {this.showDialog('editGroupDialog')}
            iconClassName = "synicon-pencil" />

        </FabList>

        <FabList style={styles.fabListBottom}>
          <FloatingActionButton
            label         = "Click here to create User account" // TODO: extend component
            style         = {styles.fabListButton}
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addUserDialog')}
            iconClassName = "synicon-account-plus" />
          <FloatingActionButton
            label         = "Click here to create Group" // TODO: extend component
            style         = {styles.fabListButton}
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addGroupDialog')}
            iconClassName = "synicon-account-multiple-plus" />

        </FabList>

        <div className="row">

          <div className="col-lg-8">
            <GroupsList
              name                 = "Groups"
              checkItem            = {GroupsActions.checkItem}
              isLoading            = {GroupsActions.isLoading}
              items                = {this.state.invitations.items}
              emptyItemHandleClick = {this.showDialog('addGroupDialog')}
              emptyItemContent     = "Create a Group" />

          </div>

          <div className="col-flex-1">
            <UsersList
              name                 = "Users"
              checkItem            = {UsersActions.checkItem}
              isLoading            = {UsersActions.isLoading}
              items                = {this.state.items}
              emptyItemHandleClick = {this.showDialog('addUserDialog')}
              emptyItemContent     = "Create a User" />
          </div>

        </div>

      </Container>
    );
  }

});
