jest.dontMock("../Codeboxes.react");

describe("Codeboxes.react", function () {
  it("testing component", function () {

    var React         = require('react/addons'),
        TestUtils     = React.addons.TestUtils,
        StorageMock   = require('../../../utils/StorageMock');

        Codeboxes     = require('../CodeBoxes.react');
        CodeboxesView = TestUtils.renderIntoDocument(<Codeboxes />);

  });
});