var async      = require('async'),
    gutil      = require('gulp-util'),
    google     = require('googleapis'),
    googleAuth = require('google-auth-library');
    version    = 'v' + require('../package.json').version;
    fs         = require('fs');
    path       = require('path');
    _          = require('lodash');

module.exports = function(cb) {
  var clientId = '640917246320-d4u3u065fvpor5d4lo28h9ud82p19q1s.apps.googleusercontent.com'; //process.env.GD_CLIENT_ID;
  var clientSecret = 'kdcdOaU0qNSp_2MaMW67aHqK'; //process.env.GD_CLIENT_SECRET;
  var access_token = 'ya29.2gFMvLddt9QB-2vDFIA2vn0DGH71tVTNYbknf12xPo4zBkxLpY18bIV5Bt1-_dDBnA7L'; //process.env.GD_ACCESS_TOKEN;
  var refresh_token = '1/zo6xCZdkzvkAnwPtj6GbnnuqEnu3uRRtHWUm4bJQi7A'; //process.env.GD_REFRESH_TOKEN;
  var nodeIndex = process.env.CIRCLE_NODE_INDEX || '';

  var invisionFolder = '0B-nLxpmereQIUTBqaTVGVE9iT3c'; // '0B-nLxpmereQIfkV2X1gxQkNtbXlwbHlCZE1RYlpoMFY1OGlaM1ppUkMybnU5bFllRENVZzg';
  var latestFolder = '0B-nLxpmereQIdUdVNmxkeHN0UTg'; // '0B-nLxpmereQIfkwwekk3b3I0dUJMdnZjS2Q4MTVqQnRublJVemlPZEdHVHdEaUlTWjIzdlk';
  var resolutions = ['360x640', '768x1024', '1280x1024'];
  var versionFolder, versionResolutionFolders, latestResolutionFolders, filesLists = null;

  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, "urn:ietf:wg:oauth:2.0:oob");

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

  oauth2Client.setCredentials({
    access_token: access_token,
    refresh_token: refresh_token,
    token_type: 'Bearer',
    expiry_date: 1440513379139
  });

  var drive = google.drive({version: 'v2', auth: oauth2Client});

  /* CREATING AND GETTING VERSION FOLDER */

  function checkVersionFolder(callback) {
    // If actual version folder exist get it otherwise create it and get it
    drive.files.list({
      q: "fullText contains '" + version + "' and '" + invisionFolder + "' in parents and trashed = false"
    }, function(err, response) {
      if (err) return callback(err);
      if (response.items.length < 1) {
        createVersionFolder(callback);
      } else {
        getVersionFolder(response, callback);
      }
    });
  }

  function createVersionFolder(callback) {
    gutil.log('Creating version folder...');
    drive.files.insert({
      resource: {
        title: version,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [{id: invisionFolder}]
      }
    }, function(err, _versionFolder) {
      if (err) return callback(err);
      async.each(resolutions, function(resolution, stepCallback) {
        drive.files.insert({
          resource: {
            title: resolution,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [{id: _versionFolder.id}]
          }
        }, function(err) {
          if (err) return callback(err);
          stepCallback();
        })
      }, function(err, _versionResolutionFolders) {
        if (err) return callback(err);
        versionFolder = _versionFolder;
        versionResolutionFolders = _versionResolutionFolders;
        callback();
      });
    });
  }

  function getVersionFolder(response, callback) {
    gutil.log('Saving version folder ID...');
    drive.files.list({
      q: "mimeType = 'application/vnd.google-apps.folder' and '" + response.items[0].id + "' in parents and" +
      " trashed = false"
    }, function(err, _versionResolutionFolders) {
      versionFolder = response.items[0];
      versionResolutionFolders = _versionResolutionFolders.items;
      callback();
    });
  }

  /* GETTING FILES LISTS */

  function getFilesLists(callback) {
    // Get list of files from disc, GoogleDrive latest and version folder
    async.parallel({
      localFilesList: getLocalFilesList,
      latestFolderFilesList: getLatestFolderFilesList,
      versionFolderFilesList: getVersionFolderFilesList
    }, function(err, _filesLists) {
      if (err) return callback(err);
      filesLists = _filesLists;
      callback()
    })
  }

  function getLocalFilesList(callback) {
    gutil.log('Creating screenshots list...');
    var screenshots = path.resolve(__dirname, '../reports/screenshots/_navigation/');
    var localFilesList = {};

    _.forEach(resolutions, function (resolution) {
      var resolutionDirPath = path.join(screenshots, resolution);
      localFilesList[resolution] = _.map(_.filter(fs.readdirSync(resolutionDirPath), function (fileName) {
        return _.includes(fileName, '.png');
      }), function (file) {
        return {
          path: path.join(screenshots, resolution, file),
          title: file
        }
      })
    });

    callback(null, localFilesList);
  }

  function getLatestFolderFilesList(callback) {
    gutil.log('Creating latest folder screenshots list...');
    var latestFolderFilesList = {};

    drive.files.list({
      q: "'" + latestFolder + "' in parents and trashed = false"
    }, function (err, _latestResolutionFolders) {
      if (err) return callback(err);
      async.each(_latestResolutionFolders.items, function(latestResolutionFolder, callbackOK) {
        drive.files.list({
          q: "'" + latestResolutionFolder.id + "' in parents and trashed = false"
        }, function (err, files) {
          if (err) return callback(err);
          latestFolderFilesList[latestResolutionFolder.title] = _.map(files.items, function (file) {
            return {
              title: file.title,
              id: file.id
            }
          });
          callbackOK();
        })
      }, function (err) {
        if (err) return callback(err);
        latestResolutionFolders = _latestResolutionFolders.items;
        callback(null, latestFolderFilesList);
      });
    })
  }

  function getVersionFolderFilesList(callback) {
    gutil.log('Creating version folder screenshots list...');
    var versionFolderFilesList = {};

    async.each(versionResolutionFolders, function(versionResolutionFolder, callbackOK) {
      drive.files.list({
        q: "'" + versionResolutionFolder.id + "' in parents and trashed = false"
      }, function (err, files) {
        if (err) return callback(err);
        versionFolderFilesList[versionResolutionFolder.title] = _.map(files.items, function (file) {
          return {
            title: file.title,
            id: file.id
          }
        });
        callbackOK();
      })
    }, function(err) {
      if (err) return callback(err)
      callback(null, versionFolderFilesList)
    })
  }

  /* FILTERING WHICH FILES SHOULD BE UPDATED AND WHICH SHOULD BE INSERTED */

  function splitFilesIntoGroup(callback) {
    // Check which files should be updated and which should be inserted
    filesLists.filesToUpdateList = [];
    filesLists.newFilesForLatest = {};
    filesLists.newFilesForVersion = {};

    gutil.log('Creating list of new files and files to update...');

    _.forEach(resolutions, function(resolution) {
      filesLists.filesToUpdateList = filesLists.filesToUpdateList
        .concat(filterFilesToUpdate(filesLists.latestFolderFilesList[resolution], resolution));

      filesLists.filesToUpdateList = filesLists.filesToUpdateList
        .concat(filterFilesToUpdate(filesLists.versionFolderFilesList[resolution], resolution));

      filesLists.newFilesForLatest[resolution] = filterNewFiles(filesLists.latestFolderFilesList[resolution], resolution);
      filesLists.newFilesForVersion[resolution] = filterNewFiles(filesLists.versionFolderFilesList[resolution], resolution);
    });

    callback();
  }

  function filterFilesToUpdate(filesToFilter, resolution) {
    var filteredFiles = _.filter(filesToFilter, function(remoteFile) {
      return _.some(filesLists.localFilesList[resolution], function(localFile) {
        if (localFile.title === remoteFile.title) {
          remoteFile.updateMediaPath = localFile.path;
          return true;
        }

        return false;
      });
    });

    return filteredFiles;
  }

  function filterNewFiles(filesToFilter, resolution) {
    var newFiles = _.reject(filesLists.localFilesList[resolution], function(remoteFile) {
      return _.some(filesToFilter, 'title', remoteFile.title);
    });

    return newFiles;
  }

  /* UPDATE FILES */

  function updateFiles(callback) {
    if (filesLists.filesToUpdateList.length > 0) {
      gutil.log('Updating files...');
      var fileObjects = _.map(filesLists.filesToUpdateList, function(file) {
        return {
          fileId: file.id,
          media: {
            mimeType: 'image/png',
            body: fs.readFileSync(file.updateMediaPath)
          }
        };
      });

      async.each(fileObjects, drive.files.update, function(err) {
        if (err) return callback(err);
        callback();
      });
    } else {
      gutil.log('No files to update.');
      callback();
    }
  }

  /* INSERT FILES */

  function insertNewFiles(callback) {
    _.forEach(resolutions, function(resolution) {
      if (filesLists.newFilesForLatest[resolution].length > 0 || filesLists.newFilesForVersion[resolution].length > 0) {
        gutil.log('Uploading new files...');

        var latestResolutionFolderID = _.pluck(_.filter(latestResolutionFolders, 'title', resolution), 'id');
        var versionResolutionFolderID = _.pluck(_.filter(versionResolutionFolders, 'title', resolution), 'id');
        var latestDriveObjects = mapFilesObjects(filesLists.newFilesForLatest[resolution], latestResolutionFolderID);
        var versionDriveObjects = mapFilesObjects(filesLists.newFilesForVersion[resolution], versionResolutionFolderID);

        async.parallel([
          function() {
            async.each(latestDriveObjects, drive.files.insert);
          },
          function() {
            async.each(versionDriveObjects, drive.files.insert);
          }
        ], function() {
          callback();
        });
      } else {
        gutil.log(resolution, ' - no new files to upload.');
        callback();
      }
    })
  }

  function mapFilesObjects(files, folderID) {
    var objects = files.map(function(file) {
      return {
        resource: {
          title: file.title,
          mimeType: 'image/png',
          parents: [{id: folderID}]
        },
        media: {
          mimeType: 'image/png',
          body: fs.createReadStream(file.path)
        }
      };
    });
    return objects;
  }

  async.waterfall([
    checkVersionFolder,
    getFilesLists,
    splitFilesIntoGroup,
    updateFiles,
    insertNewFiles
  ], function(err) {
    if (err) throw err;
    cb();
  });
};
