import React from 'react';
import {SelectField, TextField} from 'syncano-material-ui';

export default React.createClass({
  render() {
    return this.props.disabled ? <TextField {...this.props}/> : <SelectField {...this.props}/>;
  }
});
