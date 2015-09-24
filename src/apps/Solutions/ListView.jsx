import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {Limits} from '../../mixins';

// Stores and Actions

import Store from './ListViewStore';
import Actions from './ListViewActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

import CreateDialogActions from './CreateDialogActions';
import CreateDialog from './CreateDialog';

import InstallDialogActions from './InstallDialogActions';
import InstallDialog from './InstallDialog';

export default React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin,
    Limits,
    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('Solutions::componentWillMount');
    Actions.fetch();
  },

  getStyles() {
    return {
      container: {
        width: '90%',
        margin: '96px auto'
      },
      sidebar: {
        minWidth: 230
      },
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    }
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
        <CreateDialog />
        <InstallDialog />

        <Common.Show if={this.isFriend()}>
          <Common.Fab>
            <Common.Fab.TooltipItem
              tooltip="Click here to create a Solution"
              onClick={this.showSolutionDialog}
              iconClassName="synicon-plus"
              />
          </Common.Fab>
        </Common.Show>

        <div style={styles.container}>
          <div className="row">
            <div style={styles.sidebar}>
              <MUI.List zDepth={1} className="vm-6-b">
                <MUI.ListItem
                  innerDivStyle={this.state.filter === 'public' ? styles.listItemChecked : {}}
                  primaryText="All solutions"
                  onTouchTap={this.handleChangeFilter.bind(this, 'public')}/>
                <MUI.ListDivider />
                <MUI.ListItem
                  innerDivStyle={this.state.filter === 'starred_by_me' ? styles.listItemChecked : {}}
                  primaryText="Favorite"
                  onTouchTap={this.handleChangeFilter.bind(this, 'starred_by_me')}/>
                <MUI.ListItem
                  innerDivStyle={this.state.filter === 'created_by_me' ? styles.listItemChecked : {}}
                  primaryText="My solutions"
                  onTouchTap={this.handleChangeFilter.bind(this, 'created_by_me')}/>
              </MUI.List>
              <Common.Tags.List
                items={this.state.tags}
                selectedItems={this.state.selectedTags}
                toggleTagSelection={this.handleToggleTagSelection}
                resetTagsSelection={this.handleResetTagsSelection}/>
            </div>
            <div className="col-flex-1">
              <Common.Loading show={!this.state.items}>
                <Common.Solutions.List
                  items={this.state.items}
                  onInstall={this.handleInstallClick}
                  onSeeMore={this.handleSeeMoreClick}
                  onTagClick={this.handleTagClick}
                  onUnstar={this.handleUnstarClick}
                  onStar={this.handleStarClick}/>
              </Common.Loading>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
