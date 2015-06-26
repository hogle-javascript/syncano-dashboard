jest.dontMock("../../Session/Connection");
jest.dontMock("../../Account/Hello");
jest.dontMock("../CodeBoxes.react");
jest.dontMock("../CodeBoxesStore");
jest.dontMock("request");
jest.dontMock('react-router');
jest.dontMock('hellojs');

describe("CodeBoxes.react", function () {
  it("testing component", function () {

    var React         = require('react/addons'),
        TestUtils     = React.addons.TestUtils,
        StorageMock   = require('../../../utils/StorageMock'),
        ConsoleMock   = require('../../../utils/ConsoleMock');
        // Codeboxes     = require('../CodeBoxes.react');
        //CodeboxesView = TestUtils.renderIntoDocument(<Codeboxes />);

  });
});
