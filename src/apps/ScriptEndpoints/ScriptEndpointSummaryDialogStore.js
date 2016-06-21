import Reflux from 'reflux';
import { DialogStoreMixin } from '../../mixins';
import ScriptEndpointSummaryDialogActions from './ScriptEndpointSummaryDialogActions';

export default Reflux.createStore({
  listenables: ScriptEndpointSummaryDialogActions,
  mixins: [DialogStoreMixin]
});
