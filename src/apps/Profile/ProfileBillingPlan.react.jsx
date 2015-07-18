var React             = require('react'),
    Reflux            = require('reflux'),
    Moment            = require('moment'),

    FormMixin         = require('../../mixins/FormMixin'),
    DialogsMixin      = require('../../mixins/DialogsMixin'),

    Store             = require('./ProfileBillingPlanStore'),

    MUI               = require('material-ui'),

    Loading           = require('../../common/Loading/Loading.react.jsx'),

    PlanDialogStore   = require('./ProfileBillingPlanDialogStore'),
    PlanDialogActions = require('./ProfileBillingPlanDialogActions'),
    PlanDialog        = require('./ProfileBillingPlanDialog'),

    Limits            = require('./Limits');

import Actions from './ProfileBillingPlanActions.js';

module.exports = React.createClass({

  displayName: 'ProfileBillingPlan',

  mixins: [
    DialogsMixin,
    Reflux.connect(Store),
    Reflux.connect(PlanDialogStore),
  ],

  componentDidMount: function() {
    Actions.fetch()
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('ProfileBillingPlan::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  getStyles: function() {
    return {
      main: {
        marginTop: 50,
        color: '#4A4A4A',
      },
      mainDesc: {
        fontSize   : '1.3em',
        lineHeight : '1.3em',
      },
      comment: {
        fontSize: '0.9em'
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
  initDialogs: function() {

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

  handleShowPlanDialog: function() {
    console.debug('ProfileBillingPlan::handleShowPlanDialog');
    PlanDialogActions.showDialog();
  },

  handleDeleteSubscription: function() {
    Actions.cancelSubscriptions([this.state.subscriptions._items[1].id]).then(() => {
      Actions.fetch();
    });
  },

  renderSwitchPlan: function() {
    if (!this.state.profile) {
      return;
    }

    if (this.state.profile.subscription.plan === 'builder') {
      return [
        <div>{this.state.profile.subscription.plan}</div>,
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
      ]
    } else if (this.state.profile.subscription.plan === 'paid-commitment') {
      return [
        <div>Production</div>,
        <MUI.Toggle
          key            = "paid-commitment-toggle"
          defaultToggled = {true}
          disabled       = {true}
        />,
        <div style={{marginTop: 10}}>
          <a onClick={this.handleShowFreezeAccountDialog}>Freeze your account</a>
        </div>,
      ]
    }
  },

  renderExplorerButtonLabel: function() {
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

  renderExplorerButton() {
    let styles = this.getStyles();

    if (this.isNewSubscription()) {
      return (
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
      )
    }

    return (
      <div style={styles.explorerButton}>
        <MUI.FlatButton
          label   = {this.renderExplorerButtonLabel() || ''}
          onClick = {this.handleShowPlanDialog}
        />
      </div>
    )
  },

  renderMainDesc: function() {
    let styles = this.getStyles();

    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;

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
          <Limits data={limitsData} />
        </div>
      );
    }
  },

  renderCommment: function() {
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
          <div key='productionComment-subs' >
            <div style={styles.mainDesc}>
              New plan <strong>${total}</strong> (your current plan will
              expire at the end of the month and your new plan will begin on {Moment(subscription.start).format('LL')}):
            </div>
            <Limits data={limitsData} />
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

  render: function() {
    let styles = this.getStyles();

    return (
      <Loading show={this.state.isLoading}>
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
          <div className="col-md-8">
            {this.renderSwitchPlan()}
          </div>
        </div>
        <div className="row">
          <div style={styles.chartHeader}>
            See how it works with your <strong>current usage</strong>
          </div>
        </div>
      </Loading>
    );
  }
});