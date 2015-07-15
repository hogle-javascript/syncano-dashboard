var SessionStore = require('./SessionStore');

var SessionMixin = {
  _onSessionStatusChange: function(Session) {
    if (Session.isReady()) {
      this.onSessionIsReady(Session);
      this._unsubscribeSessionStore();
    }
  },

  componentDidMount: function() {
    if (this.onSessionIsReady === undefined) {
      return
    }

    if (typeof this.onSessionIsReady !== 'function') {
      throw Error('Invalid `onSessionIsReady` type');
    }

    this._unsubscribeSessionStore = SessionStore.listen(this._onSessionStatusChange);
    this._onSessionStatusChange(SessionStore);
  },

  componentWillUnmount: function() {
    if (this._unsubscribeSessionStore === undefined) {
      return
    }
    this._unsubscribeSessionStore();
  }
};

module.exports = SessionMixin;
