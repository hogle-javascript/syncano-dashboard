
module.exports = {
  process: function(src, path) {
    if (path.match(/\.css$/) || path.match(/\.sass$/)) {
      return '';
    }
    if (path.match(/\.svg$/)) {
      return '';
    }
    return ReactTools.transform(src, {
    	harmony: true
    });
  }
};