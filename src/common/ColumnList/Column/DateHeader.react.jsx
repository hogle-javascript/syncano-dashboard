import React from 'react';
import ColumnListConstans from '../ColumnListConstans';

export default React.createClass({

  displayName: 'ColumnDateHeader',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.DATE
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
