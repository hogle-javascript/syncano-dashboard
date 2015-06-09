var React           = require('react'),
    classNames      = require('classnames'),
    MaterialIcon    = require('../Icon/MaterialIcon.react');


require('./Notification.sass');

module.exports = React.createClass({

  displayName: 'Notification',

  propTypes: {
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
  },

  getDefaultProps: function() {
    return {
      type: 'info'
    };
  },

  render: function() {
  	var cssClasses  = classNames({
      'notification'          : true,
      'notification--info'    : this.props.type === 'info',
      'notification--error'   : this.props.type === 'error',
      'notification--warning' : this.props.type === 'warning'
    });
    return (
      <div className={cssClasses}>
        <div className="notification__content">
          <div className="notification__content__icon">
            <MaterialIcon name={this.props.type} />
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
});
