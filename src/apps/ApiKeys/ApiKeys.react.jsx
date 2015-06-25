var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),

    // Utils
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin     = require('../../mixins/InstanceTabsMixin'),
    Show                  = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    ApiKeysActions        = require('./ApiKeysActions'),
    ApiKeysStore          = require('./ApiKeysStore'),

    // Components
    mui                   = require('material-ui'),
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    FabListItem           = require('../../common/Fab/FabListItem.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    ApiKeysList           = require('./ApiKeysList.react'),
    AddDialog             = require('./ApiKeysAddDialog.react');


module.exports = React.createClass({

  displayName: 'ApiKeys',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ApiKeysStore),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('ApiKeys::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentWillMount: function() {
    console.info('ApiKeys::componentWillMount');
    ApiKeysActions.fetch();
  },
    // Dialogs config
  initDialogs: function () {

    return [{
      dialog: AddDialog,
      params: {
        ref  : "addApiKeyDialog",
        mode : "add"
      }
    },{
      dialog: Dialog,
      params: {
        title:  "Reset an API Key",
        ref  : "resetApiKeyDialog",
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : "Confirm",
            onClick : this.handleReset
          }
        ],
        modal: true,
        children: 'Do you really want to reset this API key?'
      }
    }, {
      dialog: Dialog,
      params: {
        ref: "deleteApiKeyDialog",
        title: "Delete an API key",
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : "Confirm",
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: 'Do you really want to delete ' + ApiKeysStore.getCheckedItems().length +' API key(s)?'
      }
    }]
  },

  handleDelete: function() {
    console.info('ApiKeys::handleDelete');
    ApiKeysActions.removeApiKeys(ApiKeysStore.getCheckedItems());
  },

  handleReset: function() {
    console.info('ApiKeys::handleReset');
    ApiKeysActions.resetApiKey(ApiKeysStore.getCheckedItem().id);
  },

  render: function () {

    var checkedApiKeys = ApiKeysStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <Show if={checkedApiKeys > 0}>

          <FabList position="top">
            <FabListItem
              label         = "Click here to unselect Api Keys"
              mini          = {true}
              onClick       = {ApiKeysActions.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete ApiKeys"
              mini          = {true}
              onClick       = {this.showDialog('deleteApiKeyDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit ApiKey"
              mini          = {true}
              disabled      = {checkedApiKeys > 1}
              onClick       = {this.showDialog('resetApiKeyDialog')}
              iconClassName = "synicon-backup-restore" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to add ApiKey"
            onClick       = {this.showDialog('addApiKeyDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <ApiKeysList
          name                 = "API Keys"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showDialog('addApiKeyDialog')}
          emptyItemContent     = "Generate an APIKey" />

      </Container>
    );
  }

});