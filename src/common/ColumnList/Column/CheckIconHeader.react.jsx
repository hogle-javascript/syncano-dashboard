import React from 'react';
import ColumnListConstans from '../ColumnListConstans';

export default React.createClass({

  displayName: 'ColumnCheckIconHeader',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON
    }
  },

  getStyles() {
    return {
      fontSize: 20,
      fontWeight: 500
    }
  },

  render() {
    let styles = this.getStyles();

    return (
    <div
      className={this.props.className}
      style={styles}>
      {this.props.children}
    </div>
    )
  }
});
