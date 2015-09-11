import React from 'react';
import ColumnListConstans from '../ColumnListConstans';

export default React.createClass({

  displayName: 'ColumnIDHeader',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.ID
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
