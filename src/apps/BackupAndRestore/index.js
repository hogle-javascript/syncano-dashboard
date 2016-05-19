import BackupAndRestore from './BackupAndRestore';
import AllBackupsList from './AllBackupsList';
import FullBackups from './Full//FullBackups';
import FullBackupsList from './Full/FullBackupsList';
import FullBackupsListItem from './Full/FullBackupsListItem';
import PartialBackups from './Partial/PartialBackups';
import PartialBackupsList from './Partial/PartialBackupsList';

BackupAndRestore.All = AllBackupsList;
BackupAndRestore.Full = FullBackups;
BackupAndRestore.FullList = FullBackupsList;
BackupAndRestore.FullListItem = FullBackupsListItem;
BackupAndRestore.Partial = PartialBackups;
BackupAndRestore.PartialList = PartialBackupsList;

export default BackupAndRestore;
