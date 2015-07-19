import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import InstancesActions from '../Instances/InstancesActions';
import SessionStore from '../Session/SessionStore';
import SolutionsActions from './SolutionsActions';

import SolutionEditActions from './SolutionEditActions';
import SolutionEditStore from './SolutionEditStore';

import SolutionInstallDialogStore from './SolutionInstallDialogStore';
import SolutionInstallDialogActions from './SolutionInstallDialogActions';

import SolutionVersionDialogStore from './SolutionVersionDialogStore';
import SolutionVersionDialogActions from './SolutionVersionDialogActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container';

import SolutionVersionsList from './SolutionVersionsList.react';
import SolutionDialog from './SolutionDialog.react';

import SolutionVersionDialog from './SolutionVersionDialog.react';
import SolutionInstallDialog from './SolutionInstallDialog.react';

module.exports = React.createClass({

  displayName: 'SolutionEdit',

  mixins: [
    Router.State,
    Router.Navigation,

    Mixins.Dialogs,
    HeaderMixin,

    Reflux.connect(SolutionEditStore)
  ],

  componentDidMount: function() {
    console.info('SolutionEdit::componentDidMount');
    InstancesActions.fetch();
    SolutionEditActions.fetch();

    if (this.getParams().action == 'install') {
      this.handleInstallSolution();
    }
  },

  //Dialogs config
  initDialogs: function() {
    return [{
      dialog: MUI.Dialog,
      params: {
        key     : 'deleteSolutionDialog',
        ref     : 'deleteSolutionDialog',
        title   : 'Delete a Solution',
        actions : [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Confirm',
            onClick : this.handleDelete
          }
        ],
        modal    : true,
        children : 'Do you really want to delete this Solution?'
      }
    }]
  },

  handleDelete: function() {
    console.info('SolutionEdit::handleDelete');
    SolutionEditActions.removeSolution(this.state.item.id).then(
      SessionStore.getRouter().transitionTo('solutions')
    );
  },

  handleInstallSolution: function() {
    SolutionInstallDialogActions.showDialog();
  },

  showSolutionDialog: function() {
    SolutionEditActions.showDialog();
  },

  headerMenuItems: function() {
    return [
      {
        label  : 'Instances',
        route  : 'instances'
      },
      {
        label : 'Solutions',
        route : 'solutions'
      }
    ];
  },

  getStyles: function() {
    return {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };
  },

  handleBackClick: function() {
    SessionStore.getRouter().transitionTo('solutions');
  },

  showAddSolutionVersionDialog: function() {
    SolutionVersionDialogActions.showDialog();
  },

  render: function() {
    return (
      <Container id='solutions'>
        {this.getDialogs()}

        <SolutionInstallDialog />
        <SolutionVersionDialog />

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to create Solution"
            onClick       = {this.showAddSolutionVersionDialog}
            iconClassName = "synicon-plus" />
        </Common.Fab>

        <MUI.Toolbar style={{background: 'transparent', padding: '0px'}}>
            <MUI.ToolbarGroup float="left" style={{padding: '0px'}}>
              <MUI.FontIcon
                style     = {{paddingLeft: 10, paddingTop: 4, paddingRight: 10}}
                className = "synicon-arrow-left"
                onClick   = {this.handleBackClick}
              />
              <MUI.ToolbarTitle text={'Solution: ' + this.state.item.label} />
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup float="right">
              <MUI.IconButton
                style            = {{fontSize: 25, marginTop: 5}}
                iconClassName    = "synicon-delete"
                tooltip          = "Delete Solution"
                tooltipAlignment = "bottom-left"
                onClick          = {this.showDialog.bind(null, 'deleteSolutionDialog')}
              />
            </MUI.ToolbarGroup>
          </MUI.Toolbar>

        <div className="container" style={{clear: 'both'}}>

        <div className="row" style={this.getStyles()}>
            <div className="col-flex-1">
              <h5>{this.state.item.label}</h5>
              <div>{this.state.item.description}</div>
               <Common.SolutionStar solution={this.state.item} />
              <MUI.RaisedButton
                primary = {true}
                label   = 'Install solution'
                onClick = {this.handleInstallSolution}
              />
            </div>
            <div className="col-flex-1">
              <div className="row">
                 <div className="col-flex-1">
                    <div>Maciej Kucharz</div>
                    <div>maciej.kucharz@syncano.com</div>
                 </div>

                 <div className="col-flex-1">
                    <MUI.Avatar>MK</MUI.Avatar>
                 </div>
              </div>
            </div>

          </div>

          <SolutionVersionsList
            name                 = "Versions"
            emptyItemHandleClick = {this.showAddSolutionVersionDialog}
            emptyItemContent     = "Add new Version"/>

        </div>
      </Container>
    );
  }
});
