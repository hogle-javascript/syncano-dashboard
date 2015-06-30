var React           = require('react'),
    classNames      = require('classnames'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    FontIcon        = mui.FontIcon;

require('./Notification.sass');

module.exports = React.createClass({

  displayName: 'Notification',

  mixins: [StylePropable],

  propTypes: {
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
  },

  getDefaultProps: function() {
    return {
      type: 'info'
    };
  },

  getStyles: function() {
    var styles = {
      fontSize      : 18,
      lineHeight    : 1,
      color         : 'inherit',
      verticalAlign : 'middle'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {

    var styles = this.getStyles();

    var cssClasses  = classNames({
      'notification'          : true,
      'notification--info'    : this.props.type === 'info',
      'notification--error'   : this.props.type === 'error',
      'notification--warning' : this.props.type === 'warning'
    });

    var iconClass   = classNames({
      'information'           : this.props.type === 'info',
      'alert-circle'          : this.props.type === 'error',
      'alert'                 : this.props.type === 'warning'
    });

    return (
      <div className={cssClasses}>
        <div className="notification__content">
          <div className="notification__content__icon">
            <FontIcon
              style     = {styles}
              className = {"synicon-" + iconClass} />
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
});
