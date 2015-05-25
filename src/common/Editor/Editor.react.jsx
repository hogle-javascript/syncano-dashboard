var React = require('react');
var Ace = require('brace');

require('brace/mode/javascript');
require('brace/mode/ruby');
require('brace/mode/python');
require('brace/theme/clouds');

var EditorPanel = require('./EditorPanel.react');

require('./Editor.css');


module.exports = React.createClass({

  displayName: 'Editor',

  propTypes: {
    source: React.PropTypes.string,
    runtime: React.PropTypes.oneOf(['python', 'javascript', 'ruby',  'golang']),
    buttons: React.PropTypes.array,
  },

  getInitialState: function () {
    return {
      value: this.props.source
    }
  },

  componentDidMount: function () {
    this.editor = Ace.edit('editor');
    this.editor.setTheme('ace/theme/clouds');
    this.editor.getSession().setTabSize(1);
    this.editor.selection.clearSelection();

    // Setting mode based on runtime
    this.editor.getSession().setMode('ace/mode/' + this.props.runtime);

    // onEditorChange will be called after any change in source code
    this.editor.on('change', this.onEditorChange);

  },

  componentWillUpdate: function (nextProps, nextState) {
    this.editor.setValue(nextProps.source);
    this.editor.selection.clearSelection();
  },

  componentWillReceiveProps: function (nextProps) {
    //if (nextProps.codebox.data.runtime_name === 'nodejs') {
    //  this.editor.getSession().setMode('ace/mode/javascript');
    //} else if (nextProps.codebox.data.runtime_name === 'python') {
    //  this.editor.getSession().setMode('ace/mode/python');
    //} else if (nextProps.codebox.data.runtime_name === 'ruby') {
    //  this.editor.getSession().setMode('ace/mode/ruby');
    //} else if (nextProps.codebox.data.runtime_name === 'golang') {
    //  this.editor.getSession().setMode('ace/mode/ruby');
    //}
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return nextProps.source !== this.props.source;
  },

  componentDidUpdate: function (prevProps, prevState) {
    this.editor.resize();
  },

  getEditorValue: function () {
    this.props.getEditorValue(this.editor.getValue());
  },

  onEditorChange: function () {
    this.setState({source: this.editor.getValue()});
  },

  render: function () {
    return (
      <div className="editor-group">
        <div id="editor" className="editor" ref="editor">{this.props.source}</div>

      </div>
    );

    //<EditorPanel buttons={this.props.buttons} ref="editorPanel" handleButtonsClick={this.props.handleButtonsClick}/>
  }

});