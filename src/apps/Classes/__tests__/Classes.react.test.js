jest.dontMock("../Classes.react");

describe("Classes.react", function () {
  it("testing component", function () {

    var React       = require('react/addons'),
        TestUtils   = React.addons.TestUtils,
        Classes     = require('../Classes.react'),
        ClassesView = TestUtils.renderIntoDocument(<Classes />);

  });
});