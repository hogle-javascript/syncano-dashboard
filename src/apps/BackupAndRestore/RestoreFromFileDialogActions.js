import CreateActions from '../../utils/ActionsConstructor';

export default CreateActions(
  {
    setClickedBackup: {},

    restoreFromFile: {
      asyncResult: true,
      asyncForm: true,
      loading: true,
      children: ['completed', 'failure'],
      method: 'Syncano.Actions.BackupAndRestore.restoreFromFile'
    }
  },
  {
    withDialog: true
  }
);
