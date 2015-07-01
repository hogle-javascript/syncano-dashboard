var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var SolutionsActions = Reflux.createActions({
  checkItem: {},
  uncheckAll: {},
  fetch: {},
  setSolutions: {},
  fetchSolutions: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

  createSolution: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },

  updateSolution: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },

  removeSolutions: {
    asyncResult: true,
    children: ['completed', 'failure']
  },

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
    .create({
      name        : payload.name,
      description : payload.description,
      metadata    : payload.metadata
    })
    .then(this.completed)
    .catch(this.failure);
});

SolutionsActions.updateSolution.listen(function(name, payload) {
  console.info('SolutionsActions::updateSolution');
  Connection
    .Solutions
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

SolutionsActions.removeSolutions.listen(function(names) {
  names.map(function(name) {
    console.info('SolutionsActions::removeSolutions');
    Connection
      .Solutions
      .remove(name)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = SolutionsActions;
