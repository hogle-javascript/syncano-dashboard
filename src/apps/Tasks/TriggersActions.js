import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setTriggers: {},
    createTrigger: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.create'
    },
    fetchTriggers: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.list'
    },
    updateTrigger: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.update'
    },
    removeTriggers: {
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
