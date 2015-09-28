import React from 'react';
import Reflux from 'reflux';

import {DialogMixin} from '../mixins';

import ColumnMenuActions from '../common/ColumnList/Column/MenuActions';
import ColumnMenuStore from '../common/ColumnList/Column/MenuStore';

export default {

  childContextTypes: {
    dialogs: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(ColumnMenuStore, 'columnMenu'),
    DialogMixin
  ],

  getChildContext() {
    return {
      dialogs: this.refs
    }
  },

  getClickedItem(altGetItemsFunc) {
    return this.state.columnMenu.item ? [this.state.columnMenu.item] : altGetItemsFunc();
  },

  handleContextModalCancel(dialogRef) {
    this.hideDialogs(dialogRef);
    ColumnMenuActions.clearClickedItem();
  }
}
