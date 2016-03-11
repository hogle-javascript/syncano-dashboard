import React from 'react';

export default ({children}) => {
  const styles = {
    root: {
      width: 238,
      paddingTop: 16,
      paddingRight: 20
    }
  };

  return (
    <div
      className="col-flex-0"
      style={styles.root}>
      {children}
    </div>
  );
};
