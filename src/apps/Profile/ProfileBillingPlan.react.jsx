var React             = require('react'),
    Reflux            = require('reflux'),

    FormMixin         = require('../../mixins/FormMixin'),

    Store             = require('./ProfileBillingPlanStore'),
    Actions           = require('./ProfileBillingPlanActions'),

    Loading           = require('../../common/Loading/Loading.react.jsx'),

    MUI               = require('material-ui'),

    PlanDialogStore   = require('./ProfileBillingPlanDialogStore'),
    PlanDialogActions = require('./ProfileBillingPlanDialogActions'),
    PlanDialog        = require('./ProfileBillingPlanDialog');

module.exports = React.createClass({

  displayName: 'ProfileBillingDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.connect(PlanDialogStore),
  ],

  componentDidMount: function() {
    Actions.fetch()
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
        marginTop: 30
      },
      chartHeader: {
        paddingTop: 50,
        fontSize: '1.5em'
      }
    }
  },

  handleShowPlanDialog: function() {
    console.debug('ProfileBillingDialog::handleShowPlanDialog');
    PlanDialogActions.showDialog();
  },

  renderSwitchPlan: function() {
    if (!this.state.profile) {
      return;
    }

    if (this.state.profile.subscription.plan === 'builder') {
      return [
        <div>{this.state.profile.subscription.plan}</div>,
        <MUI.Toggle defaultToggled={false}/>,
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
    } else if (this.state.profile.subscription.plan === 'production') {
      return [
        <div>{this.state.profile.subscription.plan}</div>,
        <MUI.Toggle defaultToggled={true}/>,
        <div style={{marginTop: 10}}>
          <a>Freeze your account</a>
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
    } else if (plan === 'production') {
      return 'Upgrade your plan';
    }
  },

  renderMainDesc: function() {
    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;

    if (plan === 'builder') {
      return (
        <span>
          You are on the <strong>Builder</strong> plan. It does not cost you anything but there are limits:
        </span>
      );
    } else if (plan === 'production') {
      return (
        <span>
          You are on a $25 Production plan:
        </span>
      );
    }
  },

  renderCommment: function() {
    if (!this.state.profile) {
      return;
    }

    let plan = this.state.profile.subscription.plan;

    if (plan === 'builder') {
      return (
        <span>
          If you exceed your limits you will not be subject to overage - just make sure you're in building mode.
          If we suspect abuse of our terms, we will advise you to switch to a <strong>Production plan</strong>.
        </span>
      );
    } else if (plan === 'production') {
      return (
        <span>
          You can change your plan at any point and get the benefit of <strong>lower unit prices</strong> immediately.
          Your new monthly fixed price will start from next billing period.
        </span>
      );
    }
  },

  render: function() {
    let styles = this.getStyles();

    return (
      <Loading show={this.state.isLoading}>
        <PlanDialog />
        <div className="row" style={styles.main}>
          <div className="col-flex-1">
            <div style={styles.mainDesc}>
              {this.renderMainDesc()}
            </div>
            <div className="row" style={styles.summary}>
              <div className="col-md-10">
                <div>1300000</div>
                <div>50000</div>
              </div>
              <div className="col-flex-1">
                <div><strong>API calls</strong></div>
                <div><strong>CodeBox runs</strong></div>
              </div>
            </div>
          </div>
          <div className="col-flex-1">
            <div style={styles.comment}>
              {this.renderCommment()}
            </div>
            <div style={styles.explorerButton}>
              <MUI.FlatButton
                label   = {this.renderExplorerButtonLabel()}
                onClick = {this.handleShowPlanDialog}
              />
            </div>
          </div>
          <div className="col-md-10">
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