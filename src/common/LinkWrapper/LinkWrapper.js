import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {Styles, Utils} from 'syncano-material-ui';

const RadiumLink = Radium(Link);

export default Radium(({style, children, ...other}) => {
  const styles = {
    color: '#444',
    cursor: 'pointer',
    ':hover': {
      color: Styles.Colors.blue400
    }
  };

  return (
    <RadiumLink
      style={Utils.Styles.mergeStyles(styles, style)}
      {...other}>
      {children}
    </RadiumLink>
  );
});
