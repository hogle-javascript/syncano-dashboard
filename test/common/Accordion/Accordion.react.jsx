import React from 'react/addons';
let { TestUtils } = React.addons;

import Accordion from '../../../src/common/Accordion/Accordion.react';


describe('Accordion', function() {
  it('should render', function() {
    let component  = TestUtils.renderIntoDocument(<Accordion items={[]}/>),
        container  = TestUtils.findRenderedDOMComponentWithClass(component, 'accordion');
  });
});
