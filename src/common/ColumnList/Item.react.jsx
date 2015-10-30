import React from 'react';
import Radium from 'radium';

import MUI from 'syncano-material-ui';

import ColumnListConstans from './ColumnListConstans';

export default Radium(React.createClass({

  displayName: 'Item',

  mixins: [MUI.Utils.Styles],

  getDefaultProps() {
    return {
      zDepth: 1
    };
  },

  getStyles() {
    return {
      base: {
        display: 'flex',
        marginBottom: 0,
        justifyContent: 'center',
        height: ColumnListConstans.DEFAULT_ITEM_HEIGHT,
        background: '#fff'
      },
      noBackground: {
        background: 'none',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
        marginTop: '-1px'
      },
      checked: {
        background: MUI.Styles.Colors.lightBlue50
      },
      hoverable: {
        cursor: 'pointer',
        ':hover': {
          background: MUI.Styles.Colors.grey100
        }
      }
    };
  },

  renderClickableItem() {
    let styles = this.getStyles();

    return (
      <MUI.Paper
        onTouchTap={this.props.handleClick}
        zDepth={this.props.zDepth}
        style={this.mergeAndPrefix(
          styles.base,
          styles.hoverable,
          this.props.checked === true && styles.checked
        )}
        rounded={false}>
        {this.props.children}
      </MUI.Paper>
    );
  },

  renderItem() {
    let styles = this.getStyles();

    return (
      <MUI.Paper
        zDepth={0}
        style={this.mergeAndPrefix(
          styles.base,
          styles.noBackground,
          this.props.checked === true && styles.checked
        )}
        rounded={false}>
        {this.props.children}
      </MUI.Paper>
    );
  },

  render() {
    let isClickable = this.props.handleClick;

    return isClickable ? this.renderClickableItem() : this.renderItem();
  }
}));
