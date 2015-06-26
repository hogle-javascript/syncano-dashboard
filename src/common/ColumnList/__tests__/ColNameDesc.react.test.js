jest.dontMock("../ColNameDesc.react");

describe("ColNameDesc", function() {
  it("testing component", function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ColNameDesc = require('../ColNameDesc.react');

    var component = TestUtils.renderIntoDocument(<ColNameDesc name="My Codebox" description="Description of my codebox"/>);
  });
});
