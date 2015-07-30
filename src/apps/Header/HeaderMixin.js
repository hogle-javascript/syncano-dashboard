import React from 'react';
import HeaderActions from './HeaderActions';

export default {
  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo() {
      console.debug('HeaderMixin:willTransitionTo');
      HeaderActions.clear();
    }
  },

  setupMenu() {
    let menuItems = this.headerMenuItems || [];

    if (typeof menuItems === 'function') {
      menuItems = menuItems.call(this);
    }

    let hasMenuItems = menuItems && menuItems.length > 0;

    // We want to have just one render here
    if (hasMenuItems) {
      HeaderActions.set({
        menuItems: menuItems
      });
    } else if (hasMenuItems) {
      HeaderActions.setMenuItems(menuItems);
    }
  },

  componentWillReceiveProps() {
    this.setupMenu();
  },

  componentDidMount() {
    this.setupMenu();
  },

  setHeaderMenuItems(menuItems) {
    HeaderActions.setMenuItems(menuItems);
  }
};
