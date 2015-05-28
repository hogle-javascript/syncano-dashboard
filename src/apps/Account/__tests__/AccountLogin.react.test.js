jest.dontMock("../AccountLogin.react");

describe("AccountLogin.react", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var AccountLogin = require('../AccountLogin.react');

    var AccountLoginView = TestUtils.renderIntoDocument(<AccountLogin />);

  });
});