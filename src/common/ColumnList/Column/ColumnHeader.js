import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import {Styles} from 'syncano-material-ui';

export default Radium(React.createClass({

  displayName: 'ColumnHeader',

  propTypes: {
    handleClick: React.PropTypes.func,
    className: React.PropTypes.string,
    columnName: React.PropTypes.string.isRequired,
    styles: React.PropTypes.object,
    primary: React.PropTypes.bool,
    children: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.node
    ]).isRequired
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
      },
      link: {
        cursor: 'pointer',
        display: 'inline-block',
        ':hover': {
          color: Styles.Colors.blue400
        }
      }
    };
  },

  handleClick() {
    if (typeof this.props.handleClick === 'function') {
      this.props.handleClick();
    }
  },

  render() {
    const headerStyles = this.getStyles();
    const {children, handleClick, primary, columnName, styles} = this.props;

    return (
      <div
        className={this.getClassName()}
        style={[primary && headerStyles.primary, columnName === 'ICON_NAME' && headerStyles.iconName, styles]}>
        <div
          style={handleClick && headerStyles.link}
          onClick={this.handleClick}>
          {children}
        </div>
      </div>
    );
  }
}));
