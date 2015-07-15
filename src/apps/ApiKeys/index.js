import ApiKeys from './ApiKeys.react';
import ApiKeysStore from './ApiKeysStore';
import ApiKeysList from './ApiKeysList.react';
import ApiKeysActions from './ApiKeysActions';
import ApiKeyDialog from './ApiKeyDialog.react';
import ApiKeyDialogStore from './ApiKeyDialogStore';

ApiKeys.Actions     = ApiKeysActions;
ApiKeys.Store       = ApiKeysStore;
ApiKeys.List        = ApiKeysList;
ApiKeys.Dialog      = ApiKeyDialog;
ApiKeys.DialogStore = ApiKeyDialogStore;

export default ApiKeys;