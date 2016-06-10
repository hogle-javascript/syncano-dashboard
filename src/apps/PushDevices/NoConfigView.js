import React from 'react';
import {FontIcon} from 'material-ui';

const NoConfigView = ({type}) => {
  const socketType = type.toUpperCase();

  return (
    <div style={{textAlign: 'center', marginTop: 32}}>
      <FontIcon
        className="synicon-settings"
        style={{color: '#AAA', fontSize: 56}} />
      <div style={{marginTop: 24, fontSize: 18, fontWeight: 500, color: '#AAA'}}>
        {`To add ${socketType} devices you have to config ${socketType} Push Notification Socket first.`}
      </div>
    </div>
  );
};

export default NoConfigView;
