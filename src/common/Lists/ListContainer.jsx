import React from 'react';
import {Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'ListContainer',

  propTypes: {
    style: React.PropTypes.object,
    className: React.PropTypes.string
  },

  mixins: [Utils.Styles],

  getStyles() {
    const styles = {
      marginBottom: 48
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
