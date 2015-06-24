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

    UsersActions             = require('./UsersActions'),
    UsersStore               = require('./UsersStore'),
    GroupsActions            = require('./GroupsActions'),
    GroupsStore              = require('./GroupsStore'),

    // Components
    mui                      = require('material-ui'),
    Dialog                   = mui.Dialog,
    Container                = require('../../common/Container/Container.react'),
    FabList                  = require('../../common/Fab/FabList.react'),
    FabListItem              = require('../../common/Fab/FabListItem.react'),
    ColorIconPickerDialog    = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    UsersList                = require('./UsersList.react'),
    GroupsList               = require('./GroupsList.react'),
    UserAddDialog            = require('./UserAddDialog.react'),
    GroupAddDialog           = require('./GroupAddDialog.react');


module.exports = React.createClass({

  displayName: 'Users',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(UsersStore, 'users'),
    Reflux.connect(GroupsStore, 'groups'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Users::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.users.hideDialogs || nextState.groups.hideDialogs);
  },

  componentDidMount: function() {
    console.info('Users::componentDidMount');
    UsersActions.fetch();
    // GroupsStore.refreshData();
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
    var checkedUsers  = UsersStore.getNumberOfChecked(),
        checkedGroups = GroupsStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Show if={checkedUsers > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete Users"
              mini          = {true}
              onClick       = {this.showDialog('removeUserDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit User"
              mini          = {true}
              disabled      = {checkedUsers > 1}
              onClick       = {this.showDialog('editUserDialog')}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <Show if={checkedGroups > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete Users"
              mini          = {true}
              onClick       = {this.showDialog('removeGroupDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Group"
              mini          = {true}
              disabled      = {checkedUsers > 1}
              onClick       = {this.showDialog('editGroupDialog')}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <FabList>

          <FabListItem
            label         = "Click here to create User account"
            onClick       = {this.showDialog('addUserDialog')}
            iconClassName = "synicon-account-plus" />

          <FabListItem
            label         = "Click here to create Group"
            onClick       = {this.showDialog('addGroupDialog')}
            iconClassName = "synicon-account-multiple-plus" />

        </FabList>

        <div className="row">

          <div className="col-lg-8">
            <GroupsList
              name                 = "Groups"
              checkItem            = {GroupsActions.checkItem}
              isLoading            = {GroupsActions.isLoading}
              items                = {this.state.groups.items}
              emptyItemHandleClick = {this.showDialog('addGroupDialog')}
              emptyItemContent     = "Create a Group" />

          </div>

          <div className="col-flex-1">
            <UsersList
              name                 = "Users"
              checkItem            = {UsersActions.checkItem}
              isLoading            = {UsersActions.isLoading}
              items                = {this.state.users.items}
              emptyItemHandleClick = {this.showDialog('addUserDialog')}
              emptyItemContent     = "Create a User" />
          </div>

        </div>

      </Container>
    );
  }

});
