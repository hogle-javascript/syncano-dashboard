import Reflux from 'reflux';
import { DialogStoreMixin } from '../../../mixins';
import APNSDeviceSummaryDialogActions from './APNSDeviceSummaryDialogActions';

export default Reflux.createStore({
  listenables: APNSDeviceSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
