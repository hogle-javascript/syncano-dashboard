jest.dontMock('../AccountPasswordResetConfirm.react');
jest.dontMock('object-assign');


describe('AccountPasswordResetConfirm.react', function () {
  it('testing component', function () {

    var React                           = require('react/addons'),
        TestUtils                       = React.addons.TestUtils,
        AccountPasswordResetConfirm     = require('../AccountPasswordResetConfirm.react'),
        ReactRouterContext              = require('../../../utils/ReactRouterContext'),
        Subject                         = ReactRouterContext(AccountPasswordResetConfirm, {params: {uid:1, token: 2}}),
        AccountPasswordResetConfirmView = TestUtils.renderIntoDocument(<Subject />);
  });
});