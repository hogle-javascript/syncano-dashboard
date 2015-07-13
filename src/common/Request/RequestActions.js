import Reflux from 'reflux';

let RequestActions = Reflux.createActions([
  'progress',
  'completed',
  'error',
  'abort'
]);

((open) => {
  XMLHttpRequest.prototype.open = function(...args) {
    if (args[1].includes('.syncano.')) {
      let addContext = function(callback) {
        return (event) => callback(event, ...args);
      };

      this.addEventListener('progress', addContext(RequestActions.progress), false);
      this.addEventListener('load', addContext(RequestActions.completed), false);
      this.addEventListener('error', addContext(RequestActions.error), false);
      this.addEventListener('abort', addContext(RequestActions.abort), false);
    }

    open.call(this, ...args);
  };
})(XMLHttpRequest.prototype.open);

export default RequestActions;
