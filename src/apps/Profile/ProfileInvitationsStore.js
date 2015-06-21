var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    ProfileActions = require('./ProfileActions');


var ProfileInvitationsStore = Reflux.createStore({
  listenables: ProfileActions,
  mixins: [StoreFormMixin],

  getInitialState: function () {
    return {
      items     : [],
      isLoading : false
    }
  },

  init: function () {
    this.data = this.getInitialState();
  },

  onGetInvitations: function() {
    console.debug('ProfileInvitationsStore::onGetInvitations');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetInvitationsCompleted: function(items) {
    console.debug('ProfileInvitationsStore::onGetInstanesCompleted');
    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onGetInvitationsFailure: function(items) {
    console.debug('ProfileInvitationsStore::onGetInvitationsFailure');
    this.data.isLoading = false;
    this.trigger(this.data);
  }

});

module.exports = ProfileInvitationsStore;