import React from 'react';
import {FlatButton, RaisedButton} from 'syncano-material-ui';

export default ({handleCancel, handleConfirm}) => {
  return (
    <div>
      <FlatButton
        style={{marginRight: 10}}
        key="cancel"
        label="Cancel"
        onTouchTap={handleCancel}/>
      <RaisedButton
        key="confirm"
        label="Confirm"
        secondary={true}
        onTouchTap={handleConfirm}/>
    </div>
  );
};
