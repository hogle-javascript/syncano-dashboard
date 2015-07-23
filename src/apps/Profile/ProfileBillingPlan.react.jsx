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

module.exports = React.createClass({

  displayName: 'ProfileBillingPlan',

  mixins: [
    Mixins.Dialogs,
    Reflux.connect(Store),
    Reflux.connect(PlanDialogStore)
  ],

  componentDidMount() {
    Actions.fetch()
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('ProfileBillingPlan::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
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
        fontSize     : '0.9em',
        paddingLeft  : 20,
        paddingRight : 20
      },
      explorerButton: {
        marginTop : 20
      },
      chartHeader: {
        paddingTop : 50,
        fontSize   : '1.3em'
      }
    }
  },

  // Dialogs config
  initDialogs() {

    return [{
      dialog: Common.Dialog,
      params: {
        key   : 'freezeAccount',
        ref   : 'freezeAccount',
        title : 'Freeze Account',
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Confirm',
            onClick : this.handleFreezeAccount
          }
        ],
        modal: true,
        children: ['Are you sure you want to freeze your account?']
      }
    }]
  },

  isNewSubscription() {
    return (this.state.subscriptions && this.state.subscriptions.length > 1);
  },

  handleShowFreezeAccountDialog() {
    console.debug('ProfileBillingPlan::handlePlanToggle');
    this.showDialog('freezeAccount')
  },

  handleFreezeAccount() {
    Actions.cancelSubscriptions(this.state.subscriptions._items.map((item) => {return item.id})).then(() => {
      Actions.fetch();
    });
  },

  handleShowPlanDialog() {
    console.debug('ProfileBillingPlan::handleShowPlanDialog');
    PlanDialogActions.showDialog();
  },

  handleDeleteSubscription() {
    Actions.cancelSubscriptions([this.state.subscriptions._items[1].id]).then(() => {
      Actions.fetch();
    });
  },

  renderSwitchPlan() {
    if (!this.state.profile) {
      return;
    }

    if (this.state.profile.subscription.plan === 'builder')
      return (
        <div className="row align-middle" style={{FlexDirection: 'column'}}>
          <div>Builder</div>
          <div>
            <MUI.Toggle
              style          = {{marginTop: 10}}
              key            = "builder-toggle"
              defaultToggled = {false}
              onToggle       = {this.handlePlanToggle}
            />
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

    return (
      <div className="row align-middle" style={{FlexDirection: 'column'}}>
        <div>Production</div>
          <div>
            <MUI.Toggle
              style          = {{marginTop: 10}}
              key            = "paid-commitment-toggle"
              defaultToggled = {true}
              disabled       = {true}
            />
          </div>
          <div style={{marginTop: 10}}>
            <a onClick={this.handleShowFreezeAccountDialog}>Freeze your account</a>
          </div>
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

  renderChart() {
    let styles = this.getStyles();
    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;

    if (plan === 'free') {
      <div style={styles.chartHeader}>
        See how it works with your <strong>current usage</strong>
        <Chart />
      </div>
    }
    return (
      <div style={styles.chartHeader}>
        See how it works with your <strong>current usage</strong>
        <Chart />
      </div>
     )
  },

  renderExplorerButton() {
    let styles = this.getStyles();

    if (this.isNewSubscription()) {
      return (
        <div className="row align-middle" style={{FlexDirection: 'column'}}>
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
      <div className="row align-middle" style={{FlexDirection: 'column'}}>
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
        <div className="row align-middle" style={{FlexDirection: 'column'}}>
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

        return (
          <div className="row align-top">
            <div style={{Transform: 'translateY(-14px)'}}>
              <MUI.IconButton
                iconClassName = "synicon-information-outline"
                iconStyle     = {{color: MUI.Styles.Colors.blue500}}
                tooltip       = {`your current plan will expire at the end of
                the month and your new plan will begin on ${Moment(subscription.start).format('LL')})`}
              />
            </div>
            <div classsName="col-flex-1">
              <div key='productionComment-subs'>
                <div>
                  <div style={styles.mainDesc}>
                    New plan <strong>${total}</strong>:
                  </div>
                </div>
                <div style={{marginTop: 20}}>
                  <Limits data={limitsData} />
                </div>
              </div>
            </div>
         </div>
        )
      } else {
        return (
          <div className="row align-middle" style={{FlexDirection: 'column'}}>
            <div key="productionComment" style={{width: '80%'}}>
              You can change your plan at any point and get the benefit of <strong>lower unit prices</strong>.
              Your new monthly fixed price will start from next billing period.
            </div>
          </div>
        );
      }
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <Common.Loading show={this.state.isLoading}>
        {this.getDialogs()}
        <PlanDialog />
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
        <div className="row">
          {this.renderChart()}
        </div>
      </Common.Loading>
    );
  }
});