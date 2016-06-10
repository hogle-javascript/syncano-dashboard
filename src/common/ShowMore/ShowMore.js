import React from 'react';
import {colors as Colors} from 'material-ui/styles/';
import LinkWrapper from '../LinkWrapper/LinkWrapper';

export default ({routeName, params, style, label = 'SHOW MORE', visible = true}) => {
  const styles = {
    paddingTop: 0,
    marginTop: 20,
    color: Colors.blue500,
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  };

  if (visible) {
    return (
      <LinkWrapper
        className="row align-center vp-3-t"
        style={{...styles, ...style}}
        to={{name: routeName, params}}>
        {label}
      </LinkWrapper>
    );
  }

  return <span />;
};
