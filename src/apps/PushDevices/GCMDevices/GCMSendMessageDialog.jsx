import React from 'react';

import {DialogMixin} from '../../../mixins';

import Dialog from 'syncano-material-ui';

export default React.createClass({

  displayName: 'SendGCMMessageDialog',

  mixins: [DialogMixin],

  render() {
    let {children, open, ...other} = this.props;

    return (
      <div>
        <Dialog
          ref="dialog"
          open={this.state.open}
          autoDetectWindowHeight={false}>
          {children}
        </Dialog>
      </div>
    );
  }
});
