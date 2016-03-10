import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},
    setGroups: {},
    fetchGroups: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Groups.list'
    },
    createGroup: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Groups.create'
    },
    updateGroup: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Groups.update'
    },
    removeGroups: {
      loading: true,
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Groups.remove'
    },
    fetchGroupUsers: {
      asyncResult: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.Groups.listUsers'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
