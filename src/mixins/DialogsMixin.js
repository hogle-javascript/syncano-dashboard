var React = require('react');

var DialogsMixin = {
  getDialogs: function() {
    var dialogs = this.initDialogs();
    return dialogs.map(function(dialog) {
      return React.createElement(dialog.dialog, dialog.params);
    }.bind(this))
  },

  showDialog: function(ref) {
    return function() {
      this.refs[ref].show();
    }.bind(this);
  },

  getDialogListLength: function(items) {
    return items.length
  },

  getDialogList: function(items, paramName) {
    var paramName = paramName || 'name',
      listItems = items.map(function(item) {
        return <li>{item[paramName]}</li>;
      });

    return <ul>{listItems}</ul>;
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
