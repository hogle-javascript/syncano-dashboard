jest.dontMock("../Item.react");
jest.dontMock("../ItemColumn.react");
jest.dontMock("material-ui/lib/paper");

describe("Item", function() {
  it("testing component", function() {

    var React     = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Item      = require('../Item.react');
    var Column    = require('../ItemColumn.react');

    // TODO: attach context with muiTheme to make tests possible
    //var component = TestUtils.renderIntoDocument(
    //  <Item key="1">
    //    <Column grid="6">
    //      <span><strong>2345</strong></span>
    //    </Column>
    //    <Column grid="6">
    //      <span><strong>2345</strong></span>
    //    </Column>
    //  </Item>);

  });
});
