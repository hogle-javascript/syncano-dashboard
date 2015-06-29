jest.dontMock('../FieldDatetime.react');
jest.dontMock('../../Calendar/Calendar.react');

describe('FieldDatetime.react', function() {
  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    FieldDatetime = require('../FieldDatetime.react');
  });

  it('checks FieldDatetime default props', function() {

    // Rendered component without passed props to test props default values
    var component = TestUtils.renderIntoDocument(<FieldDatetime />);
    var node = React.findDOMNode(component);

    expect(node.children.length).toBe(3);
    expect(component.props.labelText).toBe('Date');
    expect(component.props.dateFormat).toBe('YYYY-MM-DDThh:mm:ss.uuuuuuZ');
    expect(component.props.iconColor).toBe('#0091EA');
    expect(component.props.fieldStyle.width).toBe('100%');
  });

  it('checks text field label text, hint text etc. values', function() {

    // Render component with declared props and check values
    var component = TestUtils.renderIntoDocument(
      <FieldDatetime
         labelText="TestDate"
         dateFormat="YYYY-MM-DD"
         iconColor="#EAEAEA"
         fieldStyle={{width: '80%'}} />);
    expect(component.props.labelText).toBe('TestDate');
    expect(component.props.dateFormat).toBe('YYYY-MM-DD');
    expect(component.props.iconColor).toBe('#EAEAEA');
    expect(component.props.fieldStyle.width).toBe('80%');

    // Check if input field received correct values
    expect(component.refs.input.props.hintText).toBe('YYYY-MM-DD');
    expect(component.refs.input.props.floatingLabelText).toBe('TestDate');
    expect(component.refs.input.props.style.width).toBe('80%');

    // Check if icon received correct color
    expect(component.refs.icon.props.style.fill).toBe('#EAEAEA');
  });

  it('checks if icon\'s handleClick method is called after onClick event', function() {
    var component = TestUtils.renderIntoDocument(<FieldDatetime />);
    var iconNode = React.findDOMNode(component.refs.icon);

    // Check if handleOnClick is defined and onClick event call it
    expect(component.refs.icon.props.handleClick).toBeDefined();
    component.refs.icon.props.handleClick = jest.genMockFn().mockReturnValue('Clicked!');
    TestUtils.Simulate.click(iconNode);
    expect(component.refs.icon.props.handleClick).toBeCalled();
    expect(component.refs.icon.props.handleClick.mock.calls.length).toBe(1);
  });

  it('checks if \'hidden\' state is changed after click on icon and ' +
    'if calendar component receive correct class', function() {
    var component = TestUtils.renderIntoDocument(<FieldDatetime />);
    var nodeIcon = React.findDOMNode(component.refs.icon);
    var nodeCalendarDiv = React.findDOMNode(component.refs.calendar);
    // Default state and className value
    expect(component.state.hidden).toBeTruthy();
    expect(nodeCalendarDiv.className).toBe('calendar-field-visible calendar-field-hidden');

    // Click should change 'hidden' state and add className to component
    TestUtils.Simulate.click(nodeIcon)
    expect(component.state.hidden).toBeFalsy();
    expect(nodeCalendarDiv.className).toBe('calendar-field-visible');

  });
});
