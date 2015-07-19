var Reflux            = require('reflux'),

    // Utils & Mixins
    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    WebhooksActions   = require('./WebhooksActions'),
    CodeBoxesActions  = require('../CodeBoxes/CodeBoxesActions'),
    CodeBoxesStore    = require('../CodeBoxes/CodeBoxesStore');

var WebhookDialogStore = Reflux.createStore({
  listenables : WebhooksActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      label     : '',
      signal    : '',
      'class'   : '',
      codeboxes : [
        {
          payload : '',
          text    : 'Loading...'
        }
      ]
    };
  },

  init: function() {
    this.listenToForms();
    this.listenTo(CodeBoxesActions.setCodeBoxes, this.getCodeBoxDropdown);
  },

  getCodeBoxDropdown: function() {
    console.debug('DataViewDialogStore::getCodeBoxDropdown');
    var codeboxes = CodeBoxesStore.getCodeBoxesDropdown();

    if (codeboxes.length === 0) {
      codeboxes = [{payload: '', text: 'No CodeBoxes, add one first'}];
    }
    this.trigger({codeboxes: codeboxes});
  },

  onCreateWebhookCompleted: function() {
    console.debug('WebhookDialogStore::onCreateWebhookCompleted');
    this.dismissDialog();
    WebhooksActions.fetchWebhooks();
  },

  onUpdateWebhookCompleted: function() {
    console.debug('WebhookDialogStore::onUpdateWebhookCompleted');
    this.dismissDialog();
    WebhooksActions.fetchWebhooks();
  }

});

module.exports = WebhookDialogStore;
