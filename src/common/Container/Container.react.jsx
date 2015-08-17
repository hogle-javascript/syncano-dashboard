import React from 'react';
import MUI from 'material-ui';

export default React.createClass({

  displayName: 'Container',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

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
