var HeaderActions = require('./HeaderActions');

var HeaderMixin = {
  componentDidMount: function () {
    var breadcrumbs = this.headerBreadcrumbs || [],
        menuItems   = this.headerMenuItems   || [];

    if (typeof breadcrumbs === 'function') {
      breadcrumbs = breadcrumbs.call(this);
    }

    if (typeof menuItems === 'function') {
      menuItems = menuItems.call(this);
    }

    var hasBreadcrumbs = breadcrumbs && breadcrumbs.length > 0.
        hasMenuItems   = menuItems && menuItems.length > 0;

    // We want to have just one render here
    if (hasBreadcrumbs && hasMenuItems) {
      HeaderActions.set({
        breadcrumbs: breadcrumbs,
        menuItems: menuItems
      });
    } else if (hasBreadcrumbs) {
      HeaderActions.setBreadcrumbs(breadcrumbs);
    } else if (hasMenuItems) {
      HeaderActions.setMenuItems(menuItems);
    }

  },

  componentWillUnmount: function () {
    HeaderActions.clear();
  },

  setHeaderBreadcrumbs: function (breadcrumbs) {
    HeaderActions.setBreadcrumbs(breadcrumbs);
  },

  setHeaderMenuItems: function (menuItems) {
    HeaderActions.setMenuItems(menuItems);
  },

};

module.exports = HeaderMixin;