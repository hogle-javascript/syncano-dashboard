var Reflux            = require('reflux'),

    // Utils & Mixins
    StoreFormMixin    = require('../../mixins/StoreFormMixin'),
    DialogStoreMixin  = require('../../mixins/DialogStoreMixin'),

    //Stores & Actions
    DataViewsActions  = require('./DataViewsActions'),
    ClassesActions  = require('../Classes/ClassesActions'),
    ClassesStore    = require('../Classes/ClassesStore');

var DataViewDialogStore = Reflux.createStore({
  listenables : DataViewsActions,
  mixins      : [
    StoreFormMixin,
    DialogStoreMixin
  ],

  getInitialState: function() {
    return {
      label     : '',
      crontab   : '',
      codebox   : '',
      class     : '',
      page_size : 50,
      fields    : '',
      expand    : '',
      classes : [
        {payload: '', text: 'Loading...'}
      ],
      expandFields : {},
      showFields   : {}
    };
  },

  init: function() {
    this.listenToForms();
    this.listenTo(ClassesActions.setClasses, this.getClassesDropdown);
  },

  getClassesDropdown: function() {
    console.debug('DataViewDialogStore::getClassesDropdown');
    var classes = ClassesStore.getClassesDropdown();

    if (classes.length === 0) {
      classes = [{payload: '', text: 'No classes, add one first'}];
    }

    this.trigger({classes: classes});
  },

  getCrontabDropdown: function() {
    return this.crontabItems;
  },

  onCreateDataViewCompleted: function() {
    console.debug('DataViewDialogStore::onCreateDataViewCompleted');
    this.dismissDialog();
    DataViewsActions.fetchDataViews();
  },

  onUpdateDataViewCompleted: function() {
    console.debug('DataViewDialogStore::onUpdateDataViewCompleted');
    this.dismissDialog();
    DataViewsActions.fetchDataViews();
  }

});

module.exports = DataViewDialogStore;
