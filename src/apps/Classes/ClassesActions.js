import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    setClasses: {},
    setClickedClass: {},
    fetch: {},
    getClassByName: {},

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
  },
  {
    withDialog: true,
    withCheck: true
  }
);
