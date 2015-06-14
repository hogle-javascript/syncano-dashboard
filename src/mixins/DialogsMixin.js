var React = require('react');

var DialogsMixin = {
  getDialogs: function() {
    var dialogs = this.initDialogs();
    return dialogs.map(function(dialog) {
      return React.createElement(dialog.dialog, dialog.params);
    }.bind(this))
  },

  showDialog: function (ref) {
    return function() {
      this.refs[ref].show();
    }.bind(this);
  },

  hideDialogs: function(hideDialogsFlag) {
    if (hideDialogsFlag) {
      return this.initDialogs().map(function(dialogConf) {
        this.refs[dialogConf.params.ref].dismiss();
      }.bind(this))
    }
  }

};

module.exports = DialogsMixin;