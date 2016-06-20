import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import ChannelSummaryDialogActions from './ChannelSummaryDialogActions';

export default Reflux.createStore({
  listenables: ChannelSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
