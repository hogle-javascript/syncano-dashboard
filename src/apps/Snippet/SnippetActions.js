import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  setCurrentSnippetTraces: {},
  setCurrentSnippetId: {},
  setCurrentSnippet: {},
  fetch: {},

  runSnippetWithUpdate: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Snippets.runWithUpdate'
  },

  fetchSnippet: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Snippets.get'
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

  fetchSnippetTraces: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Snippets.listTraces'
  }
});
