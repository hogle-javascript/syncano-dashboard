import React from 'react';

// Utils
import Mixins from '../../../mixins';

// Components
import MUI from 'material-ui';
import Common from '../../../common';

export default React.createClass({

  displayName: 'MenuDialog',

  mixins: [
    Mixins.Dialog
  ],

  getInitialState() {
    return {
      _dialogVisible: false
    };
  },

  getDialogMessage(itemName, title) {
    return (
      <div>
        Do you really want to {title.toLowerCase()}:
        <ul>
          <li>
            {itemName}
          </li>
        </ul>
      </div>
    );
  },

  handleConfirmClick() {
    this.state.handleConfirm();
    this.refs.dialog.dismiss();
  },

  show(objName, onClickConfirm, title) {
    this.setState({
      dialogTitle: title,
      itemName: objName,
      handleConfirm: onClickConfirm,
      dialogMessage: this.getDialogMessage(objName, title)
    }, () => this.refs.dialog.show());
  },

  render() {
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        onTouchTap={this.handleConfirmClick}
        label="Confirm"
        primary={true}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        ref="dialog"
        title={this.state.dialogTitle}
        actions={dialogStandardActions}
        onDismiss={this.resetDialogState}>
        {this.state.dialogMessage}
      </Common.Dialog>
    );
  }
});

