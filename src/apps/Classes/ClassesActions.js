import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({
    checkItem: {},
    uncheckAll: {},
    selectAll: {},

    setClasses: {},
    fetch: {},
    getClassByName: {},

    showDialog: {},
    dismissDialog: {},

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
