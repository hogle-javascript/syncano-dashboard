var React          = require('react'),
    Radium         = require('radium'),
    classNames     = require('classnames'),

    mui            = require('material-ui'),
    FontIcon       = mui.FontIcon,
    TextField      = mui.TextField,
    Paper          = mui.Paper,
    FontIcon       = mui.FontIcon,
    LinearProgress = mui.LinearProgress;

require('./Editor.css');


module.exports = Radium(React.createClass({

  displayName: 'EditorPanel',

  mixins: [
    React.addons.LinkedStateMixin
  ],

  propTypes: {
    trace: React.PropTypes.string,
    buttons: React.PropTypes.array,
    payload: React.PropTypes.shape({
      value: React.PropTypes.string,
      requestChange: React.PropTypes.func.isRequired
    }),
    loading: React.PropTypes.shape({
      value: React.PropTypes.bool,
      requestChange: React.PropTypes.func.isRequired
    })
  },

  getInitialState: function () {
    return {
      panelCollapsed: true,
      trace: this.props.trace,
      loading: this.props.loading
    }
  },

  getDefaultProps: function() {
    return {
      loading: {
        value: "",
        requestChange: function() {}
      }
    };
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    this.setState(nextProps);
  },

  handleToggleClick: function () {
    this.setState({
      panelCollapsed: !this.state.panelCollapsed
    });
  },

  getProgressBar: function () {
    if (this.state.loading.value) {
      return (<LinearProgress mode="indeterminate" />);
    }
  },

  getPayloadValue: function() {
    return this.state.payload;
  },

  render: function () {
    var cssClasses = classNames('editor-panel', {
          'editor-panel-collapsed': this.state.panelCollapsed
        }),
        payloadStyle = {
          display         : 'flex',
          flexDirection   : 'column',
          padding         : '0px 10px 0px 10px',
          backgroundColor : '#F1F1F1'
        },
        progressBar = this.getProgressBar(),
        unfoldIcon  = this.state.panelCollapsed ? "synicon-unfold-more" : "synicon-unfold-less",
        trace;

    if (this.state.panelCollapsed) {
      trace = (
        <Paper
          ref     = "trace"
          rounded = {false}
          zDepth  = {1}
          style   = {{
            backgroundColor : '#4C4A43',
            color           : 'white',
            height          : '200px'
          }}>
          {this.props.trace}
        </Paper>
      );
    }

    return (
      <Paper
        zDepth = {1}
        style  = {{'background-color': '#F1F1F1'}}>
        <Paper
          zDepth = {1}
          style  = {payloadStyle}>
          <TextField
            ref               = "payloadField"
            valueLink         = {this.props.payload}
            fullWidth         = {true}
            hintText          = 'Type in your payload here e.g. {"my_argument": "test123}'
            floatingLabelText = "Payload" />
            <div
              className="editor-toolbar-unfold-button"
              onClick={this.handleToggleClick}>
              <FontIcon clasSName={unfoldIcon}/>
            </div>
        </Paper>
        {progressBar}
        {trace}
      </Paper>
    );
  }

}));
