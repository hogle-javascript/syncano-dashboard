import React from 'react';

import { FontIcon, RaisedButton } from 'material-ui';

export default ({ title, description, iconClassName, iconColor, handleClickAdd, docsUrl }) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      padding: '100px 120px'
    },
    mainContainer: {
      width: 700,
      height: 600,
      border: '2px #aaa dashed',
      borderRadius: 5,
      margin: '50px auto 0 auto'
    },
    title: {
      marginTop: 40,
      fontSize: 32,
      fontWeight: 500
    },
    description: {
      lineHeight: 1.3,
      fontSize: 24
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <FontIcon
          className={iconClassName}
          color={iconColor}
          style={{ fontSize: 72 }}
        />
        <div style={styles.title}>
          {title}
        </div>
        <div style={styles.description}>
          {description}
        </div>
        <div style={styles.description}>
          <a href={docsUrl} target="_blank">{title} docs</a>
        </div>
        <RaisedButton
          label="Add"
          primary={true}
          onTouchTap={handleClickAdd}
        />
      </div>
    </div>
  );
};
