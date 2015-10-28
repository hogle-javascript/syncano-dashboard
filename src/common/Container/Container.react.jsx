import React from 'react';
import MUI from 'syncano-material-ui';

export default React.createClass({

  displayName: 'Container',

  propTypes: {
    style: React.PropTypes.object
  },

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    let styles = {
      marginBottom: 50
    };

    return this.mergeStyles(styles, this.props.style);
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
