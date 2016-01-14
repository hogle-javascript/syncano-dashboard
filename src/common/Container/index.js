import Container from './Container';
import AccountContainer from './AccountContainer';
import EmptyContainer from './EmptyContainer';
import ProfileContainer from './ProfileContainer';
import LoadingContainer from './LoadingContainer';
import TabsContainer from './TabsContainer';

Container.Profile = ProfileContainer;
Container.Empty = EmptyContainer;
Container.Account = AccountContainer;
Container.Loading = LoadingContainer;
Container.Tabs = TabsContainer;

export default Container;
