import React from 'react';
import { Breakpoint } from 'react-responsive-grid';
import { FlatButton } from 'material-ui';
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
      container: {
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      heading: {
        textAlign: 'center',
        fontSize: '1.3em'
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
    const { currentPlan, currentPlanLimits } = this.props;

    console.log(currentPlanLimits);

    if (!plan) {
      return null;
    }

    return (
      <Breakpoint minWidth={1024}>
        <div style={styles.container}>
          <div className="row vm-3-b">
            <div
              className="col-flex-1"
              style={styles.heading}
            >
              {currentPlan === 'builder' && <span>Your Current Plan is</span>}
            </div>
            <div
              className="col-flex-1"
              style={styles.heading}
            >
              {_.inRange(currentPlanLimits.api.included, 1000000, 2000000)}
            </div>
            <div
              className="col-flex-1"
              style={styles.heading}
            >
              {_.inRange(currentPlanLimits.api.included, 5000000, 100000000)}
            </div>
          </div>
          <div className="row">
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
              highlighted={currentPlan === 'builder'}
              disabled={currentPlan !== 'builder'}
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
              highlighted={_.inRange(currentPlanLimits.api.included, 1000000, 2000000)}
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
              highlighted={_.inRange(currentPlanLimits.api.included, 5000000, 100000000)}
            />
          </div>
          <footer
            className="row vm-3-t"
            style={styles.footer}
          >
            <div
              className="col-flex-1"
              style={{ textAlign: 'center' }}
            >
              <FlatButton
                label="Configure your own plan"
                style={{ height: 44 }}
                onTouchTap={this.handleShowPlanDialog}
              />
            </div>
          </footer>
        </div>
      </Breakpoint>
    );
  }
});
