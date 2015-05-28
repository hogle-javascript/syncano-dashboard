jest.dontMock("../Webhooks.react");

describe("Webhooks.react", function () {
  it("testing component", function () {

    var React        = require('react/addons'),
        TestUtils    = React.addons.TestUtils,
        Webhooks     = require('../Webhooks.react'),
        WebhooksView = TestUtils.renderIntoDocument(<Webhooks />);

  });
});