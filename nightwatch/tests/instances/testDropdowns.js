import Globals from '../../globals';
import async from 'async';

export default {
  tags: ['dropdowns'],
  after(client) {
    client.end();
  },
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  'Test Select/Delete multiple Classes': (client) => {
    const classesPage = client.page.classesPage();

    client.url(`https://localhost:8080/#/instances/${Globals.instanceName}/classes`);
    classesPage.clickDropdowns('@classesListMenu', 'select');
    classesPage.clickButton('@checkboxSelected');
    client.pause(1000);
  }
};
