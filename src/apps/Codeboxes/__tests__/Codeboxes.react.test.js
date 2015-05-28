jest.dontMock("../Codeboxes.react");

describe("Codeboxes.react", function () {
  it("testing component", function () {

    var React         = require('react/addons'),
        TestUtils     = React.addons.TestUtils,
        Codeboxes     = require('../Codeboxes.react'),
        CodeboxesView = TestUtils.renderIntoDocument(<Codeboxes />);

  });
});