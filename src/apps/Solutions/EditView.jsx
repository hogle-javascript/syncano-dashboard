import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Select from 'react-select';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import InstancesActions from '../Instances/InstancesActions';
import SessionStore from '../Session/SessionStore';

import Actions from './EditViewActions';
import Store from './EditViewStore';

import InstallDialogStore from './InstallDialogStore';
import InstallDialogActions from './InstallDialogActions';

import AddVersionViewStore from './AddVersionViewStore';
import AddVersionViewActions from './AddVersionViewActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container';

import CreateDialog from './CreateDialog';
import InstallDialog from './InstallDialog';

export default React.createClass({

  displayName: 'SolutionEdit',

  mixins: [
    Router.State,
    Router.Navigation,

    Mixins.Dialogs,
    HeaderMixin,

    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('SolutionEdit::componentDidMount');

    if (this.getParams().action === 'install') {
      this.handleInstallSolution();
    }

    InstancesActions.fetch();
    Actions.fetch();
  },

  //Dialogs config
  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        key     : 'deleteCreateDialog',
        ref     : 'deleteCreateDialog',
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
    let user   = SessionStore.getUser();
    let author = this.state.item.author;
    return (user && author && user.id === author.id);
  },

  isNoVersions() {
    let item = this.state.item;
    return (item && item.versions && !item.versions.devel && !item.versions.stable);
  },

  handleDelete() {
    console.info('SolutionEdit::handleDelete');
    Actions.removeSolution(this.state.item.id).then(
      SessionStore.getRouter().transitionTo('solutions')
    );
  },

  handleInstallSolution(versionId) {
    InstallDialogActions.showDialogWithPreFetch(this.getParams().solutionId);
  },

  showCreateDialog() {
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
      main: {
        margin: '65px auto',
        width: '80%',
        maxWidth: '1140px'
      },
      tag: {
        color : '#9b9b9b',
        paddingRight : 5
      },
      cardTextListIcon: {
        fontSize    : 24,
        marginRight : 14
      },
      description : {
        color      : 'rgba(0,0,0,.54)',
        textAlign  : 'left',
        fontSize   : '1rem',
        lineHeight : '1rem',
        height     : 100
      }
    };
  },

  handleBackClick() {
    SessionStore.getRouter().transitionTo('solutions');
  },

  handleAddVersion() {
    SessionStore.getRouter().transitionTo('solutions-add-version', this.getParams());
  },

  handleTagsListChange(tagsString, tagsArray) {
    Actions.updateSolution(this.state.item.id, {tags: tagsArray.map(item => {return item.value})});
  },

  renderItemTags() {
    let styles = this.getStyles();

    if (this.state.item.tags && this.state.item.tags.length === 0)
      return <div style={styles.tag}>no tags</div>;

    return this.state.item.tags.map(tag => {
      return (
        <div
          key   = {tag}
          style = {styles.tag}>
          {tag}
        </div>
      )
    });
  },

  render() {
    let styles = this.getStyles();
    let item = this.state.item;

    return (
      <Container id='solutions'>
        {this.getDialogs()}

        <InstallDialog />

        <Common.Show if={this.isMySolution()}>
          <Common.Fab>
            <Common.Fab.Item
              label         = "Click here to create Solution"
              onClick       = {this.handleAddVersion}
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
              <MUI.ToolbarTitle text={'Solutions'} />
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup float="right">
              <Common.Show if={this.isMySolution()}>
                <MUI.IconButton
                  style            = {{fontSize: 25, marginTop: 5}}
                  iconClassName    = "synicon-delete"
                  tooltip          = "Delete Solution"
                  tooltipPosition  = "bottom-left"
                  onClick          = {this.showDialog.bind(null, 'deleteCreateDialog')}
                />
              </Common.Show>
            </MUI.ToolbarGroup>
          </MUI.Toolbar>

        <div className="container" style={{clear: 'both'}}>

        <div className="row" style={styles.main}>
            <div className="col-flex-1">
              <div className="row">
                <div style={{textAlign: 'left', fontSize: '1.5rem', lineHeight: '1.5rem'}}>
                  {this.state.item.label}
                </div>
              </div>
              <div
                className="row vp-3-t" style={styles.description}>
                  {this.state.item.description}
              </div>

              <Common.Show if={!this.isMySolution()}>
                <div className="row">
                  <MUI.FontIcon
                    style     = {styles.cardTextListIcon}
                    className = "synicon-tag"
                    color     = "rgba(222, 222, 222, 0.54)"
                  />
                  {this.renderItemTags()}
                </div>
              </Common.Show>

              <Common.Show if={this.isMySolution()}>
                <div className="row vp-1-b">
                  <div className="col-flex-1">
                    <div className="vp-1-b">Tags</div>
                      <Select
                        value       = {Store.getItemTags()}
                        delimiter   = ","
                        multi       = {true}
                        allowCreate = {true}
                        placeholder = "Select tags"
                        options     = {Store.getTagsOptions()}
                        onChange    = {this.handleTagsListChange}/>
                    </div>
                </div>
              </Common.Show>

              <div className="row" style= {{marginLeft: '-18px'}}>
                <Common.SolutionStar
                  solution = {this.state.item}
                  star     = {Actions.starSolution}
                  unstar   = {Actions.unstarSolution}
                  />
              </div>

              <div className="row vp-5-t align-left">

                <MUI.RaisedButton
                  primary  = {true}
                  disabled = {this.state.versions && this.state.versions.length < 1}
                  label    = 'Install solution'
                  onClick  = {this.handleInstallSolution} />
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

          <Common.Show if={!this.isMySolution() && this.isNoVersions()}>
            <div style={styles.main}>No versions.</div>
          </Common.Show>

          <Common.Show if={!this.isNoVersions() || this.isMySolution()}>
            <Common.Solutions.VersionsList
              name                 = "Versions"
              items                = {this.state.versions}
              onInstall            = {this.handleInstallSolution}
              emptyItemHandleClick = {this.handleAddVersion}
              emptyItemContent     = "Add new Version"
            />
          </Common.Show>

        </div>
      </Container>
    );
  }
});
