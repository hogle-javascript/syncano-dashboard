import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setTemplates: {},
    fetchTemplates: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.list'
    },
    createTemplate: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.create'
    },
    updateTemplate: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.update'
    },
    removeTemplates: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.remove'
    },
    renderTemplatese: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Templates.render'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
