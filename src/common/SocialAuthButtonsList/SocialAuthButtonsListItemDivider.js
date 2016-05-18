import React from 'react';

import {Styles, Divider} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'SocialAuthButtonsListItemDivider',

  getStyles() {
    return {
      backgroundColor: Styles.Colors.blue700
    };
  },

  render() {
    let styles = this.getStyles();

    return (
      <Divider style={styles}/>
    );
  }
});
