var React           = require('react'),
    classNames      = require('classnames'),
    MaterialIcon    = require('../Icon/MaterialIcon.react');


require('./Notification.sass');

module.exports = React.createClass({

  displayName: 'Notification',

  render: function() {
  	var cssClasses  = classNames({
      'notification-card'    : true,
      'notification-info'    : this.props.type.status === "info",
      'notification-error'   : this.props.type.status === "error",
      'notification-warning' : this.props.type.status === "warning"
    });
    return (
      <div className={cssClasses}>
        <div className="notification-content">
          <div className="notification-icon">
            <MaterialIcon name={this.props.type.status} />
          </div>
          <div>
            <span>{this.props.type.text}</span>
          </div>
        </div>
      </div>
    )
  }
});
