import React from 'react';

export default ({title, last, children}) => {
  return (
    <div className={!last ? 'vm-2-b' : ''}>
      {title ? <div><strong>{title}</strong></div> : null}
      {children}
    </div>
  );
};
