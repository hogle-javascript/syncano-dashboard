var ReactTools = require('react-tools');

module.exports = {
  process: function(src, path) {
    if (path.match(/\.css$/)) {
      return '';
    };
    if (path.match(/\.svg$/)) {
      return '';
    }
    return ReactTools.transform(src, {
      harmony: true,
    });
  }
};