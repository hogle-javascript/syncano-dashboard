import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {RaisedButton} from 'material-ui';

class FailedPaymentPage extends Component {
  render() {
    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 50px)'
      },
      textLink: {
        color: '#4A90E2'
      },
      flexTop: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: 450,
        margin: '0 auto 80px'
      },
      image: {
        display: 'block',
        marginBottom: 70
      },
      title: {
        marginBottom: 30,
        color: '#1D2228',
        fontSize: 28,
        lineHeight: '38px',
        fontWeight: 700
      },
      message: {
        margin: 0,
        fontSize: 14,
        lineHeight: '19px',
        color: 'rgba(0,0,0,0.54)'
      },
      button: {
        height: 44,
        width: 230,
        margin: '70px auto 10px',
        boxShadow: 'none'
      },
      flexBottom: {
        padding: '20px 0',
        textAlign: 'center'
      },
      flexBottomText: {
        margin: 0,
        fontSize: 12,
        lineHeight: '16px',
        color: 'rgba(0,0,0,0.54)'
      }
    };

    return (
      <div style={styles.root}>
        <div style={styles.flexTop}>
          <img
            src={require('!file-loader!../assets/img/illustrations/we-cant-process-your-payment.svg')}
            alt="credit card with an error icon"
            style={styles.image}
          />
          <div style={styles.title}>
            We can't process your payment
          </div>
          <p style={styles.message}>
            Oh no! It looks like there’s an issue with your method of payment. Please update your credentials to get
            back to building amazing apps!
          </p>
          <Link to="profile-billing-payment">
            <RaisedButton
              label="Update My Credit Card"
              backgroundColor="#FFCC01"
              labelColor="#1D2228"
              style={styles.button}
              labelStyle={{fontWeight: 700}}
            />
          </Link>
        </div>
        <div style={styles.flexBottom}>
          <p style={styles.flexBottomText}>
            If you think this is an error, please contact us at:
            <br/>
            <a
              href="mailto:support@syncano.com"
              style={styles.textLink}
            >
              support@syncano.com
            </a>
          </p>
        </div>
      </div>
    );
  };
};

export default withRouter(FailedPaymentPage);
