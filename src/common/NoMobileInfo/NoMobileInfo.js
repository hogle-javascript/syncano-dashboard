import React from 'react';
import ReactFitText from 'react-fittext';

export default () => {
  const styles = {
    root: {
      padding: '0 20px'
    },
    illustration: {
      textAlign: 'center',
      paddingTop: '2em',
      paddingBottom: '1em',
      margin: '0 auto',
      maxWidth: 121,
      minWidth: 102
    },
    headline: {
      textAlign: 'center',
      fontWeight: 800,
      lineHeight: '1.35714285714286',
      color: '#1D2228',
      marginBottom: '0.91em'
    },
    text: {
      textAlign: 'center',
      color: '#9B9B9B',
      lineHeight: '1.35714285714286',
      paddingBottom: '1.6667em'
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
    <div style={styles.root}>
      <div
        style={styles.illustration}
        dangerouslySetInnerHTML={{__html: require('./illustration-mobile.svg')}}>
      </div>
        <ReactFitText
          compressor={1.5}
          minFontSize={22}
          maxFontSize={28}>
        <p style={styles.headline}>
          Please use a Desktop<br/>or Tablet browser.
        </p>
      </ReactFitText>
      <ReactFitText
        compressor={3}
        minFontSize={12}
        maxFontSize={14}>
        <div>
          <div style={styles.text}>
            <div>The Syncano admin interface is not optimized</div>
            <div>for smartphones yet, but we’re working on it.</div>
          </div>
          <div style={styles.text}>
            Thank you for your patience.
          </div>
        </div>
      </ReactFitText>
      <div style={styles.buttonContainer}>
        <a style={styles.button} href="https://www.syncano.io/">Go to our website</a>
      </div>
    </div>
  );
};
