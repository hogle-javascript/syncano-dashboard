jest.dontMock("classnames");
jest.dontMock("../UsageBar.react");

describe("UsageBar.react", function() {
  beforeEach(function() {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    Utils = require('../../../utils/utils');
    UsageBar = require('../UsageBar.react');
  });

  it('checks UsageBar settings', function() {

    // Sample data
    var billingProfile = {
      soft_limit: 3000,
      hard_limit: 5000,
      balance: {
        total: 4000
      }
    };

    var component = TestUtils.renderIntoDocument(<UsageBar billingProfile={billingProfile}/>);

    // We want to check if amounts are in place
    var element = TestUtils.scryRenderedDOMComponentsWithClass(component, 'usage-text-amount');

    // First element with class 'usage-text-amount' is total balance, second one is hard limit
    expect(element[0].props.children).toBe('$' + billingProfile.balance.total);
    expect(element[1].props.children).toBe('$' + billingProfile.hard_limit);

  });

});
