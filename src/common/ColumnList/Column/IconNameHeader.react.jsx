import React from 'react';
import ColumnListConstans from '../ColumnListConstans';

export default React.createClass({

  displayName: 'ColumnIconNameHeader',

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.ICON_NAME
    }
  },

  getStyles() {
    return {
      fontSize: 20,
      fontWeight: 500,
      paddingLeft: 16
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
