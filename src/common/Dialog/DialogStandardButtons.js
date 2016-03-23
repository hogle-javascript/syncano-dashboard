import React from 'react';
import {FlatButton, RaisedButton} from 'syncano-material-ui';

export default ({handleCancel, handleConfirm, submitLabel = 'Confirm'}) => {
  return (
    <div>
      <FlatButton
        style={{marginRight: 10}}
        key="cancel"
        label="Cancel"
        onTouchTap={handleCancel}/>
      <RaisedButton
        key="confirm"
        label={submitLabel}
        primary={true}
        onTouchTap={handleConfirm}/>
    </div>
  );
};
