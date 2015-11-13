import globals from '../globals';
import Syncano from 'syncano';

module.exports.command = function(callback) {
  console.log('this');
  this.execute(() => {
    const classOptions = {
      name: 'class',
      schema: [
        {type: 'string', name: 'name'}
      ]
    };

    console.log('or this');
    const syncano = new Syncano({accountKey: globals.tempAccountKey,
                                 baseUrl: 'https://api.syncano.rocks'});

    syncano.instance(globals.tempInstanceName).class().add(classOptions).then((res) => {
      globals.tempClassName = res.name;
    });
  });
  console.log(globals);
  return this;
};
