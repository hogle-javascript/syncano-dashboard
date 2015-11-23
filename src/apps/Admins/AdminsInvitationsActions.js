import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
  checkItem: {},
  uncheckAll: {},
  selectAll: {},
  fetch: {},
  setInvitations: {},

  fetchInvitations: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Invitations.list'
  },
  createInvitation: {
    asyncResult: true,
    asyncForm: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Invitations.create'
  },
  resendInvitation: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Invitations.resend'
  },
  removeInvitation: {
    asyncResult: true,
    loading: true,
    children: ['completed', 'failure'],
    method: 'Syncano.Actions.Invitations.remove'
  }
});
