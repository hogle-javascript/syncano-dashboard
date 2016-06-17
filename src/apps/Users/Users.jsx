import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import Actions from './UsersActions';
import Store from './UsersStore';
import { GroupsActions, GroupsStore, GroupsList, GroupDialog } from './../Groups';

// Components
import { RaisedButton } from 'material-ui';
import { Container, InnerToolbar, Lists, Loading, Show } from '../../common/';

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

  handleMoreRows() {
    const { nextParams } = this.state.users;

    Actions.subFetchUsers(nextParams);
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
    const { groups, users } = this.state;

    return (
      <div>
        <Helmet title="Users & Groups" />
        <UserDialog />
        <GroupDialog />

        <InnerToolbar title="Users & Groups">
          <RaisedButton
            label="Add a Group"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={GroupsActions.showDialog}
          />
          <RaisedButton
            label="Add a User"
            primary={true}
            style={{ marginRight: 0 }}
            onTouchTap={this.showUserDialog.bind(null, null)}
          />
        </InnerToolbar>

        <Container>
          <Lists.Container className="row">
            <div className="col-md-8">
              <GroupsList
                isLoading={groups.isLoading}
                items={groups.items}
                hideDialogs={groups.hideDialogs}
              />
            </div>
            <div className="col-md-27">
              <Show if={users.items}>
                <UsersList
                  items={users.items}
                  hideDialogs={users.hideDialogs}
                />
              </Show>
              <Loading show={_.isNull(users.items) || users.isLoading} />
              <Show if={!users.isLoading}>
                <div
                  className="row align-center"
                  style={{ margin: 50 }}
                >
                  <div>Loaded {users.items && users.items.length} Users</div>
                </div>
                <Show if={users.hasNextPage}>
                  <div
                    className="row align-center"
                    style={{ margin: 50 }}
                  >
                    <RaisedButton
                      label="Load more"
                      onClick={this.handleMoreRows}
                    />
                  </div>
                </Show>
              </Show>
            </div>
          </Lists.Container>
        </Container>
      </div>
    );
  }
});
