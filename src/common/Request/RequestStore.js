import Reflux from 'reflux';
import RequestActions from './RequestActions';

let RequestStore = Reflux.createStore({
  listenables: RequestActions,

  onProgress(event, method, url) {
    console.debug('RequestStore::onProgress', method, url);
  },

  onCompleted(event, method, url) {
    console.debug('RequestStore::onCompleted', method, url);
  },

  onError(event, method, url) {
    console.debug('RequestStore::onError', method, url);
  },

  onAbort(event, method, url) {
    console.debug('RequestStore::onAbort', method, url);
  }
});

export default RequestStore;