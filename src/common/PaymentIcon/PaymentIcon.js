import React from 'react';
import AmericanExpress from './AmericanExpress';
import DinersClub from './DinersClub';
import Discover from './Discover';
import Jcb from './Jcb';
import MasterCard from './MasterCard';
import Visa from './Visa';

export default React.createClass({
  displayName: 'PaymentIcon',

  getCardIcon(cardType = this.props.type, cardStyle = this.props.style) {
    switch (cardType) {
      case 'American Express':
        return <AmericanExpress style={cardStyle} />;
      case 'Diners Club':
        return <DinersClub style={cardStyle} />;
      case 'Discover':
        return <Discover style={cardStyle} />;
      case 'Jcb':
        return <Jcb style={cardStyle} />;
      case 'MasterCard':
        return <MasterCard style={cardStyle} />;
      default:
        return <Visa style={cardStyle} />;
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
