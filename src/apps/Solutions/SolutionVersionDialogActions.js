import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({}, {
  showDialog         : {},
  dismissDialog      : {},

  fetchInstances: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Instances.list'
  },
  fetchInstance: {
    asyncResult : true,
    children    : ['completed', 'failure']
  }
});
