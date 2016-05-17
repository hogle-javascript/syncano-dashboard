import React from 'react';
import Reflux from 'reflux';

import FullBackupsStore from './Full/FullBackupsStore';
import FullBackupsActions from './Full/FullBackupsActions';
import PartialBackupsStore from './Partial/PartialBackupsStore';
import PartialBackupsActions from './Partial/PartialBackupsActions';

import FullBackupsList from './Full/FullBackupsList';
import PartialBackupsList from './Partial/PartialBackupsList';
import {Container} from 'syncano-components';

export default React.createClass({
  displayName: 'AllBackups',

  mixins: [
    Reflux.connect(FullBackupsStore, 'full'),
    Reflux.connect(PartialBackupsStore, 'partial')
  ],

  componentDidMount() {
    FullBackupsActions.fetch();
    PartialBackupsActions.fetch();
  },

  render() {
    const fullBackup = this.state.full;
    const partialBackup = this.state.partial;

    return (
      <Container>
        <FullBackupsList
          isLoading={fullBackup.isLoading}
          items={fullBackup.items} />
        <PartialBackupsList
          isLoading={partialBackup.isLoading}
          items={partialBackup.items} />
      </Container>
    );
  }
});
