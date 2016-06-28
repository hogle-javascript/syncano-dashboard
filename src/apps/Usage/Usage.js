import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import Helmet from 'react-helmet';

import Store from '../Profile/ProfileBillingPlanStore';

import { Container, InnerToolbar, Billing } from '../../common/';
import Chart from '../Profile/ProfileBillingChart';


export default Radium(React.createClass({
  displayName: 'ProfileBillingPlan',

  mixins: [Reflux.connect(Store)],

  render() {
    const headingStyle = { fontSize: '1.3em' };

    return (
      <div>
        <Helmet title="Usage" />
        <InnerToolbar title="Usage" />
        <Container>
          <div className="row vp-2-b">
            <div
              className="col-flex-1 vp-1-b"
              style={headingStyle}
            >
              Usage with your <strong>current plan</strong>:
            </div>
          </div>

          <div className="row vp-3-b">
            <div className="col-flex-1">
              <Billing.ChartLegend {...this.state.chartLegend} />
            </div>
            <div className="col-flex-1"></div>
          </div>
          <Chart />
        </Container>
      </div>
    );
  }
}));
