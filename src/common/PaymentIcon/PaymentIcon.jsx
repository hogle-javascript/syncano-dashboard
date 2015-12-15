import React from 'react';
import AmericanExpress from './AmericanExpress';
import DinersClub from './DinersClub';
import Discover from './Discover';
import JCB from './JCB';
import MasterCard from './MasterCard';
import Visa from './Visa';

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
