var React = require('react');
var classNames = require('classnames');

var TextField = require('material-ui/lib/text-field');
var Paper = require('material-ui/lib/paper');
var FontIcon = require('material-ui/lib/font-icon');
var LinearProgress = require('material-ui/lib/linear-progress');

var Icon = require('../Icon/Icon.react');

require('./Editor.css');


module.exports = React.createClass({

  displayName: 'EditorPanel',

  propTypes: {
    trace: React.PropTypes.string,
    buttons: React.PropTypes.array,
    payload: React.PropTypes.string,
    loading: React.PropTypes.bool,
  },

  getInitialState: function () {
    return {
      trace: this.props.trace,
      payload: this.props.payload,
      panelCollapsed: true,
      loading: this.props.loading || false,
    }
  },

  handleToggleClick: function () {
    this.setState({
      panelCollapsed: !this.state.panelCollapsed,
    });
  },

  getProgressBar: function () {
    if (this.state.loading) {
      return (<LinearProgress mode="indeterminate" />);
    }
  },

  render: function () {
    var cssClasses = classNames('editor-panel', {
      'editor-panel-collapsed': this.state.panelCollapsed,
    });
    var payloadStyle = {
        'display': 'flex',
        'flex-direction': 'column',
        'padding': '0px 10px 0px 10px',
        'background-color': '#F1F1F1'
    };

    var progressBar = this.getProgressBar();

    var unfoldIcon = this.state.panelCollapsed ? "unfold-more" : "unfold-less";
    return (
      <Paper zDepth={1} style={{height: '100%', 'background-color': '#F1F1F1'}}>
        <Paper zDepth={1} style={payloadStyle}>
          <TextField style={{width: '100%'}} hintText='Type in your payload here e.g. {"my_argument": "test123}' floatingLabelText="Payload" />
            <div className="editor-toolbar-unfold-button" onClick={this.handleToggleClick}>
              <Icon icon={unfoldIcon}/>
            </div>
        </Paper>
        {progressBar}
        <Paper rounded={false} zDepth={1} style={{'height': '100%', backgroundColor: '#4C4A43', 'color': 'white', 'padding': '10px'}}>
          {this.state.trace}
        </Paper>
      </Paper>
    );
  }

});