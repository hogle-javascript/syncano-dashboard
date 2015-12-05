import Data from './Data';

import DataViewsStore from './DataViewsStore';
import DataViewsList from './DataViewsList';
import DataViewsActions from './DataViewsActions';
import DataViewDialog from './DataViewDialog';
import DataViewDialogStore from './DataViewDialogStore';

Data.Actions = DataViewsActions;
Data.Store = DataViewsStore;
Data.List = DataViewsList;
Data.Dialog = DataViewDialog;
Data.DialogStore = DataViewDialogStore;

export default Data;
