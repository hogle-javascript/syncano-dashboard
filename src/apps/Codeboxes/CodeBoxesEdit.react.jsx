var React               = require('react'),
    Reflux              = require('reflux'),
    Router              = require('react-router'),

    // Utils
    HeaderMixin      = require('../Header/HeaderMixin');

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
    Dialog              = require('material-ui/lib/dialog');

    Editor              = require('../../common/Editor/Editor.react'),
    EditorPanel         = require('../../common/Editor/EditorPanel.react'),

    AddDialog           = require('./CodeBoxesAddDialog.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesEdit',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    //React.addons.LinkedStateMixin,
    HeaderMixin,
    Router.State,
    Router.Navigation,
    //ValidationMixin,
  ],

  headerBreadcrumbs: function () {
   return [
     {
      route: 'instance',
      label: this.getParams().instanceName,
      params: {instanceName: this.getParams().instanceName}
    },{
      route: 'codeboxes',
      label: 'Codeboxes',
      params: {instanceName: this.getParams().instanceName}
    },{
      route: 'codeboxesedit',
      label: this.getParams().codeboxId,
      params: {codeboxId: this.getParams().codeboxId, instanceName: this.getParams().instanceName}
    }]
  },

  dummyClick: function (event) {
      console.log('change!');
  },

    genFabButtons: function() {

    var buttons = [
      {
        name: "runButton",
        label: "Click here to run CodeBox",
        icon: 'play-arrow',
        color: '#FFC52D',
      },
      {
        name: "saveButton",
        label: "Click here to save CodeBox",
        icon: 'system-update-tv',
        color: '#FF2D6F',
      }
    ];
    return <FabList style={{list: {top:200, bottom:0}}} buttons={buttons} handleClick={this.dummyClick}/>;
  },

  render: function () {

    var containerStyle = {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };

    var source;
    if (this.state.CodeBoxList) {
      source = this.state.CodeBoxList[this.getParams().codeboxId].source;
    }

    return (
      <div className="container" style={containerStyle}>
        {this.genFabButtons()}
        <Editor
            mode="python"
            theme="github"
            onChange={this.dummyClick}
            name="UNIQUE_ID_OF_DIV"
            value={source} />
        <div style={{marginTop: 30, height: 300}}>
        <EditorPanel trace={source} payload={'payload'}/>
        </div>
      </div>
    );
  }

});