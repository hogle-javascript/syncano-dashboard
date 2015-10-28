import React from 'react';
import Radium from 'radium';

import MUI from 'syncano-material-ui';

let Transitions = MUI.Styles.Transitions;
let ColorManipulator = MUI.Utils.ColorManipulator;

export default Radium(React.createClass({

  displayName: 'FABListItem',

  propTypes: {
    handleClick: React.PropTypes.func
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [MUI.Mixins.StylePropable],

  getInitialState() {
    return {
      hovered: false
    };
  },

  getStyles() {
    const FABStyles = this.getTheme();

    return {
      root: {
        margin: '3px 0',
        zIndex: 1
      },
      button: {
        borderRadius: '50%',
        background: this._getColor(),
        width: FABStyles.buttonSize,
        height: FABStyles.buttonSize,
        transition: Transitions.easeOut()
      },
      icon: {
        display: '-webkit-flex; display: flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: FABStyles.iconColor
      },
      buttonMini: {
        width: FABStyles.miniSize,
        height: FABStyles.miniSize,
        padding: 8
      },
      disabled: {
        background: FABStyles.disabledColor
      },
      disabledIcon: {
        color: FABStyles.disabledTextColor
      },
      tooltip: {
        right: 60,
        top: 32
      },
      tooltipButtonMini: {
        right: 44,
        top: 24
      },
      buttonWhenHovered: {
        background: ColorManipulator.fade(this._getColor(), 0.6)
      }
    };
  },

  getTheme() {
    return this.context.muiTheme.floatingActionButton;
  },

  _getColor() {
    if (this.props.disabled) {
      return this.getTheme().disabledTextColor;
    }

    if (this.props.secondary) {
      return this.getTheme().secondaryColor;
    }

    return this.getTheme().color;
  },

  _handleMouseLeave() {
    this.setState({hovered: false});
  },

  _handleMouseEnter() {
    this.setState({hovered: true});
  },

  render() {
    let styles = this.getStyles();

    return (
      <MUI.Paper
        zDepth={2}
        circle={true}
        style={styles.root}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <MUI.IconButton
          {...this.props}
          style={this.mergeAndPrefix(
                styles.button,
                this.props.mini && styles.buttonMini,
                this.state.hovered && styles.buttonWhenHovered
              )}
          iconStyle={styles.icon}
          tooltipPosition="top-right"
          tooltipStyles={this.mergeAndPrefix(
                styles.tooltip,
                this.props.mini && styles.tooltipButtonMini
              )}
          touchRippleColor="#fff"
        />
      </MUI.Paper>
    );
  }
}));
