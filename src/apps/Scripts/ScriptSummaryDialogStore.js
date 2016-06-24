import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import ScriptSummaryDialogActions from './ScriptSummaryDialogActions';

export default Reflux.createStore({
  listenables: ScriptSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
