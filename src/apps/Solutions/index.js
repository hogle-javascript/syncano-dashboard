import Solutions from './Solutions.react';
import SolutionsStore from './SolutionsStore';
import SolutionsList from './SolutionsList.react';
import SolutionsListItem from './SolutionsListItem.react';
import SolutionsActions from './SolutionsActions';
import SolutionDialog from './SolutionDialog.react';
import SolutionDialogStore from './SolutionDialogStore';

import SolutionEdit from './SolutionEdit.react';
import SolutionEditActions from './SolutionEditActions';
import SolutionEditStore from './SolutionEditStore';

import SolutionInstallDialog from './SolutionInstallDialog.react';
import SolutionInstallDialogActions from './SolutionInstallDialogActions';
import SolutionInstallDialogStore from './SolutionInstallDialogStore';

import SolutionVersionDialog from './SolutionVersionDialog.react';
import SolutionVersionDialogActions from './SolutionVersionDialogActions';
import SolutionVersionDialogStore from './SolutionVersionDialogStore';
import SolutionVersionsList from './SolutionVersionsList.react';

SolutionEdit.Actions          = SolutionEditActions;
SolutionEdit.Store            = SolutionEditStore;

SolutionVersionDialog.Actions = SolutionVersionDialogActions;
SolutionVersionDialog.Store   = SolutionVersionDialogStore;
SolutionVersionDialog.Store   = SolutionVersionDialogStore;

SolutionInstallDialog.Actions = SolutionInstallDialogActions;
SolutionInstallDialog.Store   = SolutionInstallDialogStore;

Solutions.Actions             = SolutionsActions;
Solutions.Store               = SolutionsStore;
Solutions.List                = SolutionsList;
Solutions.ListItem            = SolutionsListItem;
Solutions.Dialog              = SolutionDialog;
Solutions.DialogStore         = SolutionDialogStore;
Solutions.Edit                = SolutionEdit;
Solutions.InstallDialog       = SolutionInstallDialog;
Solutions.VersionDialog       = SolutionVersionDialog;
Solutions.VersionsList        = SolutionVersionsList;

export default Solutions;
