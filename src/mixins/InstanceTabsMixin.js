var InstanceTabsMixin = {
  headerMenuItems: function() {
    var params = {
      instanceName: this.getParams().instanceName
    };

    return [
      {
        label: 'Data',
        route: 'data',
        params: params
      },
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
        label: 'Channels',
        route: 'channels',
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
