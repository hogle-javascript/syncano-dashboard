import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setDataViews: {},

    fetchDataViews: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataViews.list'
    },
    createDataView: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataViews.create'
    },
    updateDataView: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataViews.update'
    },
    removeDataViews: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.DataViews.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
