import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';

import Store from './ListViewStore';
import Actions from './ListViewActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

import CreateDialogActions from './CreateDialogActions';
import CreateDialog from './CreateDialog';

import InstallDialogActions from './InstallDialogActions';
import InstallDialog from './InstallDialog';

module.exports = React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin,
    Reflux.connect(Store)
  ],

  showSolutionDialog() {
    CreateDialogActions.showDialog();
  },

  componentDidMount() {
    console.info('Solutions::componentWillMount');
    Actions.fetch();
  },

  isFriend() {
    if (SessionStore.getUser()) {
      let email = SessionStore.getUser().email;
      return (_.endsWith(email, 'syncano.com') || _.endsWith(email, 'chimeraprime.com'));
    }
  },

  headerMenuItems() {
    return [
      {
        label : 'Instances',
        route : 'instances',
      },
      {
        label : 'Solutions',
        route : 'solutions',
      }
    ];
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  getStyles() {
    return {
      container: {
        width  : '90%',
        margin : '40px auto'
      },
      sidebar: {
        minWidth: 230
      },
    }
  },

  handleChangeFilter(filter) {
    Actions.setFilter(filter);
  },

  handleInstallClick(solutionId) {
    InstallDialogActions.showDialogWithPreFetch(solutionId);
  },

  handleSeeMoreClick(solutionId) {
    this.transitionTo('solutions-edit', {solutionId: solutionId});
  },

  handleTagClick(tag) {
    Actions.selectOneTag(tag);
  },

  handleToggleTagSelection(name) {
    Actions.toggleTagSelection(name);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div id='solutions'>
        <CreateDialog />
        <InstallDialog />

        <Common.Show if={this.isFriend()}>
          <Common.Fab>
            <Common.Fab.Item
              label         = "Click here to create Solution"
              onClick       = {this.showSolutionDialog}
              iconClassName = "synicon-plus"
            />
          </Common.Fab>
       </Common.Show>

        <div style={styles.container}>
          <div className="row">
            <div style={styles.sidebar}>
              <MUI.List zDepth={1} className="vm-6-b">
                <MUI.ListItem
                  innerDivStyle = {!this.state.filter ? styles.listItemChecked : {}}
                  primaryText   = "All solutions"
                  onTouchTap    = {this.handleChangeFilter.bind(this, null)}
                />
                <MUI.ListDivider />
                <MUI.ListItem
                  innerDivStyle = {this.state.filter === 'starred_by_me' ? styles.listItemChecked : {}}
                  primaryText   = "Favorite"
                  onTouchTap    = {this.handleChangeFilter.bind(this, 'starred_by_me')}
                />
                <MUI.ListItem
                  innerDivStyle = {this.state.filter === 'created_by_me' ? styles.listItemChecked : {}}
                  primaryText   = "My solutions"
                  onTouchTap    = {this.handleChangeFilter.bind(this, 'created_by_me')}
                />
              </MUI.List>
              <Common.Tags.List
                items              = {this.state.tags}
                selectedItems      = {this.state.selectedTags}
                toggleTagSelection = {this.handleToggleTagSelection} />
            </div>
            <div className="col-flex-1">
              <Common.Solutions.List
                items      = {this.state.items}
                onInstall  = {this.handleInstallClick}
                onSeeMore  = {this.handleSeeMoreClick}
                onTagClick = {this.handleTagClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
