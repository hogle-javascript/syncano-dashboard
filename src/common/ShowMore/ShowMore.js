import React from 'react';

import {Styles, Utils} from 'syncano-material-ui';
import LinkWrapper from '../LinkWrapper/LinkWrapper';

export default ({routeName, params, style, label = 'SHOW MORE', visible = true}) => {
  const styles = {
    paddingTop: 0,
    marginTop: 20,
    color: Styles.Colors.blue500,
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  };

  if (visible) {
    return (
      <LinkWrapper
        className="row align-center vp-3-t"
        style={Utils.Styles.mergeStyles(styles, style)}
        to={routeName}
        params={params}>
        {label}
      </LinkWrapper>
    );
  }

  return <span />;
};
