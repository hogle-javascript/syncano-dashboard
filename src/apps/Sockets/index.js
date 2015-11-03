import Data from './Data.react';

import DataViewsStore from './DataViewsStore';
import DataViewsList from './DataViewsList.react';
import DataViewsActions from './DataViewsActions';
import DataViewDialog from './DataViewDialog.react';
import DataViewDialogStore from './DataViewDialogStore';

Data.Actions = DataViewsActions;
Data.Store = DataViewsStore;
Data.List = DataViewsList;
Data.Dialog = DataViewDialog;
Data.DialogStore = DataViewDialogStore;

export default Data;
