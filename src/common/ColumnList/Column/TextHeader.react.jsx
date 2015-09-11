import React from 'react';
import ColumnListConstans from '../ColumnListConstans';

export default React.createClass({

  displayName: 'ColumnTextHeader',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.TEXT
    }
  },

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
});
