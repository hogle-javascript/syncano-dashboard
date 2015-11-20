import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

export default Radium(React.createClass({

  displayName: 'ColumnHeader',

  propTypes: {
    className: React.PropTypes.string,
    columnName: React.PropTypes.string.isRequired,
    styles: React.PropTypes.object,
    primary: React.PropTypes.bool
  },

  getClassName() {
    if (this.props.className) {
      return this.props.className;
    }

    return ColumnListConstans.DEFAULT_CLASSNAME[this.props.columnName];
  },

  getStyles() {
    return {
      primary: {
        fontSize: 20,
        fontWeight: 500
      },
      iconName: {
        paddingLeft: 16
      }
    };
  },

  render() {
    let styles = this.getStyles();
    let componentStyles = [
      this.props.primary && styles.primary,
      this.props.columnName === 'ICON_NAME' && styles.iconName,
      this.props.styles
    ];

    return (
      <div
        className={this.getClassName()}
        style={componentStyles}>
        {this.props.children}
      </div>
    );
  }
}));