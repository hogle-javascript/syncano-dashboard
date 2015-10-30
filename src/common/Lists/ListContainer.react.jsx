import React from 'react';

import MUI from 'material-ui';

export default React.createClass({

  displayName: 'ListContainer',

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    const styles = {
      margin: '0px auto 48px 0'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    const styles = this.getStyles();

    return (
      <div
        style={styles}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
});
