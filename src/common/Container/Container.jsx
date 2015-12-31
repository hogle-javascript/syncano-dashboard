import React from 'react';
import MUI from 'syncano-material-ui';

export default React.createClass({

  displayName: 'Container',

  propTypes: {
    style: React.PropTypes.object
  },

  mixins: [MUI.Utils.Styles],

  getStyles() {
    let styles = {
      paddingTop: 32,
      paddingRight: 24,
      paddingBottom: 64,
      paddingLeft: 24
    };

    return this.mergeAndPrefix(styles, this.props.style);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        id={this.props.id}
        style={styles}>
        {this.props.children}
      </div>
    );
  }
});
