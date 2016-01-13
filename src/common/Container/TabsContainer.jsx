import React from 'react';

import {Utils} from 'syncano-material-ui';
import Container from './Container';

export default React.createClass({
  displayName: 'TabsContainer',

  mixins: [Utils.Styles],

  getStyles() {
    return {
      maxWidth: '800px',
      margin: '0 auto'
    };
  },

  render() {
    let styles = this.getStyles();

    return (
      <Container style={styles}>
        <div className="vm-4-b">
          {this.props.tabs}
        </div>
        {this.props.children}
      </Container>
    );
  }
});
