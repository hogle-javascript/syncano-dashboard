import React from 'react';
import _ from 'lodash';

import SessionStore from '../../src/apps/Session/SessionStore';

import Notification from '../common/Notification/Notification.react';

export default {

  getInitialState() {
    return {
      limitNotification: null
    }
  },

  isFriend() {
    if (SessionStore.getUser()) {
      let email = SessionStore.getUser({}).email;
      let endings = ['syncano.rocks', 'syncano.io', 'syncano.com', 'chimeraprime.com'];

      return _.some(endings, (ending) => _.endsWith(email, ending))
    }

    return false;
  },

  getLimit(objectsName) {
    let limits = {
      instances: 16,
      classes: this.isFriend() ? 64 : 32
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
