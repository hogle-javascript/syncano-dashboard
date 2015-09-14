import React from 'react';

import Notification from '../common/Notification/Notification.react';

export default {

  getInitialState() {
    return {
      limitNotification: null
    }
  },

  getLimit(objectsName) {
    let limits = {
      instances: 16,
      classes: 32
    };

    return limits[objectsName];
  },

  checkObjectsCount(items, objectsName, addCallback) {
    if (items.length >= this.getLimit(objectsName)) {
      this.setState({
        limitNotification: true
      }, () => {
        setTimeout(() => {
          this.setState({
            limitNotification: null
          })
        }, 5000)
      })
    } else {
      addCallback();
    }
  },

  renderLimitNotification(objectsName) {
    if (this.state.limitNotification) {
      return (
      <Notification type='error'>
        Maximum {objectsName} count exceeded. You can have maximum {this.getLimit(objectsName)} {objectsName}.
      </Notification>
      );
    }

    return null;
  }
};
