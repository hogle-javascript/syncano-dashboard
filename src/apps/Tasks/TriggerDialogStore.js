var Reflux            = require('reflux'),

    // Utils & Mixins
    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    TriggersActions   = require('./TriggersActions'),
    CodeBoxesActions  = require('../CodeBoxes/CodeBoxesActions'),
    ClassesActions    = require('../Classes/ClassesActions'),
    CodeBoxesStore    = require('../CodeBoxes/CodeBoxesStore'),
    ClassesStore      = require('../Classes/ClassesStore');

var TriggerDialogStore = Reflux.createStore({
  listenables : TriggersActions,
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
      label: null,
      signal: null,
      'class': null,
      classes: [
        {payload: null, text: 'Loading...'}
      ],
      codeboxes: [
        {payload: null, text: 'Loading...'}
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
    console.debug('TriggerDialogStore::getDropdowns');
    var dropdowns = {
      codeboxes: CodeBoxesStore.getCodeBoxesDropdown(),
      classes: ClassesStore.getClassesDropdown()
    };

    if (dropdowns.codeboxes.length === 0) {
      dropdowns.codeboxes = [{payload: null, text: 'No codeboxes, add one first'}];
    }

    if (dropdowns.classes.length === 0) {
      dropdowns.classes = [{payload: null, text: 'No classes, add one first'}];
    }

    this.trigger(dropdowns);
  },

  onCreateTriggerCompleted: function() {
    console.debug('TriggerDialogStore::onCreateTriggerCompleted');
    this.dismissDialog();
    TriggersActions.fetchTriggers();
  },

  onUpdateTriggerCompleted: function() {
    console.debug('TriggerDialogStore::onUpdateTriggerCompleted');
    this.dismissDialog();
    TriggersActions.fetchTriggers();
  }

});

module.exports = TriggerDialogStore;
