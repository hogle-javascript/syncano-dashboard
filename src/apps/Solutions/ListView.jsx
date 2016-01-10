import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions

import Store from './ListViewStore';
import Actions from './ListViewActions';
import SessionStore from '../Session/SessionStore';

// Components
import {Header} from '../../apps';
import {Styles, List, ListItem, Divider} from 'syncano-material-ui';
import {Tags, Show} from 'syncano-components';
import {Loading, Solutions, Socket, InnerToolbar, Sidebar, Container} from '../../common';

import CreateDialog from './CreateDialog';
import CreateDialogActions from './CreateDialogActions';
import InstallDialog from './InstallDialog';
import InstallDialogActions from './InstallDialogActions';

export default React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin,
    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('Solutions::componentWillMount');
    Actions.fetch();
  },

  getStyles() {
    return {
      listItemChecked: {
        background: Styles.Colors.lightBlue50
      }
    };
  },

  handleChangeFilter(filter) {
    Actions.setFilter(filter);
  },

  handleInstallClick(solutionId) {
    InstallDialogActions.showDialogWithPreFetch(solutionId);
  },

  handleSeeMoreClick(solutionId) {
    this.transitionTo('solutions-edit', {solutionId});
  },

  handleTagClick(tag) {
    Actions.selectOneTag(tag);
  },

  handleResetTagsSelection() {
    Actions.resetTagsSelection();
  },

  handleToggleTagSelection(name) {
    Actions.toggleTagSelection(name);
  },

  handleUnstarClick(solutionId) {
    Actions.unstarSolution(solutionId);
  },

  handleStarClick(solutionId) {
    Actions.starSolution(solutionId);
  },

  showSolutionDialog() {
    CreateDialogActions.showDialog();
  },

  render() {
    let styles = this.getStyles();

    return (
      <div id='solutions'>
        <div className="row">
          <Sidebar>
            <List className="vm-3-b">
              <ListItem
                innerDivStyle={this.state.filter === 'public' ? styles.listItemChecked : {}}
                primaryText="All solutions"
                onTouchTap={this.handleChangeFilter.bind(this, 'public')}/>
              <Divider />
              <ListItem
                innerDivStyle={this.state.filter === 'starred_by_me' ? styles.listItemChecked : {}}
                primaryText="Favorite"
                onTouchTap={this.handleChangeFilter.bind(this, 'starred_by_me')}/>
              <ListItem
                innerDivStyle={this.state.filter === 'created_by_me' ? styles.listItemChecked : {}}
                primaryText="My solutions"
                onTouchTap={this.handleChangeFilter.bind(this, 'created_by_me')}/>
            </List>
            <Tags.List
              items={this.state.tags}
              selectedItems={this.state.selectedTags}
              toggleTagSelection={this.handleToggleTagSelection}
              resetTagsSelection={Actions.resetTagsSelection}/>
          </Sidebar>
          <div className="col-flex-1">
            <Header/>
            <InnerToolbar>
              <Show if={SessionStore.hasFriendlyUser()}>
                <Socket
                  tooltip="Click here to create a Solution"
                  onTouchTap={this.showSolutionDialog}/>
              </Show>
            </InnerToolbar>
            <Container>
              <Loading show={!this.state.items}>
                <Solutions.List
                  items={this.state.items}
                  onInstall={this.handleInstallClick}
                  onSeeMore={this.handleSeeMoreClick}
                  onTagClick={this.handleTagClick}
                  onUnstar={this.handleUnstarClick}
                  onStar={this.handleStarClick}/>
              </Loading>
            </Container>
          </div>
        </div>
        <CreateDialog/>
        <InstallDialog/>
      </div>
    );
  }
});
