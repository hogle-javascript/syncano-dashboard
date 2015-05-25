var React           = require('react');
var classNames      = require('classnames');

//var ViewActions     = require('../actions/ViewActions');

var Icon            = require('../Icon/Icon.react');

require('./Notification.css');

module.exports = React.createClass({

  displayName: 'Notification',

  componentDidMount: function() {
    setTimeout(function(){
      ViewActions.closeNotification();
    }.bind(this), 3000);
  },

  render: function() {
  	var cssClasses  = classNames({
      'notification-card'    : true,
      'notification-info'    : this.props.type.status === "info",
      'notification-error'   : this.props.type.status === "error",
      'notification-warning' : this.props.type.status === "warning",
    });
    var iconStyle;
    if (this.props.type.status === "info") {
    	  iconStyle = {fill: "#039BE5", width: "22px", heigh: "22px"};
      } else if (this.props.type.status === "error") {
      	iconStyle = {fill: "#E53935", width: "22px", heigh: "22px"};
      } else {
      	iconStyle = {fill: "#FF9800", width: "22px", heigh: "22px"};
      }
    return (
      <div className={cssClasses}>
        <div className="notification-content">
          <div className="notification-icon">
            <Icon style={iconStyle} type={this.props.type.status} />
          </div>
          <div>
            <span>{this.props.type.text}</span>
          </div>
        </div>
      </div>
    )
  }

});