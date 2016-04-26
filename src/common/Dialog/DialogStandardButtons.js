import React from 'react';
import _ from 'lodash';
import {FlatButton, RaisedButton} from 'syncano-material-ui';

export default (props) => {
  let {
    handleCancel,
    handleConfirm,
    submitLabel = 'Confirm',
    cancelLabel = 'Cancel',
    disabled = false,
    submitDisabled = false,
    cancelDisabled = false
  } = props;

  if (handleCancel) {
    handleCancel = _.debounce(handleCancel, 500, {leading: true});
  }

  if (handleConfirm) {
    handleConfirm = _.debounce(handleConfirm, 500, {leading: true});
  }

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
