import React from 'react';
import Reflux from 'reflux';

import FullBackupsStore from './Full/FullBackupsStore';

import FullBackupsList from './Full/FullBackupsList';

export default React.createClass({
  displayName: 'AllBackups',

  mixins: [
    Reflux.connect(FullBackupsStore, 'full')
  ],

  render() {
    const {isLoading, items} = this.state.full;

    return (
      <div>
        <FullBackupsList
          isLoading={isLoading}
          items={items} />

        PArtial backups list
      </div>
    );
  }
});
