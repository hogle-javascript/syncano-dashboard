import CodeBoxes from './CodeBoxes.react';
import CodeBoxesConfig from './CodeBoxesConfig.react';
import CodeBoxesEdit from './CodeBoxesEdit.react';
import CodeBoxesStore from './CodeBoxesStore';
import CodeBoxesList from './CodeBoxesList.react';
import CodeBoxesActions from './CodeBoxesActions';
import CodeBoxDialog from './CodeBoxDialog.react';
import CodeBoxDialogStore from './CodeBoxDialogStore';

CodeBoxes.Actions     = CodeBoxesActions;
CodeBoxes.Store       = CodeBoxesStore;
CodeBoxes.List        = CodeBoxesList;
CodeBoxes.Dialog      = CodeBoxDialog;
CodeBoxes.DialogStore = CodeBoxDialogStore;
CodeBoxes.Config      = CodeBoxesConfig;
CodeBoxes.Edit        = CodeBoxesEdit;

export default CodeBoxes;
