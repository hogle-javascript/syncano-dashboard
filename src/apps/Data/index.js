import Data from './Data';

import DataEndpointsStore from './DataEndpointsStore';
import DataEndpointsList from './DataEndpointsList';
import DataEndpointsActions from './DataEndpointsActions';
import DataEndpointDialog from './DataEndpointDialog';
import DataEndpointDialogStore from './DataEndpointDialogStore';

Data.Actions = DataEndpointsActions;
Data.Store = DataEndpointsStore;
Data.List = DataEndpointsList;
Data.Dialog = DataEndpointDialog;
Data.DialogStore = DataEndpointDialogStore;

export default Data;
