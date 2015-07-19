import React from 'react';
import _ from 'lodash';

export default React.createClass({

  displayName: 'Show',

  render() {
    if (!this.props.if) {
      return null;
    }

    if (_.isArray(this.props.children)) {
      return <div {...this.props}>{this.props.children}</div>;
    }

    return this.props.children;
  }
});
