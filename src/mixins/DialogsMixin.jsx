import React from 'react';

export default {
  getDialogs() {
    let dialogs = this.initDialogs();
    return dialogs.map(function(dialog) {
      return React.createElement(dialog.dialog, dialog.params);
    })
  },

  showDialog(ref) {
    this.refs[ref].show();
  },

  getDialogListLength(items) {
    return items.length
  },

  getDialogList(items, paramName) {
    let listItems = items.map(function(item) {
      return <li>{item[paramName || 'name']}</li>;
    });

    return <ul>{listItems}</ul>;
  },

  hideDialogs(hideDialogsFlag) {
    if (hideDialogsFlag) {
      return this.initDialogs().map(function(dialogConf) {
        this.refs[dialogConf.params.ref].dismiss();
      }.bind(this))
    }
  }

};

