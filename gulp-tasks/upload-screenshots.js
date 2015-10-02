var async      = require('async'),
    gutil      = require('gulp-util'),
    google     = require('googleapis'),
    googleAuth = require('google-auth-library');

module.exports = function(cb) {
  var clientId = process.env.GD_CLIENT_ID;
  var clientSecret = process.env.GD_CLIENT_SECRET;
  var access_token = process.env.GD_ACCESS_TOKEN;
  var refresh_token = process.env.GD_REFRESH_TOKEN;
  var nodeIndex = process.env.CIRCLE_NODE_INDEX || '';

  if (process.env.CI && nodeIndex.toString() !== '1') {
    gutil.log('Exit');
    return cb();
  }

  if (!clientId) {
    throw new gutil.PluginError('upload-screenshots', '"GD_CLIENT_ID" env variable is required');
  }

  if (!clientSecret) {
    throw new gutil.PluginError('upload-screenshots', '"GD_CLIENT_SECRET" env variable is required');
  }

  if (!access_token) {
    throw new gutil.PluginError('upload-screenshots', '"GD_ACCESS_TOKEN" env variable is required');
  }

  if (!refresh_token) {
    throw new gutil.PluginError('upload-screenshots', '"GD_REFRESH_TOKEN" env variable is required');
  }

  var invisionFolder = '0B-nLxpmereQIfkV2X1gxQkNtbXlwbHlCZE1RYlpoMFY1OGlaM1ppUkMybnU5bFllRENVZzg';
  var latestFolder = '0B-nLxpmereQIfkwwekk3b3I0dUJMdnZjS2Q4MTVqQnRublJVemlPZEdHVHdEaUlTWjIzdlk';

  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, "urn:ietf:wg:oauth:2.0:oob");
  oauth2Client.setCredentials({
    access_token: access_token,
    refresh_token: refresh_token,
    token_type: 'Bearer',
    expiry_date: 1440513379139
  });

  var drive = google.drive({version: 'v2', auth: oauth2Client});

  async.waterfall([
    function(callback) {
      // If actual version folder exist get it otherwise create it and get it
      drive.files.list({
        q: "fullText contains '" + version + "' and '" + invisionFolder + "' in parents and trashed = false"
      }, function(err, response) {
        if (err) return callback(err);
        if (response.items.length < 1) {
          gutil.log('Creating version folder...');
          drive.files.insert({
            resource: {
              title: version,
              mimeType: 'application/vnd.google-apps.folder',
              parents: [{id: invisionFolder}]
            }
          }, function(err, folder) {
            if (err) return callback(err);
            callback(null, folder);
          });
        } else {
          gutil.log('Saving version folder ID...');
          var folder = response.items[0];
          callback(null, folder)
        }
      });
    },
    function(folder, callback) {
      // Get list of files from disc, GoogleDrive latest and version folder
      async.parallel({
        localFilesList: function(callback) {
          gutil.log('Creating screenshots list...');
          var screenshots = './reports/screenshots/_navigation/';
          var files = fs.readdirSync(screenshots);
          var localFilesList = _.map(_.filter(files, function(file) {
            return _.includes(file, '.png')
          }), function(file) {
            return {
              path: path.join(screenshots, file),
              title: file
            };
          });

          callback(null, localFilesList);
        },
        latestFolderFilesList: function(callback) {
          gutil.log('Creating latest folder screenshots list...');
          var latestFolderFilesList = [];

          drive.files.list({
            q: "'" + latestFolder + "' in parents and trashed = false"
          }, function(err, response) {
            if (err) return callback(err);
            latestFolderFilesList = _.map(response.items, function(item) {
              return {
                title: item.title,
                id: item.id
              }
            });

            callback(null, latestFolderFilesList);
          });
        },
        versionFolderFilesList: function(callback) {
          gutil.log('Creating version folder screenshots list...');
          var versionFolderFilesList = [];

          drive.files.list({
            q: "'" + folder.id + "' in parents and trashed = false"
          }, function(err, response) {
            if (err) return callback(err);
            versionFolderFilesList = _.map(response.items, function(item) {
              return {
                title: item.title,
                id: item.id
              }
            });

            callback(null, versionFolderFilesList);
          });
        }
      }, function(err, filesLists) {
        if (err) return callback(err);
        callback(null, filesLists, folder)
      });
    },
    function(_files, folder,  callback) {
      // Check which files should be updated and which should be inserted
      var files = _files;
      files.filesToUpdateList = [];

      function getFilesToUpdate(filesToFilter) {
        var filteredFiles = _.filter(filesToFilter, function(remoteFile) {
          return _.some(files.localFilesList, function(localFile) {
            if (localFile.title === remoteFile.title) {
              remoteFile.updateMediaPath = localFile.path;
              return true;
            }

            return false;
          });
        });

        return filteredFiles;
      }

      function getNewFiles(filesToFilter) {
        var newFiles = _.reject(files.localFilesList, function(remoteFile) {
          return _.some(filesToFilter, 'title', remoteFile.title);
        });

        return newFiles;
      }

      gutil.log('Creating list of files to update...');
      files.filesToUpdateList = files.filesToUpdateList.concat(getFilesToUpdate(files.latestFolderFilesList));
      files.filesToUpdateList = files.filesToUpdateList.concat(getFilesToUpdate(files.versionFolderFilesList));
      gutil.log('Creating list of new files...');
      files.newFilesForLatest = getNewFiles(files.latestFolderFilesList);
      files.newFilesForVersion = getNewFiles(files.versionFolderFilesList);

      callback(null, files, folder);
    },
    function(files, folder, callback) {
      // Update files
      if (files.filesToUpdateList.length > 0) {
        gutil.log('Updating files...');
        var fileObjects = _.map(files.filesToUpdateList, function(file) {
          return {
            fileId: file.id,
            media: {
              mimeType: 'image/png',
              body: fs.readFileSync(file.updateMediaPath)
            }
          }
        });

        async.each(fileObjects, drive.files.update, function(err) {
          if (err) return callback(err);
          callback(null, files, folder);
        });
      } else {
        gutil.log('No files to update.');
        callback(null, files, folder);
      }
    },
    function(files, folder, callback) {
      // Insert new files
      if (files.newFilesForLatest.length > 0 || files.newFilesForVersion.length > 0) {
        gutil.log('Uploading new files...');
        function mapDriveObjects(newFiles, folderId) {
          var objects = newFiles.map(function(file) {
            return {
              resource: {
                title: file.title,
                mimeType: 'image/png',
                parents: [{id: folderId}]
              },
              media: {
                mimeType: 'image/png',
                body: fs.createReadStream(file.path)
              }
            };
          });
          return objects;
        }

        var latestDriveObjects = mapDriveObjects(files.newFilesForLatest, latestFolder);
        var versionDriveObjects = mapDriveObjects(files.newFilesForVersion, folder.id);

        async.parallel([
          function() {
            async.each(latestDriveObjects, drive.files.insert);
          },
          function() {
            async.each(versionDriveObjects, drive.files.insert)
          }
        ], function() {
          callback();
        });
      } else {
        gutil.log('No new files to upload.');
        callback();
      }
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
};
