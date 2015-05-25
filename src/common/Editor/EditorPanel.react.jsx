var React = require('react');
var classNames = require('classnames');

//var InstanceStore = require('../stores/InstanceStore');
//var ViewActions = require('../actions/ViewActions');

var ButtonGroup = require('../Button/ButtonGroup.react');
var Icon = require('../Icon/Icon.react');
var ProgressBar = require('../ProgressBar/ProgressBar.react');

module.exports = React.createClass({

  displayName: 'EditorPanel',

  getInitialState: function () {
    return {
      //panelCollapsed: InstanceStore.isEditorPanelCollapsed(),
      //codeboxTrace: InstanceStore._getCodeBoxTrace(),
      //editorLoading: InstanceStore.isEditorWaitingForResponse(),
    }
  },

  onChange: function () {
    this.setState({
      //panelCollapsed: InstanceStore.isEditorPanelCollapsed(),
      //codeboxTrace: InstanceStore._getCodeBoxTrace(),
      //editorLoading: InstanceStore.isEditorWaitingForResponse(),
    });
  },

  componentDidMount: function () {
    InstanceStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    InstanceStore.removeChangeListener(this.onChange)
  },

  handleToggleClick: function () {
    ViewActions.toggleEditorPanel();
  },

  render: function () {
    var cssClasses = classNames('editor-panel', {
      'editor-panel-collapsed': this.state.panelCollapsed,
      'editor-panel-loading': this.state.editorLoading,
    });
    var unfoldIcon = this.state.panelCollapsed ? "unfold-more" : "unfold-less";
    return (
      <div className={cssClasses}>
        <div className="editor-toolbar">
          <input className="field-input" type="text" placeholder="Payload" ref="payload"/>

          <div className="editor-toolbar-buttons">
            <ButtonGroup buttons={this.props.buttons} handleClick={this.props.handleButtonsClick}/>

            <div className="editor-toolbar-unfold-button" onClick={this.handleToggleClick}>
              <Icon icon={unfoldIcon}/>
            </div>
          </div>
        </div>
        <ProgressBar />

        <div className="editor-console">{this.state.codeboxTrace.data.result}</div>
      </div>
    );
  }

});