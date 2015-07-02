import React from "react/addons";
let { TestUtils } = React.addons;

import ReactRouterContext from "../src/utils/ReactRouterContext";
import MUIContext from "../src/utils/MUIContext";
import AccountLogin from "../src/apps/Account/AccountLogin.react";


describe("AccountLogin Component", function() {
  it("should render", function() {
    let DomElement = MUIContext(ReactRouterContext(AccountLogin, {})),
        component  = TestUtils.renderIntoDocument(<DomElement />),
        container  = TestUtils.findRenderedDOMComponentWithClass(component, 'account-container');
  });
});