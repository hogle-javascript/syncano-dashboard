import React from 'react';

import MUI from 'syncano-material-ui';

export default React.createClass({

  displayName: 'ListContainer',

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  mixins: [MUI.Utils.Styles],

  getStyles() {
    const styles = {
      margin: '0px auto 48px 0'
    };

    return this.mergeAndPrefix(styles, this.props.style);
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
