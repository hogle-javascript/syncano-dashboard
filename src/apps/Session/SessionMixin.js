var SessionStore = require('./SessionStore');


var SessionMixin = {
  _onSessionStatusChange: function (Session) {
    if (Session.isReady()) {
      this.sessionIsReady(Session);
      this._unsubscribeSessionStore();
    }
  },

  componentDidMount: function() {
    if (this.sessionIsReady === undefined || typeof this.sessionIsReady !== 'function') {
      throw Error('Invalid `sessionIsReady` type');
    }
    this._unsubscribeSessionStore = SessionStore.listen(this._onSessionStatusChange);
    this._onSessionStatusChange(SessionStore);
  },

  componentWillUnmount: function() {
    this._unsubscribeSessionStore();
  }
};

module.exports = SessionMixin;