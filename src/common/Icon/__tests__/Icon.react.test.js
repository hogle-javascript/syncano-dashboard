jest.dontMock("../Icon.react");

describe("Icon", function () {
  beforeEach(function() {
    React     = require("react/addons");
    TestUtils = React.addons.TestUtils;
    Icon      = require("../Icon.react");

    // Test data
    icon = "warning";
    dummyClick = jest.genMockFn().mockReturnValue("Clicked");
  });

  it("tests rendered rendered icon props, default props and classNames", function() {
    
    // Check if default state is set and className is correct
    var component = TestUtils.renderIntoDocument(<Icon icon={icon} />);
    var node = React.findDOMNode(component);
    expect(component.props.icon).toBe("warning");
    expect(component.props.glowing).toBeFalsy();
    expect(node.className).toBe("");
    
    // Check if className is 'glowing'
    var component = TestUtils.renderIntoDocument(<Icon glowing={true} />);
    var node = React.findDOMNode(component);
    expect(node.className).toBe("glowing");

  });

  it("tests Icon component initial 'style' state and if style", function() {

    // Render component with default props only and test its initial state
    var component = TestUtils.renderIntoDocument(<Icon />);
    expect(component.state.style.width).toBe("20px");
    expect(component.state.style.height).toBe("20px");

    // Render component with defined 'style' props and test if its overwritten
    var component = TestUtils.renderIntoDocument(<Icon style={{width: "30px", heigth: "30px"}} />);
    expect(component.state.style.width).toBe("30px");
    expect(component.state.style.width).toBe("30px");

    // Render component with defined 'style' props and test if its merged
    var component = TestUtils.renderIntoDocument(<Icon style={{fill: "#0091EA"}}/>);
    expect(component.state.style.width).toBe("20px");
    expect(component.state.style.height).toBe("20px");
    expect(component.state.style.fill).toBe("#0091EA");

    // Check if passed 'style' props was applied to node
    var component = TestUtils.renderIntoDocument(<Icon style={{fill: "#0091EA", width: "30px", heigth: "30px"}}/>);
    var node = React.findDOMNode(component);
    expect(node.style.width).toBe("30px");
    expect(node.style.height).toBe("30px");
    expect(node.style.fill).toBe("#0091EA");
  });

  it("tests handleClick method", function() {
    // Simulate onClick event and check if handleClick() method was not called - undefined props
    var component = TestUtils.renderIntoDocument(<Icon />);
    var node = React.findDOMNode(component);
    TestUtils.Simulate.click(node);
    expect(dummyClick).not.toBeCalled();
    expect(dummyClick.mock.calls.length).toBe(0);

    // Simulate onClick event and check if handleClick() method was called
    var component = TestUtils.renderIntoDocument(<Icon handleClick={dummyClick} />);
    var node = React.findDOMNode(component);
    TestUtils.Simulate.click(node);
    expect(dummyClick).toBeCalled();
    expect(dummyClick.mock.calls.length).toBe(1);
    expect(dummyClick()).toBe("Clicked");
  });
});