import React from 'react';
import classNames from 'classnames';
import {FontIcon, Utils} from 'syncano-material-ui';

import './Notification.sass';

export default React.createClass({
  displayName: 'Notification',

  propTypes: {
    style: React.PropTypes.object,
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.any.isRequired
  },

  mixins: [Utils.Styles],

  getDefaultProps() {
    return {
      type: 'info'
    };
  },

  getStyles() {
    return {
      icon: {
        fontSize: 18,
        lineHeight: 1,
        color: 'inherit',
        verticalAlign: 'middle',
        display: 'inline-flex'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {type, className, style, children} = this.props;

    const cssClasses = classNames({
      notification: true,
      'notification--info': type === 'info',
      'notification--error': type === 'error',
      'notification--warning': type === 'warning'
    }, className);

    const iconClass = classNames({
      information: type === 'info',
      'alert-circle': type === 'error',
      alert: type === 'warning'
    });

    return (
      <div className={cssClasses}>
        <div className="notification__content" style={style}>
          <div className="notification__content__icon">
            <FontIcon
              style={styles.icon}
              className={`synicon-${iconClass}`} />
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  }
});
