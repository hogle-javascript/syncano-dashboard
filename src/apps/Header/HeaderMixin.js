var React         = require('react'),
    HeaderActions = require('./HeaderActions');

var HeaderMixin = {
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
    var menuItems = this.headerMenuItems || [];

    if (typeof menuItems === 'function') {
      menuItems = menuItems.call(this);
    }

    var hasMenuItems = menuItems && menuItems.length > 0;

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

  componentDidMount: function() {
    this.setupMenu();
  },

  setHeaderMenuItems: function(menuItems) {
    HeaderActions.setMenuItems(menuItems);
  }

};

module.exports = HeaderMixin;
