import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';
import { colors as Colors } from 'material-ui/styles/';
import Truncate from '../../Truncate';

export default Radium(React.createClass({
  displayName: 'ColumnCheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    checkable: React.PropTypes.bool,
    handleIconClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      color: '#4a4a4a',
      icon: ColumnListConstans.DEFAULT_ICON,
      background: ColumnListConstans.DEFAULT_BACKGROUND,
      hoverColor: Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON,
      checkable: true,
      checked: false
    };
  },

  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
        padding: ColumnListConstans.DEFAULT_CELL_PADDING
      },
      primaryText: {
        fontSize: 16,
        lineHeight: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-all',
        flex: 1,
        color: this.state.color
      },
      secondaryText: {
        color: '#9b9b9b'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const { iconElement, primaryText, secondaryText, handleIconClick, className, ...other } = this.props;

    return (
      <div
        className={className}
        style={styles.container}
      >
        {React.createElement(iconElement, { ...other, handleClick: handleIconClick })}
        <div style={{ flex: 1, maxWidth: 'calc(100% - 66px)' }}>
          <div style={styles.primaryText}>
            {typeof primaryText === 'string' ? <Truncate text={primaryText} /> : primaryText}
          </div>
          <div style={styles.secondaryText}>
            {typeof secondaryText === 'string' ? <Truncate text={secondaryText} /> : secondaryText}
          </div>
        </div>
      </div>
    );
  }
}));
