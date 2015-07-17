var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var SolutionsActions = Reflux.createActions({
  //checkItem: {},
  //uncheckAll: {},

  showDialog    : {},
  dismissDialog : {},

  fetch: {},
  setSolutions: {},

  fetchSolutions: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  createSolution: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  starSolution: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  unstarSolution: {
    asyncResult: true,
    children: ['completed', 'failure']
  }

});

SolutionsActions.fetchSolutions.listen(function() {
  console.info('SolutionsActions::fetchSolutions');
  Connection
    .Solutions
    .list()
    .then(this.completed)
    .catch(this.failure);
});

SolutionsActions.createSolution.listen(function(payload) {
  console.info('SolutionsActions::createSolution');
  Connection
    .Solutions
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

SolutionsActions.starSolution.listen(function(id) {
  console.info('SolutionsActions::starSolutions');
  Connection
    .Solutions
    .star(id)
    .then(this.completed)
    .catch(this.failure);
});

SolutionsActions.unstarSolution.listen(function(id) {
  console.info('SolutionsActions::unstarSolutions');
  Connection
    .Solutions
    .unstar(id)
    .then(this.completed)
    .catch(this.failure);
});

module.exports = SolutionsActions;
