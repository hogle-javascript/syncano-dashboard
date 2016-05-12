import BackupAndRestore from './BackupAndRestore';
import AllBackupsList from './AllBackupsList';
import FullBackupsList from './FullBackupsList';
import PartialBackupsList from './PartialBackupsList';

BackupAndRestore.All = AllBackupsList;
BackupAndRestore.Full = FullBackupsList;
BackupAndRestore.Partial = PartialBackupsList;

export default BackupAndRestore;
