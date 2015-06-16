var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),

    // Utils
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin     = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    ApiKeysActions        = require('./ApiKeysActions'),
    ApiKeysStore          = require('./ApiKeysStore'),

    // Components
    mui                   = require('material-ui'),
    FloatingActionButton  = mui.FloatingActionButton,
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
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
    ApiKeysStore.refreshData();
  },
    // Dialogs config
  initDialogs: function () {

    return [{
      dialog: AddDialog,
      params: {
        ref  : "addApiKeyDialog",
        mode : "add",
      },
    },{
      dialog: Dialog,
      params: {
        title:  "Reset API Key",
        ref  : "resetApiKeyDialog",
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: "Yes, I'm sure.", onClick: this.handleReset}
        ],
        modal: true,
        children: 'Do you really want to reset this API key?',
      },
    }, {
      dialog: Dialog,
      params: {
        ref:    "deleteApiKeyDialog",
        title:  "Delete API key",
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: "Yes, I'm sure.", onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete ' + ApiKeysStore.getCheckedItems().length +' API key(s)?',
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

        <FabList
          style={{top: 200, display: checkedApiKeys ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect Api Keys" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {ApiKeysActions.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete ApiKeys" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('deleteApiKeyDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit ApiKey" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedApiKeys > 1}
            onClick       = {this.showDialog('resetApiKeyDialog')}
            iconClassName = "synicon-backup-restore" />

        </FabList>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to add ApiKey" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addApiKeyDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <ApiKeysList
          name   = "API Keys"
          items  = {this.state.items} />

      </Container>
    );
  }

});