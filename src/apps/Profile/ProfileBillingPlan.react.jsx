import React from 'react';
import Reflux from 'reflux';
import Moment from 'moment';

import Mixins from '../../mixins';

import Store from './ProfileBillingPlanStore';
import Actions from './ProfileBillingPlanActions.js';
import PlanDialogStore from './ProfileBillingPlanDialogStore';
import PlanDialogActions from './ProfileBillingPlanDialogActions';

import MUI from 'material-ui';
import Common from '../../common';
import PlanDialog from './ProfileBillingPlanDialog';
import Limits from './Limits';
import Chart from './ProfileBillingChart.react';

export default React.createClass({

  displayName: 'ProfileBillingPlan',

  mixins: [
    React.addons.LinkedStateMixin,
    Mixins.Form,
    Mixins.Dialogs,
    Reflux.connect(Store),
    Reflux.connect(PlanDialogStore)
  ],

  validatorConstraints() {
    return {
      soft_limit: {
        numericality: {
          onlyInteger: true
        }
      },
      hard_limit: {
        equality: {
          attribute: 'soft_limit',
          message: 'Hard limit have to be higher then soft limit',
          comparator: (v1, v2) => {
            return parseInt(v1) > parseInt(v2);
          }
        },
        numericality: {
          onlyInteger: true
        }
      }
    }
  },

  componentDidMount() {
    Actions.fetch()
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('ProfileBillingPlan::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  setupToggles() {
    if (this.refs['builder-toggle'] && this.state.profile.subscription.plan === 'builder') {
      this.refs['builder-toggle'].setToggled(false);
    }
    if (this.refs['paid-commitment-toggle'] && this.state.profile.subscription.plan === 'paid-commitment') {
      this.refs['paid-commitment-toggle'].setToggled(true);
    }
  },

  getStyles() {
    return {
      main: {
        marginTop    : 50,
        paddingRight : 50,
        color        : '#4A4A4A'
      },
      mainDesc: {
        fontSize   : '1.5rem',
        lineHeight : '1.5rem'
      },
      comment: {
        fontSize     : '0.9em'
      },
      explorerButton: {
        marginTop : 20
      },
      chartHeader: {
        paddingTop : 50,
        fontSize   : '1.3em'
      },
      legendSquere: {
        marginTop: 4,
        height: 10,
        width: 10
      },
      legend: {
        fontSize : '0.9rem'
      }
    }
  },

  // Dialogs config
  initDialogs() {

    return [{
      dialog: Common.Dialog,
      params: {
        key   : 'cancelProductionPlan',
        ref   : 'cancelProductionPlan',
        title : 'Cancel Production Plan',
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancelCancelProductionPlan
          },
          {
            text    : 'Confirm',
            onClick : this.handleCancelProductionPlan
          }
        ],
        modal: true,
        children: ['Are you sure you want to cancel Production plan?']
      }
    }]
  },

  isNewSubscription() {
    return (this.state.subscriptions && this.state.subscriptions.length > 1);
  },

  handleCancelCancelProductionPlan() {
    this.setupToggles();
    this.refs.cancelProductionPlan.dismiss();
  },

  handleShowCancelPlanDialog() {
    console.debug('ProfileBillingPlan::handlePlanToggle');
    this.refs['paid-commitment-toggle'].setToggled(false);
    this.showDialog('cancelProductionPlan')
  },

  handleCancelProductionPlan() {
    Actions.cancelSubscriptions(this.state.subscriptions._items.map((item) => {return item.id})).then(() => {
      Actions.fetch();
    });
  },

  handleShowPlanDialog() {
    console.debug('ProfileBillingPlan::handleShowPlanDialog');
    PlanDialogActions.showDialog();
  },

  handleDeleteSubscription() {
    Actions.cancelNewPlan(this.state.subscriptions._items);
  },

  renderSwitchPlan() {
    if (!this.state.profile) {
      return;
    }

    if (this.state.profile.subscription.plan === 'builder')
      return (
        <div className="row align-middle" style={{flexDirection: 'column'}}>
          <div>Builder</div>
          <div>
            <MUI.Toggle
              style          = {{marginTop: 10}}
              ref            = "builder-toggle"
              key            = "builder-toggle"
              onToggle       = {this.handleShowPlanDialog} />
          </div>
          <div style={{marginTop: 10}}>
            <div>Launching your app?</div>
            <a onClick = {this.handleShowPlanDialog}>Switch to Production</a>
          </div>
          <div style={{marginTop: 10, fontSize: '1.1rem', padding: 5}}>
            From <strong>$25</strong>/month
          </div>
          <div style={{marginTop: 10}}>
            <div><a>Learn</a> when to flip the</div>
            <div>switch to production.</div>
          </div>
        </div>
      );
    else if (this.state.profile.subscription.plan === 'free')
      return;

    let renderComment = () => {
      if (Store.isPlanCanceled()) {
        return (
          <div style={{marginTop: 10, textAlign: 'center'}}>
            <div>Your plan will expire on</div>
            <div style={{color: 'red', padding: 3}}>
              {Store.isPlanCanceled()}
            </div>
            <div>Click <a onClick={this.handleShowPlanDialog}> here </a> to extend.</div>
          </div>
        )
      } else {
        return (
          <div style={{marginTop: 10}}>
            <a onClick={this.handleShowCancelPlanDialog}>Cancel Production plan</a>
          </div>
        )
      }
    };

    return (
      <div className="row align-middle" style={{flexDirection: 'column'}}>
        <div>Production</div>
          <div>
            <MUI.Toggle
              style          = {{marginTop: 10}}
              ref            = "paid-commitment-toggle"
              key            = "paid-commitment-toggle"
              defaultToggled = {true}
              onToggle       = {this.handleShowCancelPlanDialog} />
          </div>
          {renderComment()}
      </div>
    )
  },

  renderExplorerButtonLabel() {
    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;

    if (plan === 'builder') {
      return 'Open Plans Explorer';
    } else if (plan === 'paid-commitment') {
      if (this.isNewSubscription()) {
        return 'Change your next commitment';
      }
      return 'Upgrade your plan';
    }
  },

  renderChartLegend() {
    let styles = this.getStyles();

    let subscription = this.state.profile.subscription;
    let plan         = subscription.plan;
    let pricing      = subscription.pricing;

    let apiCallsStyle = _.extend({}, styles.legendSquere, {background: '#77D8F6'});
    let cbxCallsStyle = _.extend({}, styles.legendSquere, {background: '#FFBC5A'});

    let apiTotalIndex = _.findIndex(this.state.profile.balance, {source: 'API Call'});
    let cbxTotalIndex = _.findIndex(this.state.profile.balance, {source: 'CodeBox Executions'});

    let apiTotal = this.state.profile.balance[apiTotalIndex].quantity;
    let cbxTotal = this.state.profile.balance[cbxTotalIndex].quantity;

    let renderUsage = (type) => {
      if (plan === 'paid-commitment') {
        let usage = {
          'api' : parseFloat(apiTotal) / parseFloat(pricing.api.included) * 100,
          'cbx' : parseFloat(cbxTotal) / parseFloat(pricing.cbx.included) * 100,
        };
        return [
          <div className="col-md-5" style={{textAlign: 'right', paddingRight: 0}}>
            <strong>{usage[type].toFixed(2)}%</strong>
          </div>,
          <div className="col-md-8">of plan usage</div>
        ]
      }
    };

    return (
      <div style={{marginTop: 20}}>
        <div className="row">

          <div className="col-md-18">

            <div className="row" style={styles.legend}>
              <div className="col-xs-1" >
                <div style={apiCallsStyle} />
              </div>
              <div className="col-flex-1">
                <div className="row">
                  <div className="col-md-8">API calls</div>
                  <div className="col-md-8">this month: <strong>{apiTotal}</strong></div>
                  {renderUsage('api')}
                </div>
              </div>
            </div>
            <div className="row" style={_.extend({}, {marginTop: 5}, styles.legend)}>
              <div className="col-xs-1">
                <div style={cbxCallsStyle} />
              </div>
              <div className="col-flex-1">
                <div className="row">
                  <div className="col-md-8">CodeBox runs</div>
                  <div className="col-md-8">this month: <strong>{cbxTotal}</strong></div>
                  {renderUsage('cbx')}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  },

  renderChart() {
    let styles = this.getStyles();
    if (!this.state.profile) {
      return;
    }

    return (
      <div style={styles.chartHeader}>
        See how it works with your <strong>current usage</strong>:
        {this.renderChartLegend()}
        <div style={{marginTop: 25}}>
          <Chart />
        </div>
      </div>
    )

  },

  renderExplorerButton() {
    let styles = this.getStyles();

    if (this.isNewSubscription()) {
      return (
        <div className="row align-middle" style={{flexDirection: 'column'}}>
          <div style={styles.explorerButton}>
            <MUI.FlatButton
              primary    = {true}
              label      = {'Cancel Change'}
              onTouchTap = {this.handleDeleteSubscription}
            />
            <MUI.FlatButton
              primary = {true}
              style   = {{marginLeft: 15}}
              label   = {'Upgrade'}
              onTouchTap = {this.handleShowPlanDialog}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="row align-middle" style={{flexDirection: 'column'}}>
        <div style={styles.explorerButton}>
          <MUI.FlatButton
            primary    = {true}
            label      = {this.renderExplorerButtonLabel() || ''}
            onTouchTap = {this.handleShowPlanDialog}
          />
        </div>
      </div>
    )
  },

  renderMainDesc() {
    let styles = this.getStyles();

    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;
    if (plan === 'free') {
      return 'You are on FREE (internal) plan - go away! and test billing using different account!';
    }

    if (plan === 'builder') {
      let limitsData = {
        api : { included : '100 000' },
        cbx : { included : '1 000' }
      };
      return (
        <div className = "col-md-12">
          <div style={styles.mainDesc}>Your plan: <strong>Builder</strong></div>
          <div style={{marginTop: 5}}>It does not cost you anything but there are limits:</div>
          <div style={{marginTop: 20}}>
            <Limits data={limitsData} />
          </div>
        </div>
      );
    } else if (plan === 'paid-commitment') {

      let subscription = this.state.profile.subscription;
      let commitment = subscription.commitment;
      let pricing    = subscription.pricing;
      let total      = parseInt(commitment.api) + parseInt(commitment.cbx);

      let limitsData = {
        api : {
          included : pricing.api.included,
          overage  : pricing.api.overage
        },
        cbx : {
          included : pricing.cbx.included,
          overage  : pricing.api.overage
        }
      };

      return (
        <div
          key       = "productionDesc-subs"
          className = "col-flex-1">
          <div style={styles.mainDesc}>
            Current plan <strong>${total}</strong>:
          </div>
          <div style={{marginTop: 20}}>
            <Limits data={limitsData} />
          </div>
        </div>
      );
    }
  },

  renderCommment() {
    let styles = this.getStyles();

    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;

    if (plan === 'builder') {
      return (
        <div className="row align-middle" style={{flexDirection: 'column'}}>
          <div key="builderComment" style={{width: '80%'}}>
            If you exceed your limits you will not be subject to overage - just make sure you're in building mode.
            If we suspect abuse of our terms, we will advise you to switch to a <strong>Production plan</strong>.
          </div>
        </div>
      );
    } else if (plan === 'paid-commitment') {

      if (this.isNewSubscription()) {
        let subscription = this.state.subscriptions._items[1];
        let total        = parseInt(subscription.commitment.api) + parseInt(subscription.commitment.cbx);

        let limitsData = {
          api : {
            included : subscription.pricing.api.included,
            overage  : subscription.pricing.api.overage
          },
          cbx : {
            included : subscription.pricing.cbx.included,
            overage  : subscription.pricing.api.overage
          }
        };

        let toolTip = (
          <div style={{whiteSpace: 'normal', textAlign: 'left', width: 250}}>
            Your current plan will expire at the end of the month and your new plan
            will begin on {Moment(subscription.start).format('LL')}
          </div>
        );

        return (
          <div className="row align-top">
            <div classsName="col-md-3" style={{transform: 'translateY(-14px)'}}>
              <MUI.IconButton
                iconClassName = "synicon-information-outline"
                iconStyle     = {{color: MUI.Styles.Colors.blue500}}
                tooltip       = {toolTip} />
            </div>
            <div classsName="col-flex-1">

              <div style={styles.mainDesc}>
                New plan <strong>${total}</strong>:
              </div>
              <div style={{marginTop: 20}}>
                <Limits data={limitsData} />
              </div>

            </div>
         </div>
        )
      } else {
        return (
          <div className="row align-middle" style={{flexDirection: 'column'}}>
            <div key="productionComment" style={{width: '80%'}}>
              You can change your plan at any point and get the benefit of <strong>lower unit prices</strong>.
              Your new monthly fixed price will start from next billing period.
            </div>
          </div>
        );
      }
    }
  },

  handlePlanDialogDismiss() {
    this.setupToggles();
    Actions.fetch();
  },

  handleSuccessfullValidation() {
    this.handleAddSubmit();
  },

  handleAddSubmit() {
    Actions.updateBillingProfile({
      hard_limit: this.state.hard_limit,
      soft_limit: this.state.soft_limit
    });
  },

  renderLimitsForm() {
    if (!this.state.profile) {
      return;
    }
    let subscription = this.state.profile.subscription;
    let plan         = subscription.plan;

    if (plan === 'builder' || plan === 'free') {
      return null;
    }

    let toolTip = (
      <div style={{whiteSpace: 'normal', textAlign: 'left', width: 200}}>
        Here you can set limits for your plan. You will be notified after reaching soft limit.
        After reaching hard limit your account will be frozen to avoid additional costs.
      </div>
    );

    return (
      <div className="row align-middle" style={{marginTop: 30, paddingLeft: 30}}>
        <div className="col-md-5">
          <MUI.TextField
            ref               = "soft_limit"
            valueLink         = {this.linkState('soft_limit')}
            errorText         = {this.getValidationMessages('soft_limit').join(' ')}
            name              = "soft_limit"
            className         = "text-field"
            floatingLabelText = "Soft Limit"
            fullWidth         = {true} />
        </div>
        <div className="col-md-5">
          <MUI.TextField
            ref               = "hard_limit"
            valueLink         = {this.linkState('hard_limit')}
            errorText         = {this.getValidationMessages('hard_limit').join(' ')}
            name              = "hard_limit"
            className         = "text-field"
            floatingLabelText = "Hard Limit"
            fullWidth         = {true} />
        </div>
        <div className="col-md-4" style={{paddingRight: 0}}>
          <MUI.FlatButton
            primary    = {true}
            label      = 'Set Limits'
            disabled   = {(!this.state.hard_limit && !this.state.soft_limit)}
            onTouchTap = {this.handleFormValidation} />
        </div>
        <div className="col-md-5" style={{paddingLeft: 0}}>
          <MUI.IconButton
            iconClassName = "synicon-information-outline"
            iconStyle     = {{color: MUI.Styles.Colors.blue500}}
            tooltip       = {toolTip} />
        </div>
     </div>
    )
  },

  render() {
    let styles = this.getStyles();

    return (
      <Common.Loading show={this.state.isLoading}>
        {this.getDialogs()}
        <PlanDialog onDismiss={this.handlePlanDialogDismiss} />
        <div className="row" style={styles.main}>

          {this.renderMainDesc()}

          <div className="col-flex-1">
            <div style={styles.comment}>
              {this.renderCommment()}
            </div>
            {this.renderExplorerButton()}
          </div>
          <div className="col-md-6">
            {this.renderSwitchPlan()}
          </div>
        </div>
        <div>
          {this.renderChart()}
        </div>
        <div>
          {this.renderLimitsForm()}
        </div>
      </Common.Loading>
    );
  }
});