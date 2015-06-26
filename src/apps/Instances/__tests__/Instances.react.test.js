jest.dontMock('../Instances.react');
jest.dontMock('../../Session/Connection');
jest.dontMock('../../Session/SessionStore');
jest.dontMock('../../../lib/syncano4/lib/syncano4');

describe('Instances.react', function() {
  it('testing component', function() {

    var React = require('react/addons'),
        TestUtils = React.addons.TestUtils;
    // StorageMock   = require('../../../utils/StorageMock'),
    // ConsoleMock   = require('../../../utils/ConsoleMock'),

    // Instances = require('../Instances.react');

    //var InstancesView = TestUtils.renderIntoDocument(<Instances />);
    //TestUtils.findRenderedDOMComponentWithTag(InstancesView, <div class="header-title" data-reactid=".0.1.0.0.1.0">Instances</div>
  });
});
