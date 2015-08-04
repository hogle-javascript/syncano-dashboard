import DataObjects from './DataObjects.react';
import DataObjectsStore from './DataObjectsStore';
import DataObjectsActions from './DataObjectsActions';
import DataObjectDialog from './DataObjectDialog.react';
import DataObjectDialogStore from './DataObjectDialogStore';
import DataObjectsRenderer from './DataObjectsRenderer';
import CheckAvatar from './CheckAvatar.react';
import ColumnsFilterMenu from './ColumnsFilterMenu.react';

DataObjects.Actions = DataObjectsActions;
DataObjects.Store = DataObjectsStore;
DataObjects.Dialog = DataObjectDialog;
DataObjects.DialogStore = DataObjectDialogStore;
DataObjects.Renderer = DataObjectsRenderer;
DataObjects.ColumnsFilterMenu = ColumnsFilterMenu;
DataObjects.CheckAvatar = CheckAvatar;

export default DataObjects;
