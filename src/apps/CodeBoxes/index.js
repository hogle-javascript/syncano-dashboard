import CodeBoxes from './CodeBoxes.react';
import CodeBox from './CodeBox.react';
import CodeBoxConfig from './CodeBoxConfig.react';
import CodeBoxEdit from './CodeBoxEdit.react';
import CodeBoxesStore from './CodeBoxesStore';
import CodeBoxesList from './CodeBoxesList.react';
import CodeBoxesActions from './CodeBoxesActions';
import CodeBoxDialog from './CodeBoxDialog.react';
import CodeBoxDialogStore from './CodeBoxDialogStore';
import CodeBoxTraces from './CodeBoxTraces.react';

CodeBoxes.Actions = CodeBoxesActions;
CodeBoxes.Store = CodeBoxesStore;
CodeBoxes.List = CodeBoxesList;
CodeBoxes.Dialog = CodeBoxDialog;
CodeBoxes.DialogStore = CodeBoxDialogStore;
CodeBoxes.Config = CodeBoxConfig;
CodeBoxes.Edit = CodeBoxEdit;
CodeBoxes.Details = CodeBox;
CodeBoxes.Traces = CodeBoxTraces;

export default CodeBoxes;
