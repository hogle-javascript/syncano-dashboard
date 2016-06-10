import React from 'react';

import CheckIcon from './CheckIcon';
import SocketCheckIcon from '../../CheckIcon/SocketCheckIcon';

export default (props) => {
  return (
    <CheckIcon
      {...props}
      iconElement={SocketCheckIcon}/>
  );
};
