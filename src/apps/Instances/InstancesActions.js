import CreateActions from '../../utils/ActionsConstructor.js'
import Syncano from '../Syncano';

export default CreateActions({
    withDialog : true,
    withCheck  : true,
  },
  {
    fetch         : {},
    setInstances  : {},

    fetchInstances: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : Syncano.Actions.fetchInstances
    },
    createInstance: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : Syncano.Actions.createInstance
    },
    updateInstance: {
      asyncResult : true,
      asyncForm   : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : Syncano.Actions.updateInstance
    },
    removeInstances: {
      asyncResult : true,
      loading     : true,
      children    : ['completed', 'failure'],
      method      : Syncano.Actions.removeInstances
    }
  }
);