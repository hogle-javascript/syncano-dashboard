import CreateActions from '../../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    fetch: {},

    fetchPartialBackups: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.listPartialBackups'
    },
    removePartialBackups: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.removePartialBackups'
    }
  },
  {
    withDialog: true,
    withCheck: true
  }
);
