import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import UnsavedDataMixin from './UnsavedDataMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './CodeBoxActions';
import Store from './CodeBoxStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container.react';

export default Radium(React.createClass({

  displayName: 'CodeBoxConfig',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(Store),
    HeaderMixin,
    UnsavedDataMixin,
    Mixins.Dialogs,
    Mixins.InstanceTabs
  ],

  componentDidMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      container: {
        margin: '25px auto',
        width: '100%',
        maxWidth: '1140px'
      }
    }
  },

  isSaved() {
    let initialCodeBoxConfig = JSON.stringify(this.state.currentCodeBox.config, null, 2);
    let currentCodeBoxConfig = this.refs.editorConfig.editor.getValue();

    return initialCodeBoxConfig === currentCodeBoxConfig;
  },

  handleUpdate() {
    let config = this.refs.editorConfig.editor.getValue();

    Actions.updateCodeBox(this.state.currentCodeBox.id, {config});
  },

  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        ref: 'unsavedCodeBoxWarn',
        title: 'Unsaved CodeBox config',
        actions: [
          {
            text: 'Just leave',
            onClick: this.handleContinueTransition
          },
          {
            text: 'Continue editing',
            onClick: this.handleCancel
          }
        ],
        modal: true,
        children: "You're leaving CodeBox Config with unsaved changes. Are you sure you want to continue?"
      }
    }]
  },

  renderEditor() {
    let config = null;
    let codeBox = this.state.currentCodeBox;

    if (codeBox) {
      config = JSON.stringify(codeBox.config, null, 2);

      return (
      <div>
        <Common.Editor
        ref="editorConfig"
        height={300}
        mode="javascript"
        theme="github"
        value={config}/>
      </div>
      )
    }
  },

  render() {
    console.debug('CodeBoxConfig::render');
    let styles = this.getStyles();

    return (
      <Container style={styles.container}>
        {this.getDialogs()}
        <Common.Fab position="top">
          <Common.Fab.TooltipItem
            tooltip="Click here to save CodeBox"
            mini={true}
            onClick={this.handleUpdate}
            iconClassName="synicon-content-save"/>
        </Common.Fab>
        <Common.Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Common.Loading>
      </Container>
    );
  }
}));
