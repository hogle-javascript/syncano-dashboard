import React from 'react';
import MUI from 'material-ui';

export default React.createClass({

  displayName: 'Container',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

  getStyles() {
    var styles = {
      marginBottom: 50
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    var styles = this.getStyles();

    return (
      <div
        id    = {this.props.id}
        style = {styles}
      >
        {this.props.children}
      </div>
    );
  }
});
