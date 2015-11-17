import globals from '../globals';
import Syncano from 'syncano';

const syncanoCommands = {

  syncano: new Syncano({accountKey: globals.tempAccountKey,
                                   baseUrl: 'https://api.syncano.rocks'}),

  createTempClass(callback) {
    const classOptions = {
      name: 'class',
      schema: [
        {type: 'string', name: 'name'}
      ]
    };

    this.syncano.instance(globals.tempInstanceName).class().add(classOptions).then((res) => {
      globals.tempClassName = res.name;
      if (typeof callback === 'function') {
        callback();
      }
    });
  }
};

module.exports = {
  commands: [syncanoCommands]
};
