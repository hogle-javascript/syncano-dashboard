var React                = require('react'),
    Reflux               = require('reflux'),
    Router               = require('react-router'),
    Radium               = require('radium'),

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
    Editor               = require('../../common/Editor/Editor.react');

module.exports = Radium(React.createClass({

  displayName: 'CodeBoxConfig',

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
      }
    }
  },

  handleUpdate: function() {
    var config = this.refs.editorConfig.editor.getValue();
    CodeBoxActions.updateCodeBox(this.state.currentCodeBox.id, {config: config});
  },

  renderEditor: function() {
    var config  = null,
        codeBox = this.state.currentCodeBox;

    if (codeBox) {
      config      = JSON.stringify(codeBox.config, null, 2);

      return (
        <div>
          <Editor
            ref    = "editorConfig"
            height = {300}
            mode   = "javascript"
            theme  = "github"
            value  = {config} />
        </div>
      )
    }
  },

  render: function () {
    console.debug('CodeBoxConfig::render');
    var styles = this.getStyles();

    return (
      <Container style={styles.container}>
        <FabList position="top">
          <FabListItem
            label         = "Click here to save CodeBox"
            mini          = {true}
            onClick       = {this.handleUpdate}
            iconClassName = "synicon-content-save" />
        </FabList>
        <Loading show={this.state.isLoading}>
          {this.renderEditor()}
        </Loading>
      </Container>
    );
  }

}));