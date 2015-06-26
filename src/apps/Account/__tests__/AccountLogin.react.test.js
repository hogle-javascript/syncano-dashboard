jest.dontMock('../../../lib/syncano4');
jest.dontMock('../AccountLogin.react');
jest.dontMock('../AuthStore');
jest.dontMock('../AuthActions');

require('../../../utils/StorageMock');

describe('AccountLogin.react', function () {
  it('testing component', function () {

    var React        = require('react/addons'),
        TestUtils    = React.addons.TestUtils;
        // AccountLogin = require('../AccountLogin.react');

    // var AccountLoginView = TestUtils.renderIntoDocument(<AccountLogin />);

  });
});