import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    withCheck: true,
    withDialog: true
  },
  {
    fetch: {},
    setSchedules: {},
    fetchSchedules: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.list'
    },
    createSchedule: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.create'
    },
    updateSchedule: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.update'
    },
    removeSchedules: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.remove'
    }
  }
);
