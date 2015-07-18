let React = require('react');
let AmericanExpress = require('./AmericanExpress.react');
let DinersClub = require('./DinersClub.react');
let Discover = require('./Discover.react');
let JCB = require('./JCB.react');
let MasterCard = require('./MasterCard.react');
let Visa = require('./Visa.react');

module.exports = React.createClass({

  displayName: 'PaymentIcon',

  getCardIcon: function(cardType, cardStyle) {
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

  render: function() {
    var cardIcon = this.getCardIcon(this.props.type, this.props.style);

    return (
      <div>
        {cardIcon}
      </div>
    );
  }
});
