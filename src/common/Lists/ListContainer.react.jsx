import React from 'react';

import MUI from 'material-ui';

export default React.createClass({

  displayName: 'ListContainer',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  getStyles() {
    const styles = {
      margin: '65px auto 65px 0'
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
