import Classes from './Classes.react';
import ClassesStore from './ClassesStore';
import ClassesList from './ClassesList.react';
import ClassesActions from './ClassesActions';
import ClassDialog from './ClassDialog.react';
import ClassDialogStore from './ClassDialogStore';

Classes.Actions     = ClassesActions;
Classes.Store       = ClassesStore;
Classes.List        = ClassesList;
Classes.Dialog      = ClassDialog;
Classes.DialogStore = ClassDialogStore;

export default Classes;