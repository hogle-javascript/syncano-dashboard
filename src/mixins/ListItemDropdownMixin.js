import React from 'react';
import Reflux from 'reflux';

import ColumnMenuActions from '../common/ColumnList/Column/MenuActions';
import ColumnMenuStore from '../common/ColumnList/Column/MenuStore';

export default {

  childContextTypes: {
    dialogs: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(ColumnMenuStore, 'columnMenu')
  ],

  getChildContext() {
    return {
      dialogs: this.refs
    }
  },

  getCheckedItems(altGetItemsFunc) {
    return this.state.columnMenu.item ? [this.state.columnMenu.item] : altGetItemsFunc();
  },

  handleContextModalCancel(dialogRef) {
    this.hideDialog(dialogRef);
    ColumnMenuActions.clearCheckedItem();
  }
}
