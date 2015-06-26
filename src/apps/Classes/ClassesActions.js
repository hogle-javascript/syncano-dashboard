var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = require('../Session/Connection').get(),
    D          = Syncano.D;


var ClassesActions = Reflux.createActions({
  checkItem      : {},
  uncheckAll     : {},

  setClasses     : {},
  fetch          : {},
  getClassByName : {},

  fetchClasses: {
      asyncResult : true,
      children    : ['completed', 'failure']
  },
  createClass: {
      asyncForm   : true,
      asyncResult : true,
      children    : ['completed', 'failure']
  },
  updateClass: {
      asyncForm   : true,
      asyncResult : true,
      children    : ['completed', 'failure']
  },
  removeClasses: {
      asyncResult : true,
      children    : ['completed', 'failure']
  }
});

ClassesActions.fetchClasses.listen( function() {
  console.info('ClassesActions::fetchClasses');
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
  console.info('ClassesActions::removeClasses');
  var promises = classnames.map(function(classname) {
    Connection.Classes.remove(classname);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = ClassesActions;