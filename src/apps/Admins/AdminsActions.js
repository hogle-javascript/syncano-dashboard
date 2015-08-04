import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({
  checkItem: {},
  uncheckAll: {},
  selectAllAdmins: {},
  fetch: {},
  setAdmins: {},
  showDialog: {},
  dismissDialog: {},
  fetchAdmins: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Admins.list'
  },
  updateAdmin: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Admins.update'
  },
  removeAdmins: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Admins.remove'
  }
});
