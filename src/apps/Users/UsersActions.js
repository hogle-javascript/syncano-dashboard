import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setUsers: {},
    fetchUsers: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.list'
    },
    createUser: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.create'
    },
    updateUser: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.update'
    },
    removeUsers: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.remove'
    },
    addToGroup: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.addToGroup'
    },
    removeFromGroup: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.removeFromGroup'
    },
    getUserGroups: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Users.listUserGroups'
    }
  },
  {
    withCheck: true,
    withDialog: true
  }
);
