import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setCodeBoxes: {},
    setCodeBoxTraces: {},
    setCodeBoxRuntimes: {},
    setCurrentCodeBoxId: {},

    fetchCodeBoxes: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.list'
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
    createCodeBox: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.create'

    },
    updateCodeBox: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.update'

    },
    runCodeBox: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.run'

    },
    removeCodeBoxes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.remove'

    },
    fetchCodeBoxTrace: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.getTrace'

    },
    fetchCodeBoxTraces: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.listTraces'

    },
    fetchCodeBoxRuntimes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.CodeBoxes.listRuntimes'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
