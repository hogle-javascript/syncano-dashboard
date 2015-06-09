var React           = require('react'),
    classNames      = require('classnames'),
    MaterialIcon    = require('../Icon/MaterialIcon.react');


require('./Notification.sass');

module.exports = React.createClass({

  displayName: 'Notification',

  propTypes: {
    status: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
  },

  getDefaultProps: function() {
    return {
      status: 'info'
    };
  },

  render: function() {
  	var cssClasses  = classNames({
      'notification'          : true,
      'notification--info'    : this.props.status === 'info',
      'notification--error'   : this.props.status === 'error',
      'notification--warning' : this.props.status === 'warning'
    });
    return (
      <div className={cssClasses}>
        <div className="notification__content">
          <div className="notification__content__icon">
            <MaterialIcon name={this.props.status} />
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
});
