import React from 'react';
import AmericanExpress from './AmericanExpress.react';
import DinersClub from './DinersClub.react';
import Discover from './Discover.react';
import JCB from './JCB.react';
import MasterCard from './MasterCard.react';
import Visa from './Visa.react';

export default React.createClass({

  displayName: 'PaymentIcon',

  getCardIcon(cardType = this.props.type, cardStyle = this.props.style) {
    switch (cardType) {
      case 'American Express':
        return <AmericanExpress style={cardStyle}/>;
      case 'Diners Club':
        return <DinersClub style={cardStyle}/>;
      case 'Discover':
        return <Discover style={cardStyle}/>;
      case 'JCB':
        return <JCB style={cardStyle}/>;
      case 'MasterCard':
        return <MasterCard style={cardStyle}/>;
      default:
        return <Visa style={cardStyle}/>;
    }
  },

  render() {
    return (
      <div>
        {this.getCardIcon()}
      </div>
    );
  }
});
