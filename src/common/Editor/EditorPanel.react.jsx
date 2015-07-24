import React from 'react';
import Radium from 'radium';
import classNames from 'classnames';

import MUI from 'material-ui';
import Loading from '../../common/Loading';

require('./Editor.css');

export default Radium(React.createClass({

  displayName: 'EditorPanel',

  mixins: [
    React.addons.LinkedStateMixin
  ],

  propTypes: {
    trace: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  getInitialState() {
    return {
      panelCollapsed: true
    }
  },

  handleToggleClick() {
    this.setState({
      panelCollapsed: !this.state.panelCollapsed
    });
  },

  render() {
    let payloadStyle = {
          display         : 'flex',
          flexDirection   : 'column',
          padding         : '0px 10px 0px 10px',
          backgroundColor : '#F1F1F1'
        },
        unfoldIcon  = this.state.panelCollapsed ? "synicon-unfold-more" : "synicon-unfold-less",
        trace;

    if (this.state.panelCollapsed) {
      trace = (
        <MUI.Paper
          ref     = "trace"
          rounded = {false}
          zDepth  = {1}
          style   = {{
            backgroundColor : '#4C4A43',
            color           : 'white',
            height          : '200px',
            padding         : 10
          }}>
          {this.props.trace}
        </MUI.Paper>
      );
    }

    return (
      <MUI.Paper
        zDepth = {1}
        style  = {{backgroundColor: '#F1F1F1'}}>
        <MUI.Paper
          zDepth = {1}
          style  = {payloadStyle}>
          <MUI.TextField
            ref               = "payloadField"
            defaultValue      = '{"abc": 123}'
            fullWidth         = {true}
            hintText          = 'Type in your payload here e.g. {"my_argument": "test123}'
            floatingLabelText = "Payload" />
            <div
              className="editor-toolbar-unfold-button"
              onClick={this.handleToggleClick}>
              <MUI.FontIcon className={unfoldIcon}/>
            </div>
        </MUI.Paper>
        <Loading show={this.props.loading} type='linear' />
        {trace}
      </MUI.Paper>
    );
  }

}));
