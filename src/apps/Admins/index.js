import Admins from './Admins.react';
import AdminsStore from './AdminsStore';
import AdminDialog from './AdminDialog.react';
import AdminDialogStore from './AdminDialogStore';
import AdminsActions from './AdminsActions';
import AdminsList from './AdminsList.react';
import AdminsInvitationsActions from './AdminsInvitationsActions';
import AdminsInvitationsStore from './AdminsInvitationsStore';

Admins.Dialog             = AdminDialog;
Admins.DialogStore        = AdminDialogStore;
Admins.List               = AdminsList;
Admins.Actions            = AdminsActions;
Admins.Store              = AdminsStore;
Admins.InvitationsActions = AdminsInvitationsActions;
Admins.InvitationsStore   = AdminsInvitationsStore;

export default Admins;
