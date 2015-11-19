import globals from '../globals';
import Syncano from 'syncano';
import async from 'async';

export default {
  tags: ['triggerTraces'],
  after(client) {
    client.end();
  },
  'Test Trigger Traces': (client) => {
    const classesPage = client.page.classesPage();

    async.waterfall([
      client.createTempAccount,
      client.createTempClass
    ], (err) => {
      if (err) throw err;
      client.url(`https://google.pl`);
      client.pause(5000, function() {
        console.log(globals);
      });
    });
  }
};
