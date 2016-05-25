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
    createPartialBackup: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.createPartialBackup'
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
