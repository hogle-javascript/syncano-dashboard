import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions(
  {
    withCheck  : true,
    withDialog : true
  },
  {
  fetch         : {},
  setUsers      : {},
  fetchUsers: {
    asyncResult: true,
    loading    : true,
    children   : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.list'
  },
  createUser: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.create'
  },
  updateUser: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.update'
  },
  removeUsers: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.remove'
  },
  addToGroup: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.addToGroup'
  },
  removeFromGroup: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.removeFromGroup'
  },
  getUserGroups: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method     : 'Syncano.Actions.Users.listUserGroups'
  }
});
