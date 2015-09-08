import React from 'react';
import ColumnListConstans from '../ColumnListConstans';

export default React.createClass({

  displayName: 'ColumnNameHeader',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.NAME
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
