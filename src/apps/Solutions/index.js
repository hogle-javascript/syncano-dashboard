import SolutionDialog from './SolutionDialog.react';

import SolutionEdit from './SolutionEdit.react';
import SolutionsList from './SolutionsList.react';

import SolutionInstallDialog from './SolutionInstallDialog.react';

import SolutionVersionDialog from './SolutionVersionDialog.react';
import SolutionVersionsList from './SolutionVersionsList.react';

let Solutions = {};
Solutions.Dialog              = SolutionDialog;
Solutions.Edit                = SolutionEdit;
Solutions.List                = SolutionsList;
Solutions.InstallDialog       = SolutionInstallDialog;
Solutions.VersionDialog       = SolutionVersionDialog;
Solutions.VersionsList        = SolutionVersionsList;

export default Solutions;
