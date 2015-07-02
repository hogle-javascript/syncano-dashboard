var Reflux            = require('reflux'),

    // Utils & Mixins
    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    WebhooksActions   = require('./WebhooksActions'),
    CodeBoxesActions  = require('../CodeBoxes/CodeBoxesActions'),
    ClassesActions    = require('../Classes/ClassesActions'),
    CodeBoxesStore    = require('../CodeBoxes/CodeBoxesStore'),
    ClassesStore      = require('../Classes/ClassesStore');

var WebhookDialogStore = Reflux.createStore({
  listenables : WebhooksActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  signalMenuItems: [
    {
      payload : 'post_create',
      text    : 'create'
    },
    {
      payload : 'post_update',
      text    : 'update'
    },
    {
      payload : 'post_delete',
      text    : 'delete'
    }
  ],

  getInitialState: function() {
    return {
      label: '',
      signal: '',
      'class': '',
      classes: [
        {payload: '', text: 'Loading...'}
      ],
      codeboxes: [
        {payload: '', text: 'Loading...'}
      ]
    };
  },

  init: function() {
    this.listenToForms();
    this.joinTrailing(
      CodeBoxesActions.setCodeBoxes,
      ClassesActions.setClasses,
      this.getDropdowns
    );
  },

  getSignalsDropdown: function() {
    return this.signalMenuItems;
  },

  getDropdowns: function() {
    console.debug('WebhookDialogStore::getDropdowns');
    var dropdowns = {
      codeboxes: CodeBoxesStore.getCodeBoxesDropdown(),
      classes: ClassesStore.getClassesDropdown()
    };

    if (dropdowns.codeboxes.length === 0) {
      dropdowns.codeboxes = [{payload: '', text: 'No codeboxes, add one first'}];
    }

    if (dropdowns.classes.length === 0) {
      dropdowns.classes = [{payload: '', text: 'No classes, add one first'}];
    }

    this.trigger(dropdowns);
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
