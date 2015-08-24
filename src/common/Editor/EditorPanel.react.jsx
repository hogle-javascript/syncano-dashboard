/* eslint no-catch-shadow:0 */

import React from 'react';
import Radium from 'radium';

// Utils
import FormMixin from '../../mixins/FormMixin';

// Components
import MUI from 'material-ui';
import Loading from '../../common/Loading';

import './Editor.css';

export default Radium(React.createClass({

  displayName: 'EditorPanel',

  mixins: [
    FormMixin
  ],

  propTypes: {
    trace: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  getInitialState() {
    return {
      panelCollapsed: true,
      payloadValue: '{"abc": 123}'
    }
  },

  validatorConstraints: {
    payloadValue: (value) => {
      try {
        JSON.parse(value);
        return null
      } catch (err) {
        return {
          format: {
            pattern: '',
            message: 'is not a valid JSON'
          }
        }
      }
    }
  },

  getStyles() {
    return {
      payloadStyle: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 10px 16px 10px',
        backgroundColor: '#F1F1F1'
      },
      trace: {
        backgroundColor: '#4C4A43',
        color: 'white',
        height: '200px',
        padding: 10
      }
    }
  },

  handleToggleClick() {
    this.setState({
      panelCollapsed: !this.state.panelCollapsed
    });
  },

  render() {
    let styles = this.getStyles();
    let trace = null;

    if (this.state.panelCollapsed) {
      trace = (
        <MUI.Paper
          ref="trace"
          rounded={false}
          zDepth={1}
          style={styles.trace}>
          {this.props.trace}
        </MUI.Paper>
      );
    }

    return (
      <MUI.Paper zDepth={1}>
        <MUI.Paper
          zDepth={1}
          style={styles.payloadStyle}>
          <MUI.TextField
            name='payloadField'
            ref='payloadField'
            valueLink={this.linkState('payloadValue')}
            fullWidth={true}
            hintText='Type in your payload here e.g. {"my_argument": "test123}'
            floatingLabelText='Payload'
            onBlur={this.handleFormValidation}
            errorText={this.getValidationMessages('payloadValue').join(' ')}/>

        </MUI.Paper>
        <Loading
          show={this.props.loading}
          type='linear'/>
        {trace}
      </MUI.Paper>
    );
  }

}));
