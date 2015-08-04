var _ = require('lodash');

module.exports = {
    suffix: '_' + new Date().getTime() + _.random(0, 99999),
    addSuffix: function (text) {
        return text.toString() + this.suffix;
    }
};
