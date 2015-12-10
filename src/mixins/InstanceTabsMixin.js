export default {
  headerMenuItems() {
    let params = {
      instanceName: this.getParams().instanceName
    };

    return [
      {
        label: 'Data',
        route: 'data',
        params
      },
      {
        label: 'Classes',
        route: 'classes',
        params
      },
      {
        label: 'Users',
        route: 'users',
        params
      },
      {
        label: 'Snippets',
        route: 'snippets',
        params
      },
      {
        label: 'Channels',
        route: 'channels',
        params
      },
      {
        label: 'Schedules',
        route: 'schedules',
        params
      },
      {
        label: 'Triggers',
        route: 'triggers',
        params
      }
    ];
  }
};
