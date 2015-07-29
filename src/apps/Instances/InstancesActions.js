import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions({
    withDialog : true,
    withCheck  : true
  },
  {
    fetch         : {},
    setInstances  : {},

    fetchInstances: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Instances.list'
    },
    createInstance: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Instances.create'
    },
    updateInstance: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Instances.update'
    },
    removeInstances: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Instances.remove'
    }
  }
);
