import Reflux from 'reflux';
import { DialogStoreMixin } from '../../../mixins';
import GCMDeviceSummaryDialogActions from './GCMDeviceSummaryDialogActions';

export default Reflux.createStore({
  listenables: GCMDeviceSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
