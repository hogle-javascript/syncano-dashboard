import React from 'react';
import { Breakpoint } from 'react-responsive-grid';
import { RaisedButton } from 'material-ui';
import PricingPlansPlan from './PricingPlansPlan';
import PlanDialogActions from '../../apps/Profile/ProfileBillingPlanDialogActions';
import axios from 'axios';
import _ from 'lodash';

export default React.createClass({
  displayName: 'PricingPlans',

  getInitialState() {
    return {
      plan: null
    };
  },

  componentWillMount() {
    this.fetchPlans();
  },

  getStyles() {
    return {
      mainContainer: {
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      main: {
        display: 'flex',
        margin: '0 -12px',
        flex: 1
      },
      footer: {
        textAlign: 'center',
        marginTop: 24
      }
    };
  },

  getOptions(field, minPrice, maxPrice) {
    const { plan } = this.state;
    const keyName = {
      apiCalls: 'api',
      scripts: 'cbx'
    };
    const options = _.filter(plan.options[keyName[field]], (value) => _.inRange(value, minPrice, maxPrice));

    return _.map(options, (option) => {
      return _.merge({}, { price: parseInt(option, 10) }, plan.pricing[keyName[field]][option]);
    });
  },

  getFreePlanOptions(field) {
    const options = {
      apiCalls: [{
        price: 0,
        included: 100000
      }],
      scripts: [{
        price: 0,
        included: 10000
      }]
    };

    return options[field];
  },

  handleShowPlanDialog() {
    console.debug('ProfileBillingPlan::handleShowPlanDialog');
    PlanDialogActions.showDialog();
  },

  fetchPlans() {
    const plansUrl = `${SYNCANO_BASE_URL}v1.1/billing/plans/`;

    axios.get(plansUrl).then((response) => {
      this.setState({ plan: response.data.objects[0] });
    });
  },

  render() {
    const styles = this.getStyles();
    const { plan } = this.state;

    if (!plan) {
      return null;
    }

    return (
      <Breakpoint minWidth={1024}>
        <div style={styles.mainContainer}>
          <div style={styles.main}>
            <PricingPlansPlan
              title="Starter"
              price="Free"
              period="for 6 months"
              apiCallsOptions={this.getFreePlanOptions('apiCalls')}
              scriptsOptions={this.getFreePlanOptions('scripts')}
              features={[
                'Full access to all features',
                '15 requests per second',
                '10GB of storage',
                '4 Instances (apps)',
                '2 concurrent Scripts',
                'Unlimited users'
              ]}
            />
            <PricingPlansPlan
              title="Developer"
              period="per month"
              apiCallsOptions={this.getOptions('apiCalls', 0, 41)}
              scriptsOptions={this.getOptions('scripts', 0, 11)}
              features={[
                'Full access to all features',
                '60 requests per second',
                'Unlimited storage',
                '16 Instances (apps)',
                '8 concurrent Scripts',
                'Unlimited users'
              ]}
            />
            <PricingPlansPlan
              title="Business"
              period="per month"
              apiCallsOptions={this.getOptions('apiCalls', 41, 1500)}
              scriptsOptions={this.getOptions('scripts', 0, 1500)}
              features={[
                'Full access to all features',
                '60 requests per second',
                'Unlimited storage',
                '16 Instances (apps)',
                '8 concurrent Scripts',
                'Unlimited users'
              ]}
            />
          </div>
          <footer style={styles.footer}>
            <RaisedButton
              label="Configure your own plan"
              backgroundColor="#FFCC01"
              labelStyle={{ fontWeight: 700, color: '#1D2228' }}
              style={{ height: 44 }}
              onTouchTap={this.handleShowPlanDialog}
            />
          </footer>
        </div>
      </Breakpoint>
    );
  }
});
