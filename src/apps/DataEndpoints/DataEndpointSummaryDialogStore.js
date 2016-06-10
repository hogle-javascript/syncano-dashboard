import Reflux from 'reflux';
import {DialogStoreMixin} from '../../mixins';
import DataEndpointSummaryDialogActions from './DataEndpointSummaryDialogActions';

export default Reflux.createStore({
  listenables: DataEndpointSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
