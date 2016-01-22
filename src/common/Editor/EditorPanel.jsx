import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

// Utils
import FormMixin from '../../mixins/FormMixin';

// Components
import {Paper, TextField} from 'syncano-material-ui';
import {Loading} from 'syncano-components';

import './Editor.css';

export default Radium(React.createClass({
  displayName: 'EditorPanel',

  propTypes: {
    trace: React.PropTypes.string,
    loading: React.PropTypes.bool
  },

  mixins: [
    FormMixin
  ],

  validatorConstraints: {
    payloadValue: (value) => {
      try {
        JSON.parse(value);
        return null;
      } catch (err) {
        return {
          format: {
            pattern: '',
            message: 'is not a valid JSON'
          }
        };
      }
    }
  },

  getInitialState() {
    return {
      panelCollapsed: true,
      payloadValue: '{"abc": 123}'
    };
  },

  componentWillUpdate(nextProps, nextState) {
    if (!_.isEqual(nextState.errors.payloadValue, this.state.errors.payloadValue) && this.props.onError) {
      this.props.onError(nextState.errors.payloadValue);
    }
  },

  getStyles() {
    return {
      payloadStyle: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 10px 24px 10px',
        backgroundColor: '#F1F1F1'
      },
      trace: {
        backgroundColor: '#4C4A43',
        color: 'white',
        height: '200px',
        padding: 10,
        whiteSpace: 'pre',
        overflow: 'auto'
      }
    };
  },

  handleChange(event) {
    if (this.props.handleChange) {
      this.props.handleChange(event.target.value);
    }
    this.setState({
      payloadValue: event.target.value
    });
  },

  render() {
    let styles = this.getStyles();
    let trace = null;

    if (this.state.panelCollapsed) {
      trace = (
        <Paper
          ref="trace"
          rounded={false}
          zDepth={1}
          style={styles.trace}>
          {this.props.trace}
        </Paper>
      );
    }

    return (
      <Paper zDepth={1}>
        <Paper
          zDepth={1}
          style={styles.payloadStyle}>
          <TextField
            onChange={this.handleChange}
            name="payloadField"
            ref="payloadField"
            value={this.state.payloadValue}
            fullWidth={true}
            hintText={`Type in your payload here e.g. {"my_argument": "test123}`}
            floatingLabelText="Payload"
            onBlur={this.handleFormValidation}
            errorText={this.getValidationMessages('payloadValue').join(' ')}/>
        </Paper>
        <Loading
          show={this.props.loading}
          type="linear"/>
        {trace}
      </Paper>
    );
  }

}));
