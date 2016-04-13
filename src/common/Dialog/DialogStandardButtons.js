import React from 'react';
import {FlatButton, RaisedButton} from 'syncano-material-ui';

export default (props) => {
  const {
    handleCancel,
    handleConfirm,
    submitLabel = 'Confirm',
    cancelLabel = 'Cancel',
    disabled = false,
    submitDisabled = false,
    cancelDisabled = false
  } = props;

  return (
    <div>
      <FlatButton
        style={{marginRight: 10}}
        key="cancel"
        label={cancelLabel}
        onTouchTap={handleCancel}
        disabled={disabled || cancelDisabled} />
      <RaisedButton
        key="confirm"
        label={submitLabel}
        primary={true}
        onTouchTap={handleConfirm}
        disabled={disabled || submitDisabled} />
    </div>
  );
};
