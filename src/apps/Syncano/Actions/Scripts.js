import _ from 'lodash';

export default {
  get(id) {
    this.NewLibConnection
      .Script
      .please()
      .get({id})
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, params) {
    this.NewLibConnection
      .Script
      .please()
      .update({id}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  run(params) {
    const {id, payload} = params;

    this.NewLibConnection
      .Script
      .please()
      .run({id}, {payload})
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Script
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    let source = '';
    const {runtime_name, label, description} = payload;
    const comment = {
      python: '#',
      javascript: '//',
      ruby: '#',
      golang: '//',
      swift: '//',
      php: '//'
    }[runtime_name];

    if (comment) {
      source = `${comment} Start coding!`;
    }

    this.NewLibConnection
      .Script
      .please()
      .create({runtime_name, label, description, source})
      .then(this.completed)
      .catch(this.failure);
  },

  remove(scripts) {
    const promises = _.map(scripts, (script) => this.NewLibConnection.Script.please().delete({id: script.id}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  getTrace(scriptId, id) {
    this.NewLibConnection
      .ScriptTrace
      .please()
      .get({scriptId, id})
      .then(this.completed)
      .catch(this.failure);
  },

  listTraces(scriptId) {
    this.NewLibConnection
      .ScriptTrace
      .please()
      .ordering('desc')
      .list({scriptId})
      .then(this.completed)
      .catch(this.failure);
  },

  listRuntimes() {
    this.NewLibConnection
      .Script
      .please()
      .getRuntimes()
      .then(this.completed)
      .catch(this.failure);
  }
};
