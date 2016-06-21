import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    setClasses: {},
    setClickedClass: {},
    fetch: {},
    getClassByName: {},

    fetchDemoApps: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DemoApps.list'
    }
  },
  {
    withDialog: true
  }
);
