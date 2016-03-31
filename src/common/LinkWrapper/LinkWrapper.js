import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {Styles, Utils} from 'syncano-material-ui';

const RadiumLink = Radium(Link);

export default Radium((props) => {
  const getStyles = () => {
    return {
      color: '#444',
      cursor: 'pointer',
      ':hover': {
        color: Styles.Colors.blue400
      }
    };
  };

  const {style, children, ...other} = props;

  return (
    <RadiumLink
      style={Utils.Styles.mergeStyles(getStyles(), style)}
      {...other}>
      {children}
    </RadiumLink>
  );
});
