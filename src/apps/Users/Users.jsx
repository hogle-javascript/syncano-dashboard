import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import Actions from './UsersActions';
import Store from './UsersStore';
import {GroupsActions, GroupsStore, GroupsList, GroupDialog} from './../Groups';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container, InnerToolbar, Lists} from '../../common/';

// Local components
import UsersList from './UsersList';
import UserDialog from './UserDialog';

export default React.createClass({
  displayName: 'Users',

  mixins: [
    Reflux.connect(Store, 'users'),
    Reflux.connect(GroupsStore, 'groups')
  ],

  componentDidMount() {
    console.info('Users::componentDidMount');
    Actions.fetch();
    GroupsActions.fetch();
  },

  showUserDialog(group) {
    /* eslint-disable */
    Actions.showDialog(undefined, group);
    /* eslint-enable */
  },

  showGroupDialog() {
    GroupsActions.showDialog();
  },

  render() {
    const {groups, users} = this.state;

    return (
      <div>
        <Helmet title="Users & Groups" />
        <UserDialog />
        <GroupDialog />

        <InnerToolbar title="Users & Groups">
          <RaisedButton
            label="Add a Group"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={GroupsActions.showDialog}/>
          <RaisedButton
            label="Add a User"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={this.showUserDialog.bind(null, null)}/>
        </InnerToolbar>

        <Container>
          <Lists.Container className="row">
            <div className="col-lg-8">
              <GroupsList
                isLoading={groups.isLoading}
                items={groups.items}
                hideDialogs={groups.hideDialogs} />
            </div>
            <div className="col-lg-27">
              <UsersList
                isLoading={users.isLoading}
                items={users.items}
                hideDialogs={users.hideDialogs} />
            </div>
          </Lists.Container>
        </Container>
      </div>
    );
  }
});
