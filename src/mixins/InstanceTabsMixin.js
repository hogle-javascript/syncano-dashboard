var InstanceTabsMixin = {
  headerMenuItems: function() {

    var tabs = [
      {
        label: 'Data Browser',
        route: 'data-objects',
      },
      {
        label: 'Classes',
        route: 'classes',
      },
      {
        label: 'API Keys',
        route: 'api-keys',
      },
      {
        label: 'Admins',
        route: 'admins',
      },
      {
        label: 'Users',
        route: 'users',
      },
      {
        label: 'CodeBoxes',
        route: 'codeboxes',
      },
      {
        label: 'Webhooks',
        route: 'webhooks',
      },
      {
        label: 'Tasks',
        route: 'tasks',
      }
    ];

    var currentRoute = this.getRoutes().slice(-1)[0].name;
    tabs.map(function(tab) {
      tab.params = {instanceName: this.getParams().instanceName};
      if (tab.route == currentRoute){
       tab.active = true;
      }
    }.bind(this));

    return tabs;
  },

};

module.exports = InstanceTabsMixin;