import React from 'react';
import _ from 'lodash';
import {SelectField, TextField, MenuItem} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'SelectFieldWrapper',

  renderSelectFieldItems(items) {
    return _.map(items, (item) => {
      return (
        <MenuItem
          key={item.payload}
          value={item.payload}
          primaryText={item.text}/>
      );
    });
  },

  renderSelectField() {
    let {name, options, ...other} = this.props;

    return (
      <SelectField
        ref={name}
        name={name}
        className={`${name}-dropdown`}
        fullWidth={true}
        floatingLabelText={_.capitalize(name)}
        onChange={this.handleChange}
        {...other}>
        {this.renderSelectFieldItems(options)}
      </SelectField>
    );
  },

  render() {
    return this.props.disabled ? <TextField {...this.props}/> : this.renderSelectField();
  }
});
