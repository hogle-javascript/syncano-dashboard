import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import MUI from 'material-ui';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Store from './SolutionsStore';
import Actions from './SolutionsActions';

// Components
import Common from '../../common';

import SolutionsList from './SolutionsList.react';
import SolutionDialog from './SolutionDialog.react';
import SolutionInstallDialog from './SolutionInstallDialog.react';

module.exports = React.createClass({

  displayName: 'Solutions',

  mixins: [
    Router.State,
    Router.Navigation,

    HeaderMixin,
    Reflux.connect(Store)
  ],

  showSolutionDialog: function() {
    Actions.showDialog();
  },

  componentDidMount: function() {
    console.info('Solutions::componentWillMount');
    Actions.fetch();
  },

  headerMenuItems: function() {
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

  handleTabActive: function(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  getStyles: function() {
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
    var styles = this.getStyles();

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

  render: function() {
    var styles = this.getStyles();

    return (
      <div id='solutions'>
        <SolutionDialog />
        <SolutionInstallDialog />

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to create Solution"
            onClick       = {this.showSolutionDialog}
            iconClassName = "synicon-plus"
          />
        </Common.Fab>

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
