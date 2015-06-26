jest.dontMock("../Schedules.react");

describe("Schedules.react", function () {
  it("testing component", function () {

    var React         = require('react/addons'),
        TestUtils     = React.addons.TestUtils,
        Schedules     = require('../Schedules.react'),
        SchedulesView = TestUtils.renderIntoDocument(<Schedules />);

  });
});