import React from 'react';
import Reflux from 'reflux';
// import Radium from 'radium';
import Helmet from 'react-helmet';
import _ from 'lodash';

import Store from '../Profile/ProfileBillingPlanStore';
import InstancesActions from '../../apps/Instances/InstancesActions';
import InstancesStore from '../../apps/Instances/InstancesStore';

import { DropDownMenu, MenuItem } from 'material-ui';
import { Container, InnerToolbar, Billing } from '../../common/';
// import HeaderInstancesDropdown from '../../common/Header/HeaderInstancesDropdown';
import Chart from '../Profile/ProfileBillingChart';


export default React.createClass({
  displayName: 'ProfileBillingPlan',

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(InstancesStore, 'instances')

  ],

  getInitialState() {
    return { selectedInstance: 'all' };
  },

  componentDidMount() {
    console.debug('Instance::componentWillMount');

    InstancesActions.fetchInstances();
  },

  handleOnChangeDropdown(event, index, value) {
    this.setState({
      selectedInstance: value
    }, () => {
      Store.refreshData();
    });
  },

  renderInstancesDropdown() {
    const { myInstances } = this.state.instances;
    const emptyItem = (<MenuItem value="all" primaryText="All" />);

    console.error('fodfasdf: ', myInstances);
    const instances = _.map(myInstances, (item) => {
      return (
        <MenuItem value={item.name} primaryText={item.name} />
      );
    });
    instances.unshift(emptyItem);
    // console.error(allitems);
    return instances;
  },

  render() {
    const headingStyle = { fontSize: '1.3em' };
    const { selectedInstance } = this.state;

    return (
      <div>
        <Helmet title="Usage" />
        <InnerToolbar title="Usage">
          <DropDownMenu
            value={selectedInstance}
            onChange={this.handleOnChangeDropdown}
          >
            {this.renderInstancesDropdown()}
          </DropDownMenu>
        </InnerToolbar>
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
});
