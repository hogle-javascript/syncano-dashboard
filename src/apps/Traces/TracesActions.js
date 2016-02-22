import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  setCurrentObjectId: {},
  fetchScriptTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.listTraces'
  },

  fetchCodeBoxTraces: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.listTraces'
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
  },

  fetchCurrentScript: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Scripts.get'
  },

  fetchCurrentCodeBox: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.CodeBoxes.get'
  },

  fetchCurrentTrigger: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Triggers.get'
  },

  fetchCurrentSchedule: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Schedules.get'
  }
});
