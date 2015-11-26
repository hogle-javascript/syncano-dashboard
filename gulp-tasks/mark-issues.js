var async   = require('async'),
    gutil   = require('gulp-util'),
    git     = require('gulp-git'),
    _       = require('lodash'),
    moment  = require('moment'),
    request = require('superagent');

module.exports = function(cb) {
  var user = process.env.JIRA_USER;
  var password = process.env.JIRA_PASSWORD;
  var rootUrl = process.env.JIRA_ROOT_URL;
  var branch = process.env.CIRCLE_BRANCH;
  var deployedTo = (branch === 'master') ? 'Production': 'Staging';

  if (!branch) {
    throw new gutil.PluginError('mark-issues', '"CIRCLE_BRANCH" env variable is required');
  }

  if (branch !== 'master' && branch !== 'devel') {
    throw new gutil.PluginError('mark-issues', 'This script should only run on "master" or "devel" branch');
  }

  if (!rootUrl) {
    throw new gutil.PluginError('mark-issues', '"JIRA_ROOT_URL" env variable is required');
  }

  if (!user) {
    throw new gutil.PluginError('mark-issues', '"JIRA_USER" env variable is required');
  }

  if (!password) {
    throw new gutil.PluginError('mark-issues', '"JIRA_PASSWORD" env variable is required');
  }

  async.waterfall([
    function(callback) {
      // Parse git log in search of ticket numbers
      var after = moment().subtract(8, 'weeks').format('YYYY-MM-DD');
      var command = 'log --grep="[[:alpha:]{2, 10}][-][[:digit:]]" --oneline --pretty=format:"%s" --after="' + after + '"';
      var regex = /[A-Za-z]{2,10}-[\d]+/gm;

      gutil.log('[mark-issues]', 'Looking for issues after ' + gutil.colors.blue(after));

      git.exec({args: command}, function(err, stdout) {
        if (err) return callback(err);
        var issues = _.map(_.uniq(stdout.match(regex)), function(issue) {
          return issue.replace('FRONT-', 'DASH-').replace('SYNGUI-', 'DASH-');
        });

        gutil.log('[mark-issues]', 'I\'ve found ' + gutil.colors.blue(issues.length) + ' issues');
        callback(null, issues);
      });
    },

    function(issues, callback) {
      // Chceck which issues needs to be updated
      if (issues.length === 0) return callback(null, issues);

      var issueKeys = issues.join(',')
      var jql = '("Deployed to" != ' + deployedTo + ' OR "Deployed to" = EMPTY) AND issuekey in (' + issueKeys + ')';
      request
        .get(rootUrl + 'rest/api/2/search/')
        .query({jql: jql, fields: 'key,customfield_10200', maxResults: issues.length})
        .auth(user, password)
        .end(function(err, response) {
          if (err || response.statusCode !== 200) {
            return callback(err || response);
          }

          gutil.log('[mark-issues]', gutil.colors.blue(response.body.total) + ' issues needs to be updated');
          var issuesToUpdate = _.map(response.body.issues, function(issue) {
            var customfield_10200 = issue.fields.customfield_10200 || [];
            customfield_10200.push({value: deployedTo});

            return {
              key: issue.key,
              customfield_10200: customfield_10200
            };
          });
          callback(null, issuesToUpdate);
        });
    },

    function(issues, callback) {
      // Update proper issues
      if (issues.length === 0) return callback(null, issues);

      async.mapLimit(issues, 2, function(issue, iteratorCallback) {
        gutil.log('[mark-issues]', 'Updating issue ' + gutil.colors.blue(issue.key));

        request
          .put(rootUrl + 'rest/api/2/issue/' + issue.key)
          .type('json')
          .accept('json')
          .send({fields: {customfield_10200: issue.customfield_10200}})
          .auth(user, password)
          .end(function(err, response) {
            if (err || response.statusCode !== 204) {
              return iteratorCallback(err || response);
            }
            iteratorCallback(null, response);
          });
      }, function(err) {
        if (err) return callback(err);
        callback();
      });
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
}
