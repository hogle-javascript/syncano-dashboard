import Reflux from 'reflux';
import RequestActions from './RequestActions';

let RequestStore = Reflux.createStore({
  listenables: RequestActions,

  onCompleted(event, method, url) {
    this.showErrorSnackbar(event);
  },

  onError(event, method, url) {
    if (500 <= event.target.status <= 599) {
      this.showErrorSnackbar(event);
    }
  },

  showErrorSnackbar(event) {
    if (event.target.status >= 500 && event.target.status <= 599) {
      this.trigger({showErrorSnackbar: true});
    }
  }

});

export default RequestStore;