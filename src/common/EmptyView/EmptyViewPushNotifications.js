import React from 'react';

import { FontIcon, RaisedButton } from 'material-ui';

export default ({
  title,
  description,
  iconClassName,
  iconColor,
  handleClickAddIOS,
  handleClickAddGCM,
  APNSDocsUrl,
  GCMDocsUrl
}) => {
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
      fontSize: 16
    },
    button: {
      marginTop: 10
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
          <a href={APNSDocsUrl} target="_blank">iOS Docs </a>
          <br />
          <a href={GCMDocsUrl} target="_blank"> Android Docs</a>
        </div>
        <RaisedButton
          label="Add APNS Socket"
          primary={true}
          onTouchTap={handleClickAddIOS}
          icon={<FontIcon className="synicon-apple" />}
        />
        <RaisedButton
          label="Add GCM Socket"
          primary={true}
          onTouchTap={handleClickAddGCM}
          icon={<FontIcon className="synicon-android" />}
        />
      </div>
    </div>
  );
};
