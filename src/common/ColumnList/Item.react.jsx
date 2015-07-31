import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'Item',

  mixins: [MUI.Mixins.StylePropable],

  getDefaultProps() {
    return {
      hoverable   : false
    }
  },

  getStyles() {
    return {
      base: {
        display         : 'flex',
        marginBottom    : 0,
        justifyContent  : 'center'
      },
      checked: {
        backgroundColor : MUI.Styles.Colors.lightBlue50
      },
      hoverable: {
        ':hover': {
          backgroundColor: MUI.Styles.Colors.grey100,
          cursor         : 'pointer'
        }
      },
      cursor: {
        cursor: 'pointer'
      }
    };
  },

  handleClick() {
    this.props.handleClick(this.props.id);
  },

  render() {
    var styles  = this.getStyles(),
      cursor    = (this.props.hoverable || this.props.handleClick),
      hoverable = cursor && !this.props.checked;


    return (
      <Paper
        onClick = {this.props.handleClick ? this.handleClick : null}
        zDepth  = {1}
        style   = {[styles.base,
                  this.props.checked && styles.checked,
                  hoverable && styles.hoverable,
                  cursor && styles.cursor]}
        rounded = {false}>
        {this.props.children}
      </Paper>
    )
  }
}));
