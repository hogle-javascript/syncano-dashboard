import React from 'react';
import {Utils} from 'syncano-material-ui';

export default React.createClass({

  displayName: 'TabsContainer',

  mixins: [Utils.Styles],

  getStyles() {
    let styles = {
      base: {
        width: '90%',
        margin: '0 auto'
      }
    };

    return this.mergeAndPrefix(styles, this.props.style);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.base}>
        {this.props.children}
      </div>
    );
  }
});
