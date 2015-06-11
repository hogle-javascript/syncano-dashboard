var React               = require('react'),
    Reflux              = require('reflux'),
    Router              = require('react-router'),

    // Utils
    HeaderMixin            = require('../Header/HeaderMixin'),
    ButtonActionMixin      = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    CodeBoxesActions    = require('./CodeBoxesActions'),
    CodeBoxesStore      = require('./CodeBoxesStore'),
    AuthStore           = require('../Account/AuthStore'),

    // Components
    Item                = require('../../common/ColumnList/Item.react'),
    Column              = require('../../common/ColumnList/ItemColumn.react'),
    Header              = require('../../common/ColumnList/Header.react'),
    ColNameDesc         = require('../../common/ColumnList/ColNameDesc.react'),

    FabList             = require('../../common/Fab/FabList.react'),
    Dialog              = require('material-ui/lib/dialog'),

    Editor              = require('../../common/Editor/Editor.react'),
    EditorPanel         = require('../../common/Editor/EditorPanel.react'),

    AddDialog           = require('./CodeBoxesAddDialog.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesEdit',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    React.addons.LinkedStateMixin,
    HeaderMixin,
    ButtonActionMixin,
    Router.State,
    Router.Navigation,
    //ValidationMixin,
  ],

  componentWillMount: function() {
    CodeBoxesActions.setCurrentCodeBoxId(this.getParams().codeboxId);
    this.setState({
      currentCodeBoxId: this.getParams().codeboxId,
      instanceName: this.getParams().instanceName,
    })
  },

  headerBreadcrumbs: function () {
   return [{
      route: 'instances',
      label: 'Instances',
    }, {
      route: 'instance',
      label: this.state.instanceName,
      params: {instanceName: this.state.instanceName}
    },{
      route: 'codeboxes',
      label: 'Codeboxes',
      params: {instanceName: this.state.instanceName}
    },{
      route: 'codeboxes-edit',
      label: this.state.currentCodeBoxId,
      params: {
        codeboxId: this.state.currentCodeBoxId,
        instanceName: this.state.instanceName}
    }]
  },

  headerMenuItems: function () {
   return [
     {
      label: 'Editor',
      route: 'codeboxes-edit',
      params: {
        codeboxId: this.state.currentCodeBoxId,
        instanceName: this.state.instanceName}, 
      active: true,
    },{
      label: 'Config',
      route: 'codeboxes-config',
      params: {
        codeboxId: this.state.currentCodeBoxId,
        instanceName: this.state.instanceName
      }
    },{
      label: 'Traces',
      route: 'codeboxes-traces',
      params: {
        codeboxId: this.state.currentCodeBoxId,
        instanceName: this.state.instanceName
      }
    }]
  },
  
  componentWillUpdate: function (nextProps, nextState) {
  },

  // Collecting params for actions
  getSaveActionParams: function() {
    return {
      id: this.state.currentCodeBoxId,
      source: this.refs.editor.editor.getValue()
    }
  },

  getRunActionParams: function() {
    return {
      id: this.state.currentCodeBoxId,
      payload: this.state.payload,
    }
  },

  getRunAction: function (params) {
    CodeBoxesActions.runCodeBox(params);
    this.setState({traceLoading: true});
  },

  // All the buttons in a view (used by ButtonActionMixin)
  genButtons: function() {
    return {
      runButton: {
        name: "runButton",
        label: "Click here to run CodeBox",
        icon: 'play-arrow',
        color: '#FFC52D',
        action: this.getRunAction,
        params: this.getRunActionParams,
      },
     saveButton: {
        name: "saveButton",
        label: "Click here to save CodeBox",
        icon: 'system-update-tv',
        color: '#FF2D6F',
        action: CodeBoxesActions.updateCodeBox,
        params: this.getSaveActionParams,
      }
    };
  },

  handleSourceUpdate: function(update){
    //console.log(update, this.refs.editorPanel.state.payload);
  },

  render: function () {
    var buttons = this.genButtons();

    var containerStyle = {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };

    var source;
    var codeBox;
    var editorMode = 'python';
    if (this.state.CodeBoxList) {
      codeBox = this.state.CodeBoxList[this.state.currentCodeBoxId];
      source = codeBox.source;
      editorMode = CodeBoxesStore.getEditorMode(codeBox);
    }
    return (
      <div className="container" style={containerStyle}>
        <FabList
          style={{list: {top: 200,}}}
          buttons={[buttons.runButton, buttons.saveButton]}
          handleClick={this.handleButtonClick}/>
        <Editor
          ref="editor"
          mode={editorMode}
          theme="github"
          onChange={this.handleSourceUpdate}
          //name="UNIQUE_ID_OF_DIV"
          value={source} />
        <div style={{marginTop: 30, height: 300}}>
          <EditorPanel
            ref="editorPanel"
            trace={this.state.lastTraceResult}
            payload={this.linkState('payload')}
            loading={this.linkState('traceLoading')}>
          </EditorPanel>
        </div>
      </div>
    );
  }

});