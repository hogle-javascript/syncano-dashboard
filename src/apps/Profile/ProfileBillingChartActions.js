import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({
  fetchTotalDailyUsage: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Usage.listTotalDailyUsage'
  }
});
