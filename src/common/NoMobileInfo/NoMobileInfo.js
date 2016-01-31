import React from 'react';

export default () => {
  const styles = {
    illustration: {
      textAlign: 'center',
      paddingTop: 70,
      paddingBottom: 50
    },
    headline: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 800,
      lineHeight: '38px',
      color: '#1D2228',
      paddingLeft: 15,
      paddingRight: 15
    },
    text: {
      textAlign: 'center',
      color: '#9B9B9B',
      lineHeight: '19px',
      paddingBottom: 50
    },
    buttonContainer: {
      textAlign: 'center'
    },
    button: {
      backgroundColor: '#ffcc01',
      borderRadius: '4px',
      color: '#1d2228',
      fontSize: 14,
      fontWeight: 800,
      padding: '14px 25px',
      display: 'inline-block'
    }
  };

  return (
    <div>
      <div
        style={styles.illustration}
        dangerouslySetInnerHTML={{__html: require('../../assets/img/illustration-mobile.svg')}}>
      </div>
      <p style={styles.headline}>
        Please use a Desktop or Tablet browser.
      </p>
      <p style={styles.text}>
        The Syncano admin interface is not optimized for smartphones yet,
        but we’re working on it.
        <br/>
        <br/>
        Thank you for your patience.
      </p>
      <div style={styles.buttonContainer}>
        <a style={styles.button} href="https://www.syncano.io/">Go to our website</a>
      </div>
    </div>
  );
};
