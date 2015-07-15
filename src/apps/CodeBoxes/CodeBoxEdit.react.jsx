var React                = require('react'),
    Reflux               = require('reflux'),
    Router               = require('react-router'),

    // Utils
    HeaderMixin          = require('../Header/HeaderMixin'),
    InstanceTabsMixin    = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    CodeBoxActions       = require('./CodeBoxActions'),
    CodeBoxStore         = require('./CodeBoxStore'),

    // Components
    Container            = require('../../common/Container/Container.react'),
    FabList              = require('../../common/Fab/FabList.react'),
    FabListItem          = require('../../common/Fab/FabListItem.react'),
    Loading              = require('../../common/Loading/Loading.react'),
    Editor               = require('../../common/Editor/Editor.react'),
    EditorPanel          = require('../../common/Editor/EditorPanel.react');

module.exports = React.createClass({

  displayName: 'CodeBoxEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount: function() {
    CodeBoxActions.fetch();
  },

  getStyles: function () {
    return {
      container: {
        margin   : '25px auto',
        width    : '100%',
        maxWidth : '1140px'
      },
      tracePanel: {
        marginTop : 30,
        height    : 300
      }
    }
  },

  handleRun: function() {
    CodeBoxActions.runCodeBox({
      id      : this.state.currentCodeBox.id,
      payload : this.state.payload
    });
  },

  handleUpdate: function() {
    var source = this.refs.editorSource.editor.getValue();
    CodeBoxActions.updateCodeBox(this.state.currentCodeBox.id, {source: source});
  },

  renderEditor: function() {
    var styles     = this.getStyles(),
        source     = null,
        codeBox    = this.state.currentCodeBox,
        editorMode = 'python';

    if (codeBox) {
      source     = codeBox.source;
      editorMode = CodeBoxStore.getEditorMode();

      return (
        <div>

          <Editor
            ref   = "editorSource"
            mode  = {editorMode}
            theme = "github"
            value = {source} />

          <div style={styles.tracePanel}>
            <EditorPanel
              ref     = "tracePanel"
              trace   = {this.state.lastTraceResult}
              payload = {this.linkState('payload')}
              loading = {this.linkState('isLoading')}>
            </EditorPanel>
          </div>
        </div>
      )
    }
  },

  render: function () {
    var styles     = this.getStyles();

    return (
      <Container style={styles.container}>
        <FabList position="top">
          <FabListItem
            label         = "Click here to save CodeBox"
            mini          = {true}
            onClick       = {this.handleUpdate}
            iconClassName = "synicon-content-save" />
          <FabListItem
            label         = "Click here to execute CodeBox"
            mini          = {true}
            onClick       = {this.handleRun}
            iconClassName = "synicon-play" />
        </FabList>
        <Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Loading>
      </Container>
    );
  }

});