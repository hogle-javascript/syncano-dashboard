import CreateActions from '../../utils/ActionsConstructor.js';

export default CreateActions(
  {
    withCheck  : true,
    withDialog : true
  },
  {
    checkToggleColumn     : {},
    fetch                 : {},
    setDataObjects        : {},
    setCurrentClassObj    : {},
    setSelectedRows       : {},
    getIDsFromTable       : {},

    fetchCurrentClassObj  : {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.DataObjects.getClass'

    },
    fetchDataObjects: {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.DataObjects.list'

    },
    subFetchDataObjects: {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.DataObjects.subList'
    },
    createDataObject: {
      asyncForm   : true,
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.DataObjects.create'
    },
    updateDataObject: {
      asyncForm   : true,
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.DataObjects.update'
    },
    removeDataObjects: {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.DataObjects.remove'
    }
  }
);
