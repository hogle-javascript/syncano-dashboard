import React from 'react';
import Reflux from 'reflux';

import FullBackupsStore from './Full/FullBackupsStore';
import FullBackupsActions from './Full/FullBackupsActions';
import PartialBackupsStore from './Partial/PartialBackupsStore';
import PartialBackupsActions from './Partial/PartialBackupsActions';

import FullBackupsList from './Full/FullBackupsList';
import PartialBackupsList from './Partial/PartialBackupsList';
import {Container, ShowMore} from '../../common';

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
    const visibleItems = 3;
    const {params} = this.props;
    const fullBackup = this.state.full;
    const partialBackup = this.state.partial;

    return (
      <Container>
        <FullBackupsList
          isLoading={fullBackup.isLoading}
          items={fullBackup.items.slice(0, visibleItems)} />
        <ShowMore
          style={{margin: '-30px 0 40px 0'}}
          visible={fullBackup.items.length > visibleItems && !fullBackup.isLoading}
          routeName="full-backups"
          params={params}/>
        <PartialBackupsList
          isLoading={partialBackup.isLoading}
          items={partialBackup.items.slice(0, visibleItems)} />
        <ShowMore
          style={{margin: '-30px 0 40px 0'}}
          visible={partialBackup.items.length > visibleItems && !partialBackup.isLoading}
          routeName="partial-backups"
          params={params}/>
      </Container>
    );
  }
});
