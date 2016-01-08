import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import {DialogsMixin, IsLoadingMixin} from '../../mixins';

// Stores and Actions
import InstancesActions from '../Instances/InstancesActions';
import SessionStore from '../Session/SessionStore';

import Actions from './EditViewActions';
import Store from './EditViewStore';
import CreateDialogActions from './CreateDialogActions';

import InstallDialogActions from './InstallDialogActions';

// Components
import {Header} from '../../apps';
import {FontIcon, IconButton, RaisedButton, Avatar} from 'syncano-material-ui';
import {Dialog, Show, Solutions, SolutionStar, InnerToolbar} from '../../common';
import Container from '../../common/Container';

import CreateDialog from './CreateDialog';
import InstallDialog from './InstallDialog';

export default React.createClass({

  displayName: 'SolutionEdit',

  mixins: [
    Router.State,
    Router.Navigation,

    DialogsMixin,
    IsLoadingMixin(),

    Reflux.connect(Store)
  ],

  componentDidMount() {
    console.info('SolutionEdit::componentDidMount');

    InstancesActions.fetch();
    Actions.fetch();
  },

  componentDidUpdate() {
    if (this.getParams().action === 'install') {
      this.handleInstallSolution();
    }
  },

  getStyles() {
    return {
      main: {
        margin: '65px auto',
        width: '80%',
        maxWidth: '1140px'
      },
      tag: {
        color: '#9b9b9b',
        paddingRight: 5
      },
      cardTextListIcon: {
        fontSize: 24,
        marginRight: 14
      },
      description: {
        color: 'rgba(0,0,0,.54)',
        textAlign: 'left',
        fontSize: '1rem',
        lineHeight: '1rem',
        height: 100
      }
    };
  },

  isMySolution() {
    let user = SessionStore.getUser();
    let author = this.state.item.author;

    return (user && author && user.id === author.id);
  },

  isNoVersions() {
    let item = this.state.item;

    return (item && item.versions && !item.versions.devel && !item.versions.stable);
  },

  handleDelete() {
    console.info('SolutionEdit::handleDelete');
    Actions.removeSolution(this.state.item.id);
  },

  handleInstallSolution() {
    InstallDialogActions.showDialogWithPreFetch(this.getParams().solutionId);
  },

  handleAddVersion() {
    SessionStore.getRouter().transitionTo('solutions-add-version', this.getParams());
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteCreateDialog',
        ref: 'deleteCreateDialog',
        title: 'Delete a Solution',
        handleConfirm: this.handleDelete,
        isLoading: this.props.isLoading,
        groupName: 'Channel',
        children: 'Do you really want to delete this Solution?'
      }
    }];
  },

  renderItemTags() {
    let styles = this.getStyles();

    if (this.state.item.tags && this.state.item.tags.length === 0) {
      return <div style={styles.tag}>no tags</div>;
    }
    return this.state.item.tags.map((tag) => {
      return (
        <div
          key={tag}
          style={styles.tag}>
          {tag}
        </div>
      );
    });
  },

  renderLoaded() {
    let styles = this.getStyles();
    let item = this.state.item;

    return (
      <div>
        {this.getDialogs()}

        <Header logo={true}/>

        <CreateDialog/>
        <InstallDialog/>

        <InnerToolbar
          title={`Solution: ${this.state.item.label} (ID: ${this.state.item.id})`}
          backFallback={this.transitionTo.bind(null, 'solutions')}>
          <Show if={this.isMySolution()}>
            <IconButton
              style={{fontSize: 25, marginTop: 5}}
              iconClassName="synicon-pencil"
              tooltip="Edit Solution"
              onTouchTap={CreateDialogActions.showDialog.bind(null, this.state.item)}/>
            <IconButton
              style={{fontSize: 25, marginTop: 5}}
              iconClassName="synicon-delete"
              tooltip="Delete Solution"
              tooltipPosition="bottom-left"
              onTouchTap={this.showDialog.bind(null, 'deleteCreateDialog')}/>
          </Show>
        </InnerToolbar>

        <Container id='solutions' style={styles.main}>

          <div className="container" style={{paddingTop: 24, clear: 'both'}}>

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

                <div className="row">
                  <FontIcon
                    style={styles.cardTextListIcon}
                    className="synicon-tag"
                    color="rgba(222, 222, 222, 0.54)"/>
                  {this.renderItemTags()}
                </div>

                <div className="row" style={{marginLeft: '-18px'}}>
                  <SolutionStar
                    solution={this.state.item}
                    onStar={Actions.starSolution}
                    onUnstar={Actions.unstarSolution}
                    />
                </div>

                <div className="row vp-5-t align-left">
                  <RaisedButton
                    primary={true}
                    disabled={this.state.versions && this.state.versions.length < 1}
                    label='Install solution'
                    onClick={this.handleInstallSolution}/>
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
                      <Avatar
                        size={70}
                        src={item.author ? item.author.avatar_url : null}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.main}>
              <Show if={!this.isMySolution() && this.isNoVersions()}>
                <div style={styles.main}>No versions.</div>
              </Show>

              <Show if={!this.isNoVersions() || this.isMySolution()}>
                <Solutions.VersionsList
                  name="Versions"
                  items={this.state.versions}
                  isLoading={this.state.isLoading}
                  onInstall={this.handleInstallSolution}
                  emptyItemHandleClick={this.handleAddVersion}
                  emptyItemContent="Add new Version"/>
              </Show>
            </div>
          </div>
        </Container>
      </div>
    );
  }
});
