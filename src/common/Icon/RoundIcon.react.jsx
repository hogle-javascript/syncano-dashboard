import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'RoundIcon',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    background: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  handleClick() {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id);
    }
  },

  getStyles() {
    let styles = {
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: this.props.background,
      margin: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        style={styles}
        onClick={this.handleClick}>
        {this.props.children}
      </div>
    )
  }
}));
