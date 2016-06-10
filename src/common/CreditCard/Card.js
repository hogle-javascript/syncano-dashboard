import React from 'react';
import Radium from 'radium';
import PaymentIcon from '../PaymentIcon';

export default Radium(React.createClass({
  displayName: 'Card',

  propTypes: {
    handleClick: React.PropTypes.func
  },

  getStyles() {
    return {
      cardContainer: {
        width: 220,
        height: 138,
        background: '#fafafa',
        border: '1px solid #ddd',
        borderRadius: 10,
        padding: 16,
        color: 'rgba(0, 0, 0, 0.87)',
        display: 'flex',
        flexDirection: 'column'
      },
      cardHeadline: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        lineHeight: '16px'
      },
      cardFooter: {
        display: 'flex',
        margin: 'auto 0 0',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      },
      cardIcon: {
        width: 60,
        height: 'auto',
        display: 'block',
        transform: 'translateY(18%)'
      }
    };
  },

  getCardTypeIcon(cardType) {
    let styles = this.getStyles();

    if (typeof cardType === 'undefined') {
      return true;
    }

    return (
      <PaymentIcon
        type={cardType}
        style={styles.cardIcon}/>
    );
  },

  render() {
    let styles = this.getStyles();
    let cardTypeIcon = this.props.card.brand ? this.getCardTypeIcon(this.props.card.brand) : null;

    return (
      <div className="vm-6-b" style={styles.cardContainer}>
        <div>
          <div style={styles.cardHeadline}>Card number</div>
          <div>*** **** *** {this.props.card.last4}</div>
        </div>
        <div style={styles.cardFooter}>
          <div>
            <div style={styles.cardHeadline}>Expires on</div>
            {this.props.card.exp_month}/{this.props.card.exp_year}
          </div>
          <div>
            {cardTypeIcon}
          </div>
        </div>
      </div>
    );
  }
}));
