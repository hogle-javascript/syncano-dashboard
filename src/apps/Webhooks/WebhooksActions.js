import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setWebhooks: {},

    createWebhook: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Webhooks.create'
    },
    fetchWebhooks: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Webhooks.list'
    },
    updateWebhook: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Webhooks.update'
    },
    removeWebhooks: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Webhooks.remove'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
