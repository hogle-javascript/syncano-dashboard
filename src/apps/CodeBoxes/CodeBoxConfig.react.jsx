import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

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
    InstanceTabsMixin
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

  handleUpdate() {
    let config = this.refs.editorConfig.editor.getValue();
    Actions.updateCodeBox(this.state.currentCodeBox.id, {config: config});
  },

  renderEditor() {
    let config = null,
      codeBox = this.state.currentCodeBox;

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
        <Common.Fab position="top">
          <Common.Fab.Item
            label="Click here to save CodeBox"
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