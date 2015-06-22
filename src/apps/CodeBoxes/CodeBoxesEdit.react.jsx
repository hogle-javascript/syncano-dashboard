var React                = require('react'),
    Reflux               = require('reflux'),
    Router               = require('react-router'),

    // Utils
    HeaderMixin          = require('../Header/HeaderMixin'),
    ButtonActionMixin    = require('../../mixins/ButtonActionMixin'),
    InstanceTabsMixin    = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    CodeBoxesActions     = require('./CodeBoxesActions'),
    CodeBoxesStore       = require('./CodeBoxesStore'),
    AuthStore            = require('../Account/AuthStore'),

    // Components
    Container            = require('../../common/Container/Container.react'),
    Item                 = require('../../common/ColumnList/Item.react'),
    Column               = require('../../common/ColumnList/ItemColumn.react'),
    Header               = require('../../common/ColumnList/Header.react'),
    ColNameDesc          = require('../../common/ColumnList/ColNameDesc.react'),

    LoadingItem          = require('../../common/ColumnList/LoadingItem.react'),

    FabList              = require('../../common/Fab/FabList.react'),
    FloatingActionButton = require('../../common/Fab/Fab.react'),
    Dialog               = require('material-ui/lib/dialog'),

    Editor               = require('../../common/Editor/Editor.react'),
    EditorPanel          = require('../../common/Editor/EditorPanel.react'),

    AddDialog            = require('./CodeBoxesAddDialog.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesEdit',

  mixins: [
    Router.State,
    Router.Navigation,
    React.addons.LinkedStateMixin,

    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    ButtonActionMixin,
    InstanceTabsMixin
  ],

  componentWillMount: function() {
    CodeBoxesActions.setCurrentCodeBoxId(this.getParams().codeboxId);
    this.setState({
      currentCodeBoxId : this.getParams().codeboxId,
      instanceName     : this.getParams().instanceName
    })
  },

  getStyles: function () {
    return {
      container: {
        margin   : '65px auto',
        width    : '80%',
        maxWidth : '1140px'
      },
      fabList: {
        top: 200
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

  render: function () {

    var styles     = this.getStyles(),
        source     = null,
        codeBox    = CodeBoxesStore.getCurrentCodeBox(),
        editorMode = 'python';

    if (codeBox) {
      source     = codeBox.source;
      editorMode = CodeBoxesStore.getEditorMode(codeBox);
    }

    if (!codeBox) {
      return <LoadingItem />;
    }

    return (
      <Container style={styles.container}>
        <FabList style={styles.fabList}>

          <FloatingActionButton
            label         = "Click here to execute CodeBox" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.handleRun}
            iconClassName = "synicon-play" />

        </FabList>

        <div>Codebox: {codeBox.name}</div>

        <Editor
          ref      = "editor"
          mode     = {editorMode}
          theme    = "github"
          onChange = {this.handleSourceUpdate}
          //name="UNIQUE_ID_OF_DIV"
          value    = {source} />

        <div style={styles.tracePanel}>
          <EditorPanel
            ref     = "tracePanel"
            trace   = {this.state.lastTraceResult}
            payload = {this.linkState('payload')}
            loading = {this.linkState('isLoading')}>
          </EditorPanel>
        </div>

      </Container>
    );
  }

});