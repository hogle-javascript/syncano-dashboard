import Reflux from 'reflux';

// Utils & Mixins
import {DialogStoreMixin} from '../../../mixins';

// Stores & Actions
import Actions from './APNSPushNotificationsActions';

export default Reflux.createStore({
  listenables: [Actions],
  mixins: [
    DialogStoreMixin
  ]
});
