var React                = require('react'),
    Reflux               = require('reflux'),
    Router               = require('react-router'),

    // Utils
    HeaderMixin          = require('../Header/HeaderMixin'),
    InstanceTabsMixin    = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    CodeBoxesActions     = require('./CodeBoxesActions'),
    CodeBoxesStore       = require('./CodeBoxesStore'),

    // Components
    Container            = require('../../common/Container/Container.react'),
    Header               = require('../../common/ColumnList/Header.react'),
    Loading              = require('../../common/Loading/Loading.react'),
    FabList              = require('../../common/Fab/FabList.react'),
    FabListItem          = require('../../common/Fab/FabListItem.react'),
    Editor               = require('../../common/Editor/Editor.react'),
    EditorPanel          = require('../../common/Editor/EditorPanel.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount: function() {
    CodeBoxesActions.fetch();
    CodeBoxesActions.setCurrentCodeBoxId(this.getParams().codeboxId);
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
    CodeBoxesActions.runCodeBox({
      id      : this.state.currentCodeBoxId,
      payload : this.state.payload
    });
  },

  handleUpdate: function() {
    var params = {};
    if (this.getRoutes()[this.getRoutes().length - 1].name === "codeboxes-edit") {
      params.source = this.refs.editor.editor.getValue();
    } else {
      params.config = this.refs.editor.editor.getValue()
    }
    CodeBoxesActions.updateCodeBox(this.state.currentCodeBoxId, params);
  },

  renderEditor: function() {
    var styles            = this.getStyles(),
        source            = null,
        config            = null,
        codeBox           = CodeBoxesStore.getCurrentCodeBox(),
        codeBoxName       = "",
        editorMode        = 'python',
        activeRouteName   = this.getRoutes()[this.getRoutes().length - 1].name,
        isEditRouteActive = activeRouteName === "codeboxes-edit";

    if (codeBox) {
      source      = codeBox.source;
      config      = JSON.stringify(codeBox.config, null, 2);
      editorMode  = isEditRouteActive ? CodeBoxesStore.getEditorMode(codeBox) : "javascript";

      return (
        <div>

          <Editor
            ref   = "editor"
            //name  = {editorName}
            mode  = {editorMode}
            theme = "github"
            value = {isEditRouteActive ? source : config} />

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
    console.debug('CodeBoxesEdit::render');
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
        {this.renderEditor()}
      </Container>
    );
  }

});