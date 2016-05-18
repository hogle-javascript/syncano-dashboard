import React from 'react';
import {Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'Container',

  propTypes: {
    style: React.PropTypes.object
  },

  mixins: [Utils.Styles],

  getStyles() {
    let styles = {
      padding: '32px 24px 64px'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    const styles = this.getStyles();
    const {id, children} = this.props;

    return (
      <div
        id={id}
        style={styles}>
        {children}
      </div>
    );
  }
});
