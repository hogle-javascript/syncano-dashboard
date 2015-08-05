import React from 'react';
import Radium from 'radium';
import _ from 'lodash';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'ChartLegend',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    profile: React.PropTypes.object,
    planCanceled: React.PropTypes.string,
    onPlanDialog: React.PropTypes.func,
    onCancelPlanDialog: React.PropTypes.func
  },

  getInitialState() {
    const profile = this.props.profile;
    const subscription = profile.subscription;

    const apiTotalIndex = _.findIndex(profile.balance, {source: 'API Call'});
    const cbxTotalIndex = _.findIndex(profile.balance, {source: 'CodeBox Executions'});

    const apiTotal = profile.balance[apiTotalIndex].quantity;
    const cbxTotal = profile.balance[cbxTotalIndex].quantity;

    return {
      profile,
      subscription,
      apiTotal,
      cbxTotal,
      pricing: subscription.pricing,
      plan: subscription.plan
    }
  },

  getStyles() {
    let styles = {
      legendSquere: {
        marginTop: 3,
        height: 10,
        width: 10
      },
      legend: {
        fontSize: '1rem'
      }
    };

    return this.mergeStyles(styles, this.props.style);
  },

  renderUsage(factorName) {
    let usage = {
      'api': (parseFloat(this.state.apiTotal) / parseFloat(this.state.pricing.api.included) * 100).toFixed(2),
      'cbx': (parseFloat(this.state.cbxTotal) / parseFloat(this.state.pricing.cbx.included) * 100).toFixed(2)
    };

    return [
      <div className="col-md-5" style={{textAlign: 'right', paddingRight: 0}}>
        <strong>{usage[factorName]}%</strong>
      </div>,
      <div className="col-md-8">of plan usage</div>
    ]
  },

  render() {
    let styles = this.getStyles();

    return (
        <div className="row">

          <div className="col-flex-1">

            <div className="row vp-1-b" style={styles.legend}>
              <div className="col-xs-1">
                <div style={_.extend({}, styles.legendSquere, {background: '#77D8F6'})}/>
              </div>
              <div className="col-flex-1">
                <div className="row">
                  <div className="col-md-8">API calls</div>
                  <div className="col-md-10" style={{textAlign: 'right'}}>
                    <strong>{this.state.apiTotal}</strong>  this month</div>
                  {this.state.plan === 'paid-commitment' ? this.renderUsage('api') : null}
                </div>
              </div>
            </div>
            <div className="row" style={styles.legend}>
              <div className="col-xs-1">
                <div style={_.extend({}, styles.legendSquere, {background: '#FFBC5A'})}/>
              </div>
              <div className="col-flex-1">
                <div className="row">
                  <div className="col-md-8">CodeBox runs</div>
                  <div className="col-md-10" style={{textAlign: 'right'}}>
                    <strong>{this.state.cbxTotal}</strong>  this month</div>
                  {this.state.plan === 'paid-commitment' ? this.renderUsage('cbx') : null}
                </div>
              </div>
            </div>

        </div>
      </div>
    )
  }
}));
