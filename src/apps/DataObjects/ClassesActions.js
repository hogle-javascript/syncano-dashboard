var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var ClassesActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  getClasses: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  createClass: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  updateClass: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  removeClasses: {
      asyncResult: true,
      children: ['completed', 'failure']
  }
});

ClassesActions.getClasses.listen( function() {
  console.info('ClassesActions::getClasses');
  Connection
    .Classes
    .list()
    .then(this.completed)
    .catch(this.failure);
});

ClassesActions.createClass.listen( function(payload) {
  console.info('ClassesActions::createClass', payload);
  Connection
    .Classes
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});


ClassesActions.updateClass.listen( function(classname, payload) {
  console.info('ClassesActions::updateClass');
  Connection
    .Classes
    .update(classname, payload)
    .then(this.completed)
    .catch(this.failure);
});

ClassesActions.removeClasses.listen( function(classnames) {
  classname.map(function(classname) {
    console.info('ClassesActions::removeClasses');
    Connection
      .Classes
      .remove(classname)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = ClassesActions;