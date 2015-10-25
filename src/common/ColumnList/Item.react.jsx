import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'Item',

  mixins: [
    MUI.Mixins.StylePropable
  ],

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
        style={_.assign(
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
        style={_.assign(
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
