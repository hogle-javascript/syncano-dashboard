import globals from '../globals';
import Syncano from 'syncano';


export default {
  tags: ['testTriggerTraces'],
  before(client) {
    const loginPage = client.page.loginPage();

    client.createTempAccount();

    client.session(function() {
      const classOptions = {
        name: 'class',
        schema: [
          {type: 'string', name: 'name'}
        ]
      };
      const codeBoxOptions = {
        label: 'codebox',
        source: 'print "foo"',
        runtime_name: 'python'
      };
      const triggerOptions = {
        label: 'trigger',
        signal: 'post_create',
        class: 'class',
        codebox: 1
      };
      const syncano = new Syncano({accountKey: globals.tempAccountKey,
                                   baseUrl: 'https://api.syncano.rocks'});

      syncano.instance(globals.tempInstanceName).class().add(classOptions).then((res) => {
        globals.tempClassName = res.name;
      });
      syncano.instance(globals.tempInstanceName).codebox().add(codeBoxOptions).then((res) => {
        globals.tempCodeBoxId = res.id;
      });
      syncano.instance(globals.tempInstanceName).trigger().add(triggerOptions).then((res) => {
        console.log(res);
        globals.tempTriggerLabel = res.label;
      });

      console.log(syncano.instance.class());
      syncano.instance(globals.tempInstanceName).class(globals.tempClassName).dataobject().add({name: 'name'});
    });

    // client.createTempClass(function(result) {
    //   console.log(result);
    // });
    loginPage.navigate();
    // client.pause(5000);

    loginPage.login(globals.tempEmail, globals.tempPass)
      .verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'Test Trigger Traces': (client) => {
    const classesPage = client.page.classesPage();

    classesPage.navigate();
    client.pause(3000, function() {
      console.log(globals);
    });

    client.url(`https://localhost:8080/#/instances/${globals.tempInstanceName}/tasks/trigger/1/traces`);
  }
};
