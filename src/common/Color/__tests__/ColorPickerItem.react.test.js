jest.dontMock("../ColorPickerItem.react");
jest.dontMock("../../Icon/Icon.react");
jest.dontMock("../store");

describe("ColorPickerItem.react", function () {
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    Utils = require('../../../utils/utils');
    ColorPickerItem = require('../ColorPickerItem.react');
    ColorStore = require('../store');

    allColors = ColorStore.getAllColors();
  });

  it('checks ColorPickerItem handleClick', function () {
    var clickBuffer = null;
    var handleClick = function () {
      clickBuffer = "Clicked";
    };
    var component = TestUtils.renderIntoDocument(
      <ColorPickerItem
        selected={true} color={allColors[0]}
        handleClick={handleClick}/>);

    var node = React.findDOMNode(component);

    //
    TestUtils.Simulate.click(node);
    expect(clickBuffer).toBe("Clicked");
  });

  it('create ColorPickerItem selected', function () {
    var component = TestUtils.renderIntoDocument(
      <ColorPickerItem
        selected={true}
        color={allColors[0]} />);

    var node = React.findDOMNode(component);
    var nodeColor = node.style.backgroundColor;

    // Checking color
    expect(Utils.colorToHex(nodeColor)).toBe(allColors[0]);

    // There an icon inside this component
    expect(function () {
      TestUtils.findRenderedDOMComponentWithTag(component, "i")
    }).not.toThrow(new Error("Did not find exactly one match for tag:i"));
  });

  it('create ColorPickerItem not selected', function () {
    var component = TestUtils.renderIntoDocument(<ColorPickerItem selected={false} color={allColors[0]}/>);
    var node = React.findDOMNode(component);
    var nodeColor = node.style.backgroundColor;

    // Checking color
    expect(Utils.colorToHex(nodeColor)).toBe(allColors[0]);

    // There should not be any icon inside this component
    expect(function () {
      TestUtils.findRenderedDOMComponentWithTag(component, "i")
    }).toThrow(new Error("Did not find exactly one match for tag:i"));
  });

});