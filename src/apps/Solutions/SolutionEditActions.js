import CreateActions from '../../utils/ActionsConstructor.js'

export default CreateActions(
  {
    withDialog: true
  },
  {
    fetch: {},
    setSolution: {},
    setSolutionVersions : {},

    fetchSolution : {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Solutions.get'
    },
    fetchSolutionVersions : {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Solutions.listVersions'
    },
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
    installSolution : {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Solutions.install'
    },
    createVersion : {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Solutions.createVersion'
    },
    removeSolution : {
      asyncResult : true,
      children    : ['completed', 'failure'],
      method      : 'Syncano.Actions.Solutions.remove'
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
    }
  }
);
