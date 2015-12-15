import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setSnippets: {},
    setSnippetTraces: {},
    setSnippetRuntimes: {},
    setCurrentSnippetId: {},

    fetchSnippets: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.list'
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
    createSnippet: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.create'

    },
    updateSnippet: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.update'

    },
    runSnippet: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.run'

    },
    removeSnippets: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.remove'

    },
    fetchSnippetTrace: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.getTrace'

    },
    fetchSnippetTraces: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.listTraces'

    },
    fetchSnippetRuntimes: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Snippets.listRuntimes'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
