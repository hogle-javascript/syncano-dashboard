import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({
  fetch: {},
  setType: {},
  setInstance: {},
  setInstances: {},
  clearExportSpec: {},
  fetchInstanceData: {},

  fetchInstances: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Instances.list'
  },
  fetchInstance: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Instances.set'
  },
  fetchClasses: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Classes.list'
  },
  fetchTriggers: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Triggers.list'
  },
  fetchSchedules: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Schedules.list'
  },
  fetchWebhooks: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Webhooks.list'
  },
  fetchCodeBoxes: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.list'
  },
  fetchChannels: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Channels.list'
  },
  fetchDataViews: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.DataViews.list'
  },
  createVersion: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Solutions.createVersion'
  }
});
