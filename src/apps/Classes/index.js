import Classes from './Classes.react';
import ClassesStore from './ClassesStore';
import ClassesList from './ClassesList.react';
import ClassesActions from './ClassesActions';
import FormView from './FormView.react';
import FormViewStore from './FormViewStore';

Classes.Actions = ClassesActions;
Classes.Store = ClassesStore;
Classes.List = ClassesList;
Classes.FormView = FormView;
Classes.FormViewStore = FormViewStore;

export default Classes;
