import React from 'react';

import CheckIcon from './CheckIcon';
import {Styles, Utils} from 'syncano-material-ui';

export default (props) => {
  const icon = {
    className: props.iconClassName,
    color: props.iconColor,
    circleColor: 'none'
  };
  const checkedIcon = {
    className: 'socket-checkbox-marked',
    color: Styles.Colors.lightBlue500,
    circleColor: 'none'
  };
  const hoveredIcon = {
    className: 'socket-checkbox-blank',
    color: 'rgba(0,0,0,0.2)',
    circleColor: 'none'
  };

  return (
    <CheckIcon
      {...props}
      iconStyle={Utils.Styles.mergeStyles({fontSize: 36, display: 'flex'}, props.iconStyle)}
      icon={icon}
      checkedIcon={checkedIcon}
      hoveredIcon={hoveredIcon}/>
  );
};
