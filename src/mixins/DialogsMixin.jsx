import React from 'react';

export default {
  getDialogs() {
    let dialogs = this.initDialogs();

    return dialogs.map((dialog) => {
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
    let listItems = items.map((item) => {
      let association = item.associatedWith ? ` (${item.associatedWith})` : '';

      return <li>{item[paramName || 'name'] + association}</li>;
    });

    return <ul>{listItems}</ul>;
  },

  hideDialogs(hideDialogsFlag) {
    if (hideDialogsFlag) {
      return this.initDialogs().map((dialogConf) => {
        this.refs[dialogConf.params.ref].dismiss();
      });
    }
  }

};

