import Webhooks from './Webhooks.react';
import WebhooksStore from './WebhooksStore';
import WebhooksList from './WebhooksList.react';
import WebhooksActions from './WebhooksActions';
import WebhookDialog from './WebhookDialog.react';
import WebhookDialogStore from './WebhookDialogStore';
import WebhookTraces from './WebhookTraces.react';

Webhooks.Actions = WebhooksActions;
Webhooks.Store = WebhooksStore;
Webhooks.List = WebhooksList;
Webhooks.Dialog = WebhookDialog;
Webhooks.DialogStore = WebhookDialogStore;
Webhooks.Traces = WebhookTraces;

export default Webhooks;
