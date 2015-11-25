var async   = require('async'),
    gutil   = require('gulp-util'),
    git     = require('gulp-git'),
    _       = require('lodash'),
    request = require('superagent'),
    semver  = require('semver');

module.exports = function(cb) {
  var user = process.env.JIRA_USER;
  var password = process.env.JIRA_PASSWORD;
  var rootUrl = process.env.JIRA_ROOT_URL;

  if (!rootUrl) {
    throw new gutil.PluginError('changelog', '"JIRA_ROOT_URL" env variable is required');
  }

  if (!user) {
    throw new gutil.PluginError('changelog', '"JIRA_USER" env variable is required');
  }

  if (!password) {
    throw new gutil.PluginError('changelog', '"JIRA_PASSWORD" env variable is required');
  }

  async.waterfall([
    function (callback) {
      // Fetch tags from origin
      git.fetch('origin', '', {args: ' --tags '}, callback);
    },

    function (callback) {
      // Grab list of tags
      git.exec({args: 'tag'}, function(err, stdout) {
        if (err) return callback(err);
        var tags = stdout.split('\n').filter(function(tag) {
          return tag.length > 5;
        });
        tags = tags.sort(semver.rcompare);
        callback(null, tags[1], tags[0]);
      });
    },

    function(start, end, callback) {
      // Parse git log in search of ticket numbers
      var range = start + '...' + end;
      var command = 'log ' + range + ' --grep="[[:alpha:]{2, 10}][-][[:digit:]]" --oneline --pretty=format:"%s"';
      var regex = /[A-Za-z]{2,10}-[\d]+/gm;
      git.exec({args: command}, function(err, stdout) {
        if (err) return callback(err);
        callback(null, _.uniq(stdout.match(regex)), end);
      });
    },

    function(tickets, tag, callback) {
      // Fetch tickets details from AHA
      async.mapLimit(tickets, 3, function(ticket, iteratorCallback) {
        ticket = ticket.replace('FRONT-', 'DASH-').replace('SYNGUI-', 'DASH-');

        gutil.log('[changelog]', 'Fetching details for ' + gutil.colors.blue(ticket));
        request
          .get(rootUrl + 'rest/api/2/issue/' + ticket)
          .auth(user, password)
          .end(function(err, response) {
            if (err || response.statusCode !== 200) {
              return iteratorCallback(err, {
                summary: '',
                type: 'Other',
                key: ticket
              })
            }

            var issue = response.body.fields;
            iteratorCallback(null, {
              summary: issue.summary,
              type: issue.issuetype.name,
              key: ticket
            })
          });
      }, function(err, results) {
        callback(null, results, tag);
      });
    }
  ], function(err, tickets, tag) {
    if (err) throw err;

    var groupedTickets = _.reduce(tickets, function(result, value) {
      result[value.type] = result[value.type] || [];
      result[value.type].push('[' + gutil.colors.blue(value.key) + '] ' + value.summary);
      return result;
    }, {});

    console.log('\n\nChangelog for version:', tag + ':\n');

    _.forEach(groupedTickets, function(changelog, type) {
      console.log(gutil.colors.green.bold(type) + ':\n' + changelog.join('\n') + '\n\n');
    });

    cb();
  });
};
