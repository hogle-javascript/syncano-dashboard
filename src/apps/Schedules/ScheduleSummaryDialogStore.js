import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import ScheduleSummaryDialogActions from './ScheduleSummaryDialogActions';

export default Reflux.createStore({
  listenables: ScheduleSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
