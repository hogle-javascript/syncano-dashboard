import React from 'react';

export default ({title, last, children, style}) => {
  const styles = {
    title: {
      color: '#aaa',
      fontSize: 11,
      textTransform: 'uppercase'
    }
  };

  return (
    <div className={!last ? 'vm-6-b' : ''}>
      {title ? <div style={styles.title}>{title}</div> : null}
      <div
        style={style}
        className="row">
        {children}
      </div>
    </div>
  );
};
