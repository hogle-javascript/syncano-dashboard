var InstanceTabsMixin = {
  headerMenuItems: function() {
    var params = {
      instanceName: this.getParams().instanceName
    };

    return [
      {
        label: 'Classes',
        route: 'classes',
        params: params
      },
      {
        label: 'Users',
        route: 'users',
        params: params
      },
      {
        label: 'CodeBoxes',
        route: 'codeboxes',
        params: params
      },
      {
        label: 'Webhooks',
        route: 'webhooks',
        params: params
      },
      {
        label: 'Tasks',
        route: 'tasks',
        params: params
      }
    ];
  },

};

module.exports = InstanceTabsMixin;
