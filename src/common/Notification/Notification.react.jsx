import React from 'react';
import classNames from 'classnames';

import MUI from 'material-ui';

import './Notification.sass';

export default React.createClass({

  displayName: 'Notification',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    style: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
  },

  getDefaultProps() {
    return {
      type: 'info'
    };
  },

  getStyles() {
    const styles = {
      fontSize: 18,
      lineHeight: 1,
      color: 'inherit',
      verticalAlign: 'middle'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    const styles = this.getStyles();

    const cssClasses = classNames({
      'notification': true, // eslint-disable-line quote-props
      'notification--info': this.props.type === 'info',
      'notification--error': this.props.type === 'error',
      'notification--warning': this.props.type === 'warning'
    }, this.props.className);

    const iconClass = classNames({
      'information': this.props.type === 'info', // eslint-disable-line quote-props
      'alert-circle': this.props.type === 'error',
      'alert': this.props.type === 'warning' // eslint-disable-line quote-props
    });

    return (
      <div className={cssClasses}>
        <div className="notification__content">
          <div className="notification__content__icon">
            <MUI.FontIcon
              style={styles}
              className={`synicon-${iconClass}`} />
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
});
