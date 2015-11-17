

exports.command = function(callback) {
  let self = this;
  let globals = require('../globals');
  let Syncano = require('syncano');

  this.executeAsync(function(data, done) {
    const classOptions = {
      name: 'class',
      schema: [
        {type: 'string', name: 'name'}
      ]
    };

    const syncano = new Syncano({accountKey: data[0],
                                 baseUrl: 'https://api.syncano.rocks'});

    // console.log('fooo');
    // console.log('sync contructor ', syncano);
    syncano.instance(data[1]).class().add(classOptions).then((res) => {
      globals.tempClassName = res.name;

      done(true);
    });
  }, [globals.tempAccountKey, globals.tempInstanceName], function(result) {
    callback.call(self, JSON.stringify(result, null, 2));
  });
  return this;

  // console.log(globals);
};
