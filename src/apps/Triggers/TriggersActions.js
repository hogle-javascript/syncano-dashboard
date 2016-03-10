import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setTriggers: {},
    fetchTriggers: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.list'
    },
    createTrigger: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.create'
    },
    updateTrigger: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.update'
    },
    removeTriggers: {
      loading: true,
      closingDialogs: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
