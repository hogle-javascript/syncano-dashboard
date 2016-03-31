import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {Styles, Utils} from 'syncano-material-ui';

const RadiumLink = Radium(Link);

export default Radium(({style, children, ...other}) => {
  const linkStyles = {
    color: '#444',
    cursor: 'pointer',
    ':hover': {
      color: Styles.Colors.blue400
    }
  };

  return (
    <RadiumLink
      style={Utils.Styles.mergeStyles(linkStyles, style)}
      {...other}>
      {children}
    </RadiumLink>
  );
});
