import React from 'react';

import { FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

export default ({ handleClickSend }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 250
    },
    icon: {
      fontSize: 90
    },
    text: {
      fontSize: 24
    }
  };

  return (
    <div style={styles.container}>
      <FontIcon
        style={styles.icon}
        className="synicon-comment-alert"
        color={Colors.grey400}
      />
      <div style={styles.text}>
        You haven't sent any notifications yet.
      </div>
      <RaisedButton
        primary={true}
        label="Send Notification"
        onTouchTap={handleClickSend}
      />
    </div>
  );
};
