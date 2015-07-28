import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({}, {
  setCurrentObjectId: {},
  fetchCodeBoxTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.listTraces'
  },

  fetchWebhookTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Webhooks.listTraces'
  },

  fetchTriggerTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Triggers.listTraces'
  },

  fetchScheduleTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Schedules.listTraces'
  }
});
