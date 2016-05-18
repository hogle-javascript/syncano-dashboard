import React from 'react';
import {IconButton, Utils} from 'syncano-material-ui';

export default ({style, iconStyle, ...other}) => {
  const styles = {
    style: {
      padding: 6
    },
    iconStyle: {
      fontSize: 36
    }
  };

  return (
    <IconButton
      {...other}
      style={Utils.Styles.mergeStyles(styles.style, style)}
      iconStyle={Utils.Styles.mergeStyles(styles.iconStyle, iconStyle)} />
  );
};
