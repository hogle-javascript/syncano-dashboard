import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  setClasses: {},
  fetch: {},
  getClassByName: {},

  fetchClasses: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Classes.list'
  },
  getClass: {
    asyncResult: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Classes.get'
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
});
