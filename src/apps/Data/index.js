import Data from './Data.react';

import DataViewsStore from './DataViewsStore';
import DataViewsList from './DataViewsList.react';
import DataViewsActions from './DataViewsActions';
import DataViewDialog from './DataViewDialog.react';
import DataViewDialogStore from './DataViewDialogStore';

import WebhooksStore from './WebhooksStore';
import WebhooksList from './WebhooksList.react';
import WebhooksActions from './WebhooksActions';
import WebhookDialog from './WebhookDialog.react';
import WebhookDialogStore from './WebhookDialogStore';
import WebhookTraces from './WebhookTraces.react';

Data.Actions = DataViewsActions;
Data.Store = DataViewsStore;
Data.List = DataViewsList;
Data.Dialog = DataViewDialog;
Data.DialogStore = DataViewDialogStore;

Data.WebhooksActions = WebhooksActions;
Data.WebhooksStore = WebhooksStore;
Data.WebhooksList = WebhooksList;
Data.WebhookDialog = WebhookDialog;
Data.WebhookDialogStore = WebhookDialogStore;
Data.WebhookTraces = WebhookTraces;

export default Data;
