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

export default React.createClass({

  displayName: 'SolutionEdit',

  mixins: [
    Router.State,
    Router.Navigation,

    Mixins.Dialogs,
    HeaderMixin,

    Reflux.connect(SolutionEditStore)
  ],

  componentDidMount() {
    console.info('SolutionEdit::componentDidMount');
    InstancesActions.fetch();
    SolutionEditActions.fetch();

    if (this.getParams().action == 'install') {
      this.handleInstallSolution();
    }
  },

  //Dialogs config
  initDialogs() {
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

  isMySolution() {
    if (SessionStore.getUser() && this.state.item.author)
      if (SessionStore.getUser().id === this.state.item.author.id)
        return true;
  },

  handleDelete() {
    console.info('SolutionEdit::handleDelete');
    SolutionEditActions.removeSolution(this.state.item.id).then(
      SessionStore.getRouter().transitionTo('solutions')
    );
  },

  handleInstallSolution() {
    SolutionInstallDialogActions.showDialogWithPreFetch(this.getParams().solutionId);
  },

  showSolutionDialog() {
    SolutionEditActions.showDialog();
  },

  headerMenuItems() {
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

  getStyles() {
    return {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };
  },

  handleBackClick() {
    SessionStore.getRouter().transitionTo('solutions');
  },

  showAddSolutionVersionDialog() {
    SolutionVersionDialogActions.showDialog();
  },

  render() {
    let item = this.state.item;
    return (
      <Container id='solutions'>
        {this.getDialogs()}

        <SolutionInstallDialog />
        <SolutionVersionDialog />

        <Common.Show if={this.isMySolution()}>
          <Common.Fab>
            <Common.Fab.Item
              label         = "Click here to create Solution"
              onClick       = {this.showAddSolutionVersionDialog}
              iconClassName = "synicon-plus" />
          </Common.Fab>
        </Common.Show>

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
              <Common.Show if={this.isMySolution()}>
                <MUI.IconButton
                  style            = {{fontSize: 25, marginTop: 5}}
                  iconClassName    = "synicon-delete"
                  tooltip          = "Delete Solution"
                  tooltipAlignment = "bottom-left"
                  onClick          = {this.showDialog.bind(null, 'deleteSolutionDialog')}
                />
              </Common.Show>
            </MUI.ToolbarGroup>
          </MUI.Toolbar>

        <div className="container" style={{clear: 'both'}}>

        <div className="row" style={this.getStyles()}>
            <div className="col-flex-1">
              <div style={{textAlign: 'left', fontSize: '2rem', lineHeight: '2rem'}}>
                {this.state.item.label}
              </div>
              <div style={{marginTop: 25, textAlign: 'left', fontSize: '1.2rem', lineHeight: '1.2rem', height: 100}}>
                {this.state.item.description}
              </div>
              <div className="row" style={{marginLeft: 5}}>
                <div style={{width: 160}}>
                  <MUI.RaisedButton
                    primary = {true}
                    label   = 'Install solution'
                    onClick = {this.handleInstallSolution} />
                  </div>
                <div className="col-flex-1">
                  <Common.SolutionStar solution={this.state.item} />
                </div>
              </div>

            </div>
            <div className="col-flex-1">
              <div className="row">
                 <div className="col-flex-1">
                   <div className="row align-right">
                    <div style={{textAlign: 'right', marginTop: 15, fontSize: '1.5rem', lineHeight: '1.5rem'}}>
                        <div>{item.author ? item.author.first_name : ''}</div>
                        <div>{item.author ? item.author.last_name : ''}</div>
                    </div>
                   </div>
                 </div>
                 <div className="col-md-8">
                   <div className="row align-right">
                     <MUI.Avatar
                       size = {70}
                       src  = {item.author ? item.author.avatar_url : null} />
                   </div>
                 </div>
              </div>
            </div>
          </div>

          <SolutionVersionsList
            name                 = "Versions"
            emptyItemHandleClick = {this.showAddSolutionVersionDialog}
            emptyItemContent     = "Add new Version"
          />

        </div>
      </Container>
    );
  }
});
