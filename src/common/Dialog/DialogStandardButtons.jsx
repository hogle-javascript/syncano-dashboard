import React from 'react';

import {FlatButton, RaisedButton} from 'syncano-material-ui';

export default (props) => {
  return (
    <div>
      <FlatButton
        style={{marginRight: 20}}
        key="cancel"
        label="Cancel"
        onTouchTap={props.handleCancel}/>
      <RaisedButton
        key="confirm"
        label="Confirm"
        secondary={true}
        onTouchTap={props.handleConfirm}/>
    </div>
  );
};
