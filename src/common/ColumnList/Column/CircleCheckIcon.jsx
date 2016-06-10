import React from 'react';

import CheckIcon from './CheckIcon';
import CircleCheckIcon from '../../CheckIcon/CircleCheckIcon';

export default (props) => {
  return (
    <CheckIcon
      {...props}
      iconElement={CircleCheckIcon}/>
  );
};
