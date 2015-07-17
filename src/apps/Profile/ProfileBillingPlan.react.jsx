var React             = require('react'),
    Reflux            = require('reflux'),

    FormMixin         = require('../../mixins/FormMixin'),
    DialogsMixin      = require('../../mixins/DialogsMixin'),

    Store             = require('./ProfileBillingPlanStore'),

    MUI               = require('material-ui'),

    Loading           = require('../../common/Loading/Loading.react.jsx'),

    PlanDialogStore   = require('./ProfileBillingPlanDialogStore'),
    PlanDialogActions = require('./ProfileBillingPlanDialogActions'),
    PlanDialog        = require('./ProfileBillingPlanDialog');

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
      summary: {
        paddingTop: 20
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
        children: ['Do you really want to freeze your account?']
      }
    }]
  },

  isNewSubscription() {
    return (this.state.subscriptions && this.state.subscriptions.length > 1);
  },

  handlePlanToggle() {
    console.debug('ProfileBillingPlan::handlePlanToggle');
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
          onToggle       = {this.handlePlanToggle}
        />,
        <div style={{marginTop: 10}}>
          <a onClick={this.showDialog.bind(null, 'freezeAccount')}>Freeze your account</a>
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
      return (
        <span key="builderDesc">
          You are on the <strong>Builder</strong> plan. It does not cost you anything but there are limits:
        </span>
      );
    } else if (plan === 'paid-commitment') {

      let subscription = this.state.profile.subscription;
      let commitment = subscription.commitment;
      let pricing    = subscription.pricing;
      let total      = parseInt(commitment.api) + parseInt(commitment.cbx);

      return (
        <div
          key       = "productionDesc-subs"
          className = "col-flex-1">
          <div style={styles.mainDesc}>
            You are on a ${total} Production plan:
          </div>
          <div className="row" style={styles.summary}>
            <div className="col-md-6">
              <div>{pricing.api.included}</div>
              <div>{pricing.cbx.included}</div>
            </div>
            <div className="col-flex-1">
              <div><strong>API calls</strong></div>
              <div><strong>CodeBox runs</strong></div>
            </div>
            <div className="col-md-8" style={{textAlign: 'right'}}>
              <div><strong>+{pricing.api.overage}</strong></div>
              <div><strong>+{pricing.cbx.overage}</strong></div>
            </div>
            <div className="col-md-9">
              <div>each extra call</div>
              <div>each extra run</div>
            </div>
          </div>
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
        return (
          <div key='productionComment-subs' >
            <div style={styles.mainDesc}>
              Your new <strong>${total}</strong> plan will be available from {subscription.start}:
            </div>
            <div className="row" style={styles.summary}>
              <div className="col-md-6">
                <div>{subscription.pricing.api.included}</div>
                <div>{subscription.pricing.cbx.included}</div>
              </div>
              <div className="col-flex-1">
                <div><strong>API calls</strong></div>
                <div><strong>CodeBox runs</strong></div>
              </div>
              <div className="col-md-7" style={{textAlign: 'right'}}>
                <div><strong>+{subscription.pricing.api.overage}</strong></div>
                <div><strong>+{subscription.pricing.cbx.overage}</strong></div>
              </div>
              <div className="col-flex-1">
                <div>each extra call</div>
                <div>each extra run</div>
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