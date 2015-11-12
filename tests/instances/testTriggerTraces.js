import globals from '../globals';
import Syncano from 'syncano';



export default {
  tags: ['testTriggerTraces'],
  before(client) {
    const classOptions = {
      name: "trigger",
      schema: [
        {type: 'string', name: 'name'}
      ]
    };
    const cbOptions = { 
      "label":"coebox",
      "source":"console.log('testTriggerTraces')",
      "runtime_name":"nodejs",
    };
    const triggerOptions = {
      "label": "trigger",
      "codebox":1,
      "class": classOptions.name,
      "signal":"post_create"
    };
    const syncano = new Syncano({accountKey: globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    const loginPage = client.page.loginPage();

    syncano.instance(globals.tempInstanceName).class().add(classOptions)
           .then(syncano.instance(globals.tempInstanceName).codebox().add(cbOptions)
           .then(syncano.instance(globals.tempInstanceName).trigger().add(triggerOptions)
           .then(syncano.instance(globals.tempInstanceName).class(classOptions.name).dataobject().add({"name":""}););););
    
    loginPage
      .navigate()
      .login(globals.tempEmail, globals.tempPass)
      .verifyLoginSuccessful();
  },
  after(client) {
    const syncano = new Syncano({accountKey: globals.tempAccountKey, baseUrl: 'https://api.syncano.rocks'});
    syncano.instance(globals.tempInstanceName).class(classOptions.name).delete();
    client.end();
  },
  'Test Trigger Traces': (client) => {
    const classesPage = client.page.classesPage();

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/tasks/trigger/1/traces`);

  }
};
