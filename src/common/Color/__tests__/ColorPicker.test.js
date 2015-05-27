jest.dontMock("../ColorPicker.react");
jest.dontMock("../ColorPickerItem.react");
jest.dontMock("../../Icon/Icon.react");
jest.dontMock("../store");

describe("ColorPicker", function () {
  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    Utils = require('../../../utils/utils');
    ColorPicker = require('../ColorPicker.react');
    ColorStore = require('../store');

    allColors = ColorStore.getAllColors();
  });

  it('checks ColorPicker handleClick', function () {
    var clickBuffer = null;
    handleClick = function () {
      clickBuffer = "Clicked";
    };
    var component = TestUtils.renderIntoDocument(<ColorPicker handleClick={handleClick}/>);
    var node = React.findDOMNode(component);

    // We should be able to click on the any child of the ColorPicker
    var clickableNode = node.children[0];

    // TestUtils.Simulate.click(node);
    TestUtils.Simulate.click(clickableNode);
    expect(clickBuffer).toBe("Clicked");

  });

  it('create ColorPicker without selected color', function () {
    var component = TestUtils.renderIntoDocument(<ColorPicker />);
    var node = React.findDOMNode(component);

    // That should be div with children (length same as number colors in store)
    expect(node.nodeName).toBe('DIV');
    expect(node.children.length).toBe(allColors.length);
    expect(node.className).toBe('color-picker');
  });

  it('create ColorPicker selected color', function () {

    var activeColor = allColors[0];
    var component = TestUtils.renderIntoDocument(<ColorPicker selectedColor={activeColor}/>);
    var node = React.findDOMNode(component);

    // That should be div with children (length same as number colors in store)
    expect(node.nodeName).toBe('DIV');
    expect(node.children.length).toBe(allColors.length);
    expect(node.className).toBe('color-picker');

    // Looking for activeColor in items
    var colorFound = false;
    for (var i = 0; i < node.children.length; i++) {
      if (!colorFound) {
        if (Utils.colorToHex(node.children[i].style.backgroundColor) == activeColor) {
          colorFound = true;
          break;
        }
      }
    }

    // Item with "activeColor" should be there
    expect(colorFound).toBe(true);
  });
});