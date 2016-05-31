import React from 'react';
import Reflux from 'reflux';

import Actions from './PartialBackupsActions';
import Store from './PartialBackupsStore';

import PartialBackupsList from './PartialBackupsList';
import {Container} from '../../../common';

export default React.createClass({
  displayName: 'PartialBackups',

  mixins: [
    Reflux.connect(Store)
  ],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    const {isLoading, items} = this.state;

    return (
      <Container>
        <PartialBackupsList
          isLoading={isLoading}
          items={items} />
      </Container>
    );
  }
});
