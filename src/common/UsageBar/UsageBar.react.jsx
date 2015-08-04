let React = require('react');
let classNames = require('classnames');

require('./UsageBar.css');

module.exports = React.createClass({

  displayName: 'UsageBar',

  propsTypes: {
    billingProfile: React.PropTypes.object
  },

  render: function() {
    let limitEnabled = this.props.billingProfile.hard_limit > 0;
    let alertEnabled = this.props.billingProfile.soft_limit > 0;
    let cssClasses = classNames({
      'usage-bar': true,
      'usage-bar-limit-enabled': limitEnabled,
      'usage-bar-alert-enabled': alertEnabled,
    });
    let balance = '$' + this.props.billingProfile.balance.total;
    let costBarStyle = {
      width: limitEnabled ? (this.props.billingProfile.balance.total / this.props.billingProfile.hard_limit) * 100 + "%" : "0%"
    };
    let left;
    if (alertEnabled && limitEnabled) {
      left = (this.props.billingProfile.soft_limit / this.props.billingProfile.hard_limit) * 100 + "%"
    } else if (alertEnabled && !limitEnabled) {
      left = (this.props.billingProfile.soft_limit / this.props.billingProfile.hard_limit) * 100 + "%"
    }
    let alertIndicatorStyle = {
      left: left
    };
    return (
      <div className={cssClasses}>
        <div className="usage-bar-cost" style={costBarStyle}></div>
        <div className="usage-alert-indicator" style={alertIndicatorStyle}></div>
        <div className="usage-text usage-text-cost">
          <div className="usage-text-description">Current cost</div>
          <div className="usage-text-amount">{balance}</div>
        </div>
        <div className="usage-text usage-text-limit">
          <div className="usage-text-description">Limit</div>
          <div className="usage-text-amount">{'$' + this.props.billingProfile.hard_limit}</div>
        </div>
      </div>
    );
  }
});

