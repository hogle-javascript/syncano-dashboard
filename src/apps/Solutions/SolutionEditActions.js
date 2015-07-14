var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var SolutionEditActions = Reflux.createActions({
  //checkItem: {},
  //uncheckAll: {},

  showDialog    : {},
  dismissDialog : {},

  fetch: {},
  setSolution: {},
  setSolutionVersions : {},

  fetchSolution: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  fetchSolutionVersions: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  createVersion: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  removeSolution: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  //starSolution: {
  //  asyncResult: true,
  //  children: ['completed', 'failure']
  //},
  //
  //unstarSolution: {
  //  asyncResult: true,
  //  children: ['completed', 'failure']
  //}

});

SolutionEditActions.fetchSolution.listen(function(solutionId) {
  console.info('SolutionsActions::fetchSolutions');
  Connection
    .Solutions
    .get(solutionId)
    .then(this.completed)
    .catch(this.failure);
});

SolutionEditActions.fetchSolutionVersions.listen(function(solutionId) {
  console.info('SolutionsActions::fetchSolutions');
  Connection
    .Solutions
    .listVersions(solutionId)
    .then(this.completed)
    .catch(this.failure);
});

SolutionEditActions.createVersion.listen(function(solutionId, payload) {
  console.info('SolutionsActions::createSolution');
  Connection
    .Solutions
    .createVersion(solutionId, payload)
    .then(this.completed)
    .catch(this.failure);
});

SolutionEditActions.removeSolution.listen(function(solutionId) {
  console.info('SolutionsActions::createSolution');
  Connection
    .Solutions
    .remove(solutionId)
    .then(this.completed)
    .catch(this.failure);
});

//SolutionsActions.unstarSolution.listen(function(id) {
//  console.info('SolutionsActions::unstarSolutions');
//  Connection
//    .Solutions
//    .unstar(id)
//    .then(this.completed)
//    .catch(this.failure);
//});

module.exports = SolutionEditActions;
