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
    switch(cardType) {
      case 'AmericanExpress':
        return <AmericanExpress style={cardStyle}/>;
        break;
      case 'DinersClub':
        return <DinersClub style={cardStyle}/>;
        break;
      case 'Discover':
        return <Discover style={cardStyle}/>;
        break;
      case 'JCB':
        return <JCB style={cardStyle}/>;
        break;
      case 'MasterCard':
        return <MasterCard style={cardStyle}/>;
        break;
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
