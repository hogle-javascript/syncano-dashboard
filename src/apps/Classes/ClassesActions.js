import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions(
  {
    withDialog: true,
    withCheck: true
  },
  {
    setClasses: {},
    fetch: {},
    getClassByName: {},

    fetchClasses: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.list'
    },
    createClass: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.create'
    },
    updateClass: {
      asyncForm: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.update'
    },
    removeClasses: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Classes.remove'
    }
  }
);
