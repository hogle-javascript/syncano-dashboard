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
      padding: '70px 100px'
    },
    mainContainer: {
      width: 600,
      height: 500,
      border: '2px #dedede dashed',
      borderRadius: 5,
      margin: '50px auto 0 auto'
    },
    title: {
      marginTop: 40,
      fontSize: 26,
      fontWeight: 400,
      lineHeight: '34px'
    },
    description: {
      lineHeight: '26px',
      fontSize: 18
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
