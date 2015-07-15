import Instances from './Instances.react';
import InstancesStore from './InstancesStore';
import InstancesList from './InstancesList.react';
import InstancesListHeader from './InstancesListHeader.react';
import InstancesListItem from './InstancesListItem.react';
import InstancesListWithHeader from './InstancesListWithHeader.react';
import InstancesActions from './InstancesActions';
import InstanceDialog from './InstanceDialog.react';
import InstanceDialogStore from './InstanceDialogStore';

Instances.Actions        = InstancesActions;
Instances.Store          = InstancesStore;
Instances.List           = InstancesList;
Instances.ListHeader     = InstancesListHeader;
Instances.ListItem       = InstancesListItem;
Instances.ListWithHeader = InstancesListWithHeader;
Instances.Dialog         = InstanceDialog;
Instances.DialogStore    = InstanceDialogStore;

export default Instances;