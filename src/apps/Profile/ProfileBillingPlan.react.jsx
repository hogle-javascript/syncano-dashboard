import React from 'react';
import Reflux from 'reflux';
import Moment from 'moment';
import MUI from 'material-ui';

import FormMixin from '../../mixins/FormMixin';
import DialogsMixin from '../../mixins/DialogsMixin';

import Store from './ProfileBillingPlanStore';
import Actions from './ProfileBillingPlanActions.js';
import PlanDialogStore from './ProfileBillingPlanDialogStore';
import PlanDialogActions from './ProfileBillingPlanDialogActions';

import Common from '../../common';
import PlanDialog from './ProfileBillingPlanDialog';
import Limits from './Limits';

module.exports = React.createClass({

  displayName: 'ProfileBillingPlan',

  mixins: [
    DialogsMixin,
    Reflux.connect(Store),
    Reflux.connect(PlanDialogStore),
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
        marginTop: 50,
        paddingRight: 50,
        color: '#4A4A4A',
      },
      mainDesc: {
        fontSize   : '1.5rem',
        lineHeight : '1.5rem',
      },
      comment: {
        fontSize: '0.9em',
        paddingLeft: 20,
        paddingRight: 20
      },
      explorerButton: {
        marginTop: 20,
      },
      chartHeader: {
        paddingTop: 50,
        fontSize: '1.5em'
      }
    }
  },

  // Dialogs config
  initDialogs() {

    return [{
      dialog: MUI.Dialog,
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
          <div>{this.state.profile.subscription.plan}</div>
          <MUI.Toggle
            key            = "builder-toggle"
            defaultToggled = {false}
            onToggle       = {this.handlePlanToggle}
          />,
          <div style={{marginTop: 10}}>
            <div>Launching your app?</div>
            <a onClick = {this.handleShowPlanDialog}>Switch to Production</a>
          </div>,
          <div style={{marginTop: 10}}>
            From $25/month
          </div>,
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
      return;
    }
    return (
      <div style={styles.chartHeader}>
        See how it works with your <strong>current usage</strong>
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
              label   = {'Cancel Change'}
              onClick = {this.handleDeleteSubscription}
            />
            <MUI.FlatButton
              style   = {{marginLeft: 15}}
              label   = {'Upgrade'}
              onClick = {this.handleShowPlanDialog}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="row align-middle" style={{FlexDirection: 'column'}}>
        <div style={styles.explorerButton}>
          <MUI.FlatButton
            label   = {this.renderExplorerButtonLabel() || ''}
            onClick = {this.handleShowPlanDialog}
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
        api : { included : '10 000' },
        cbx : { included : '10 000' }
      };
      return (
        <div>
          <div key="builderDesc">
            <div>Your plan: <strong>Builder</strong></div>
            <div>It does not cost you anything but there are limits:</div>
          </div>
          <Limits data={limitsData} />
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
        <span key="builderComment">
          If you exceed your limits you will not be subject to overage - just make sure you're in building mode.
          If we suspect abuse of our terms, we will advise you to switch to a <strong>Production plan</strong>.
        </span>
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
          <div className="row">
            <div classsName="col-md-20" style={{width: 40, height: 20}}>
              <MUI.IconButton
                  className = "synicon-information-outline"

                  iconClassName="synicon-information-outline"
                  iconStyle={{color: MUI.Styles.Colors.blue500}}
                  tooltip="GitHub" />
            </div>

            <div classsName="col-flex-1">
              <div key='productionComment-subs'>
                <div className="row">
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
          <span key="productionComment">
            You can change your plan at any point and get the benefit of <strong>lower unit prices</strong>.
            Your new monthly fixed price will start from next billing period.
          </span>
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