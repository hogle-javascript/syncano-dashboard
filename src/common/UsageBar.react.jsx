var React       = require('react');
var classNames  = require('classnames');

module.exports = React.createClass({

  displayName: 'UsageBar',

  render: function() {
    var limitEnabled = this.props.billingProfile.hard_limit > 0;
    var alertEnabled = this.props.billingProfile.soft_limit > 0;
    var cssClasses = classNames({
      'usage-bar': true,
      'usage-bar-limit-enabled': limitEnabled,
      'usage-bar-alert-enabled': alertEnabled,
    });
    var balance = '$' + this.props.billingProfile.balance.total;
    var costBarStyle = {
      width: limitEnabled ? (this.props.billingProfile.balance.total / this.props.billingProfile.hard_limit) * 100 + "%" : "0%"
    };
    var left;
    if (alertEnabled && limitEnabled) {
      left = (this.props.billingProfile.soft_limit / this.props.billingProfile.hard_limit) * 100 + "%"
    } else if (alertEnabled && !limitEnabled) {
      left = (this.props.billingProfile.soft_limit / this.props.billingProfile.hard_limit) * 100 + "%"
    }
    var alertIndicatorStyle = {
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

