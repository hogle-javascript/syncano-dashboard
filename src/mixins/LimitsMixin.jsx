import React from 'react';

import Notification from '../common/Notification/Notification.react';

export default {

  getInitialState() {
    return {
      notification: null
    }
  },

  getLimit(objectsName) {
    let limits = {
      instances: 16,
      classes: 32
    };

    return limits[objectsName];
  },

  checkObjectsCount(objectsName, addCallback) {
    if (this.state.items.length >= this.getLimit(objectsName)) {
      this.setState({
        notification: true
      }, () => {
        setTimeout(() => {
          this.setState({
            notification: null
          })
        }, 5000)
      })
    } else {
      addCallback();
    }
  },

  renderNotification(objectsName) {
    if (this.state.notification) {
      return (
      <Notification type='error'>
        Maximum {objectsName} count exceeded. You can have maximum {this.getLimit(objectsName)} {objectsName}.
      </Notification>
      );
    }

    return null;
  }
};
