import React from 'react';

export default ({children}) => {
  const styles = {
    root: {
      width: 226,
      paddingTop: 16
    },
    content: {
      background: 'rgba(184, 192, 201, 0.1)',
      border: '1px solid rgba(184, 192, 201, 0.3)',
      borderRadius: 4,
      padding: 15,
      color: 'rgba(68,68,68,.5)',
      fontSize: 12,
      lineHeight: '18px'
    }
  };

  return (
    <div
      className="col-flex-0"
      style={styles.root}>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};
