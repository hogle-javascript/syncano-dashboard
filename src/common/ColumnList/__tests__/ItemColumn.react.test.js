jest.dontMock("../ItemColumn.react");
jest.dontMock("material-ui/lib/paper");

describe("ItemColumn", function () {
  it("testing component", function () {

    var React     = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Column    = require('../ItemColumn.react');

    // TODO: attach context with muiTheme to make tests possible
    //var component = TestUtils.renderIntoDocument(
    //    <Column grid="6">
    //      <span><strong>2345</strong></span>
    //    </Column>
    // );

  });
});