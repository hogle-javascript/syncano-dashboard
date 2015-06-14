var SessionStore = require('./SessionStore');


var SessionMixin = {
  _onSessionStatusChange: function (Session) {
    if (Session.isReady()) {
      this.onSessionIsReady(Session);
      this._unsubscribeSessionStore();
    }
  },

  componentDidMount: function() {
    if (this.onSessionIsReady === undefined || typeof this.onSessionIsReady !== 'function') {
      throw Error('Invalid `onSessionIsReady` type');
    }
    this._unsubscribeSessionStore = SessionStore.listen(this._onSessionStatusChange);
    this._onSessionStatusChange(SessionStore);
  },

  componentWillUnmount: function() {
    this._unsubscribeSessionStore();
  }
};

module.exports = SessionMixin;