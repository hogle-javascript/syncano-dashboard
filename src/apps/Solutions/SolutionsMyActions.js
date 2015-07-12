var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var SolutionsMyActions = Reflux.createActions({
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

SolutionsMyActions.fetchSolutions.listen(function() {
  console.info('SolutionsActions::fetchSolutions');
  Connection
    .Solutions
    .list({created_by_me: true})
    .then(this.completed)
    .catch(this.failure);
});

SolutionsMyActions.createSolution.listen(function(payload) {
  console.info('SolutionsActions::createSolution');
  Connection
    .Solutions
    .create(payload)
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

module.exports = SolutionsMyActions;
