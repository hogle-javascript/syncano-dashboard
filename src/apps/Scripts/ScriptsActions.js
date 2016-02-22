import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setScripts: {},
    setScriptTraces: {},
    setScriptRuntimes: {},
    setCurrentScriptId: {},

    fetchScripts: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.list'
    },
    fetchTriggers: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Triggers.list'
    },
    fetchSchedules: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Schedules.list'
    },
    createScript: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.create'

    },
    updateScript: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.update'

    },
    runScript: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.run'

    },
    removeScripts: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.remove'

    },
    fetchScriptTrace: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.getTrace'

    },
    fetchScriptTraces: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.listTraces'

    },
    fetchScriptRuntimes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Scripts.listRuntimes'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
