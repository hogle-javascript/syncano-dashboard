import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Store from './SolutionsStore';
import Actions from './SolutionsActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

import SolutionsList from './SolutionsList.react';
import SolutionDialog from './SolutionDialog.react';
import SolutionInstallDialog from './SolutionInstallDialog.react';

export default React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin,
    Reflux.connect(Store)
  ],

  showSolutionDialog() {
    Actions.showDialog();
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
        route : 'instances'
      },
      {
        label : 'Solutions',
        route : 'solutions'
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
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    }
  },

  handleChangeFilter(filter, event) {
    Actions.setFilter(filter);
  },

  renderTags() {
    let styles = this.getStyles();

    let tags = this.state.tags.map(item => {
      return (
        <MUI.ListItem
          key           = {item.name}
          primaryText   = {item.name}
          innerDivStyle = {this.state.selectedTags.indexOf(item.name) > -1 ? styles.listItemChecked : {}}
          onTouchTap    = {Actions.toggleTagSelection.bind(this, item.name)} />
      )
    });
    return (
      <MUI.List zDepth={1} subheader="Tags">
        {tags}
      </MUI.List>
    )
  },

  render() {
    let styles = this.getStyles();

    return (
      <div id='solutions'>
        <SolutionDialog />
        <SolutionInstallDialog />

        <Common.Show if={this.isFriend()}>
          <Common.Fab>
            <Common.Fab.Item
              label         = "Click here to create a Solution"
              onClick       = {this.showSolutionDialog}
              iconClassName = "synicon-plus" />
          </Common.Fab>
       </Common.Show>

        <div style={styles.container}>
          <div className="row">
            <div style={styles.sidebar}>
              <MUI.List zDepth={1} className="vm-6-b">
                <MUI.ListItem
                  innerDivStyle = {!this.state.filter ? styles.listItemChecked : {}}
                  primaryText   = "All solutions"
                  onTouchTap    = {this.handleChangeFilter.bind(this, null)} />
                <MUI.ListDivider />
                <MUI.ListItem
                  innerDivStyle = {this.state.filter === 'starred_by_me' ? styles.listItemChecked : {}}
                  primaryText   = "Favorite"
                  onTouchTap    = {this.handleChangeFilter.bind(this, 'starred_by_me')} />
                <MUI.ListItem
                  innerDivStyle = {this.state.filter === 'created_by_me' ? styles.listItemChecked : {}}
                  primaryText   = "My solutions"
                  onTouchTap    = {this.handleChangeFilter.bind(this, 'created_by_me')} />
              </MUI.List>
              {this.renderTags()}
            </div>
            <div className="col-flex-1">
              <SolutionsList items={this.state.items}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
