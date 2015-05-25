jest.dontMock("../Instances.react");

describe("Instances.react", function () {
  it("testing component", function () {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Instances = require('../Instances.react');

    var InstancesView = TestUtils.renderIntoDocument(<Instances />);

    //TestUtils.findRenderedDOMComponentWithTag(InstancesView, <div class="header-title" data-reactid=".0.1.0.0.1.0">Instances</div>
  });
});