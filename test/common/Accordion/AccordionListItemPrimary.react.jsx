import React from 'react/addons';
let { TestUtils } = React.addons;

import AccordionListItemPrimary from '../../../src/common/Accordion/AccordionListItemPrimary.react';

describe('AccordionListItemPrimary', function() {
  it('should render', function() {
    let component  = TestUtils.renderIntoDocument(<AccordionListItemPrimary item={{id: ''}}/>),
        container  = TestUtils.findRenderedDOMComponentWithClass(component, 'accordion-list-item');
  });
});
