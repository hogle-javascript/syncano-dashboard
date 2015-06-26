jest.dontMock("../ProgressBar.react");
jest.dontMock("classnames");

describe("ProgressBar.react", function() {
  it("testing component", function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ProgressBar = require('../ProgressBar.react');

    // Testing visible ProgressBar
    var bar = TestUtils.renderIntoDocument(<ProgressBar visible={true} />);
    var node = React.findDOMNode(bar);

    // That should be div without children
    expect(node.nodeName).toBe('DIV');
    expect(node.children).not.toBe();
    expect(node.className).toBe('progress-bar-group progress-bar-visible');

    // Testing invisible ProgressBar
    var bar = TestUtils.renderIntoDocument(<ProgressBar visible={false} />);
    var node = React.findDOMNode(bar);

    // That should be div without children
    expect(node.nodeName).toBe('DIV');
    expect(node.children).not.toBe();
    expect(node.className).toBe('progress-bar-group');
  });
});
