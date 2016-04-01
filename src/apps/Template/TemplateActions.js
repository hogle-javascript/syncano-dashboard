import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  fetch: {},

  fetchTemplate: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.get'
  },

  updateTemplate: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.update'
  },

  renderTemplate: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Templates.render'
  }

});
