import Header from './Header.react';
import HeaderActions from './HeaderActions';
import HeaderInstanceMenu from './HeaderInstanceMenu.react';
import HeaderInstancesDropdown from './HeaderInstancesDropdown.react';
import HeaderMenu from './HeaderMenu.react';
import HeaderMixin from './HeaderMixin';
import HeaderNotificationsDropdown from './HeaderNotificationsDropdown.react';
import HeaderStore from './HeaderStore';
import InvitationsMenuItem from './InvitationsMenuItem.react';

Header.Actions = HeaderActions;
Header.Store = HeaderStore;
Header.Mixin = HeaderMixin;
Header.Menu = HeaderMenu;
Header.InstanceMenu = HeaderInstanceMenu;
Header.InstancesDropdown = HeaderInstancesDropdown;
Header.NotificationsDropdown = HeaderNotificationsDropdown;
Header.InvitationsMenuItem = InvitationsMenuItem;

export default Header;
