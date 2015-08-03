import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions({}, {
  showDialog         : {},
  dismissDialog      : {},
  fetch              : {},
  setSolutions       : {},
  setFilter          : {},
  setTags            : {},
  toggleTagSelection : {},
  selectOneTag       : {},

  fetchSolutions : {
    asyncResult : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Solutions.list'
  },
  createSolution : {
    asyncResult : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Solutions.create'
  },
  starSolution : {
    asyncResult : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Solutions.star'
  },
  unstarSolution: {
    asyncResult : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Solutions.unstar'
  },
  fetchTags: {
    asyncResult : true,
    children    : ['completed', 'failure'],
    method      : 'Syncano.Actions.Solutions.listTags'
  }
});