import _ from 'lodash';

export default {

  getMenuItemHref(route) {
    return this.makeHref(route, this.getParams());
  },

  getActiveTab(menuItems, params) {
    let output = {};

    _.some(menuItems, (item, index) => {
      if (item.route && this.isActive(item.route, item.params, item.query)) {
        output.index = index;
        _.map(params, (param) => {
          output[param] = item[param];
        });
        return true;
      }
    });

    return output;
  }
};
