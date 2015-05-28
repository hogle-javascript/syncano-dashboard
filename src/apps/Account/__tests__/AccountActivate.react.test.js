jest.dontMock('../AccountActivate.react');
jest.dontMock('../../../utils/ReactRouterContext');
jest.dontMock('object-assign');


describe('AccountActivate.react', function () {
  it('testing component', function () {

    var React               = require('react/addons'),
        TestUtils           = React.addons.TestUtils,
        AccountActivate     = require('../AccountActivate.react'),
        ReactRouterContext  = require('../../../utils/ReactRouterContext'),
        Subject             = ReactRouterContext(AccountActivate, {params: {uid:1, token: 2}}),
        AccountActivateView = TestUtils.renderIntoDocument(<Subject />);

  });
});