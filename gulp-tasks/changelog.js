var async   = require('async'),
    git     = require('gulp-git'),
    _       = require('lodash');

module.exports = function(cb) {
  async.waterfall([
    function (callback) {
      // Fetch tags from origin
      git.fetch('origin', '', {args: '--tags'}, callback);
    },

    function (callback) {
      // Grab list of tags
      git.exec({args: 'tag'}, function(err, stdout) {
        if (err) return callback(err);
        var tags = stdout.split('\n').slice(-3);
        callback(null, tags[0], tags[1]);
      });
    },

    function(start, end, callback) {
      var range = start + '...' + end;
      var command = 'log ' + range + ' --grep="[[:alpha:]{5, 10}][-][[:digit:]]" --oneline --pretty=format:"%s"';
      var regex = /[A-Za-z]{5,10}-[\d]+/gm;
      git.exec({args: command}, function(err, stdout) {
        if (err) return callback(err);
        callback(null, _.uniq(stdout.match(regex)), end);
      });
    }
  ], function(err, tickets, tag) {
    if (err) throw err;

    console.log('\n\nChangelog for version:', tag + ':\n');

    tickets.sort();
    _.forEach(tickets, function(ticket) {
      if (_.startsWith(ticket, 'SYN')) {
        console.log(_.padRight(ticket, 15), 'https://syncano.aha.io/features/' + ticket);
      } else {
        console.log(ticket);
      }
    });
    cb();
  });
};
