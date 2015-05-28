jest.dontMock("../AccountSignup.react");

describe("AccountSignup.react", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var AccountSignup = require('../AccountSignup.react');

    var AccountSignupView = TestUtils.renderIntoDocument(<AccountSignup />);

  });
});