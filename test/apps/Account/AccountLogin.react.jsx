import TestUtils from 'react-addons-test-utils';

import ReactRouterContext from '../../utils/ReactRouterContext';
import MUIContext from '../../utils/MUIContext';
import AccountLogin from '../../../src/apps/Account/AccountLogin.react';


describe('AccountLogin', function() {
  it('should render', function() {
    let DomElement = MUIContext(ReactRouterContext(AccountLogin, {})),
        component  = TestUtils.renderIntoDocument(<DomElement />),
        container  = TestUtils.findRenderedDOMComponentWithClass(component, 'account-container');
  });
});