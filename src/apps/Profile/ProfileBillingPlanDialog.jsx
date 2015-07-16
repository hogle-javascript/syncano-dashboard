var React       = require('react'),
    Reflux      = require('reflux'),

    FormMixin   = require('../../mixins/FormMixin'),
    DialogMixin = require('../../mixins/DialogMixin'),

    Store       = require('./ProfileBillingPlanDialogStore'),
    Actions     = require('./ProfileBillingPlanDialogActions'),

    Loading     = require('../../common/Loading/Loading.react.jsx'),

    MUI         = require('material-ui');

module.exports = React.createClass({

  displayName: 'ProfileBillingPlanDialog',

  mixins: [
    FormMixin,
    DialogMixin,

    Reflux.connect(Store),
  ],

  handleDialogShow() {
    console.debug('SolutionInstallDialog::handleDialogShow');
    Actions.fetchBillingPlans()
  },

  handleAddSubmit() {
    console.debug('SolutionInstallDialog::handleAddSubmit');

    Actions.subscribePlan(this.state.plan.name, {
      commitment: JSON.stringify({
        api: this.getInfo('api').total,
        cbx: this.getInfo('cbx').total
      })
    });
  },

  getStyles() {
    return {
      main: {
        marginTop: 50,
        fontColor: '#4A4A4A'
      },
      sectionTopic: {
        fontSize: '1.3em'
      },
      table: {
        marginTop: 20
      },
      tableRow: {
        height: 40,
        textAlign: 'left',
        lineHeight: '40px',
        verticalAlign: 'middle'
      },
      tableColumnSummary: {
        height: 40,
        margin: 1,
        fontSize: '1.1em',
        fontWeight: 'bold',
        textAlign: 'center',
        background: '#F2F2F2',
        verticalAlign: 'middle',
        lineHeight: '40px'
      },
      sectionTotalSummary: {
        marginTop: 35,
        fontSize: '1.4em',
        lineHeight: '1.4em'
      },
      sectionComment: {
        marginTop: 40
      },
    }
  },

  onSliderChange(type, event, value) {
    let newState = {};
    newState[type + 'Selected'] = value;
    this.setState(newState);
  },

  renderSlider(type) {
    if (!this.state.plan) {
      return;
    }
    const defaultValue = 0;
    const options      = this.state.plan.options[type];
    let selected       = this.state[type + 'Selected'];

    return (
      <MUI.Slider
        ref          = {type + 'Slider'}
        style        = {{marginBottom: 0}}
        min          = {0}
        max          = {(options.length - 1) / 10}
        value        = {selected !== undefined ? selected : defaultValue}
        step         = {0.1}
        onChange     = {this.onSliderChange.bind(this, type)}
      />
    )
  },

  handleSliderLabelsClick(value, type) {
    let newState = {};
    newState[type + 'Selected'] = value / 10;
    this.setState(newState);
  },

  renderOptions(type) {
    if (!this.state.plan) {
      return;
    }
    return this.state.plan.options[type].map((option, i) => {
      return (
        <div
          key       = {option}
          className = "col-flex-1"
          onClick   = {this.handleSliderLabelsClick.bind(this, i, type)}
        >
          {option}
        </div>
      )
    });
  },

  getInfo(type) {
    let info = {
      included : 0,
      overage  : 0,
      total    : 0
    }

    if (!this.state.plan) {
      return info;
    }

    let pricing     = this.state.plan.pricing[type];
    let options     = this.state.plan.options[type];
    let sliderValue = this.state[type + 'Selected'];

    if (!sliderValue) {
      info = pricing[Object.keys(pricing)[0]];
      info.total = Object.keys(pricing)[0];
      return info;
    }

    let value = String(parseFloat(sliderValue) * 10);

    info = pricing[options[value]];
    info.total = options[value];
    return info;
  },

  render() {

    let styles              = this.getStyles();
    let apiInfo             = this.getInfo('api');
    let cbxInfo             = this.getInfo('cbx');
    let sum                 = parseInt(apiInfo.total) + parseInt(cbxInfo.total);
    let dialogCustomActions = [
      <MUI.FlatButton
        key        = "cancel"
        label      = "Cancel"
        onTouchTap = {this.handleCancel}
        ref        = "cancel" />,

      <MUI.FlatButton
        key        = "confirm"
        label      = "Confirm"
        primary    = {true}
        onTouchTap = {this.handleFormValidation}
        ref        = "submit" />
    ];

    return (
      <Loading show={this.state.isLoading}>
        <MUI.Dialog
          ref             = "dialog"
          contentStyle    = {{padding: 0}}
          onShow          = {this.handleDialogShow}
          openImmediately = {this.props.openImmediately}
          actions         = {dialogCustomActions}
          onDismiss       = {this.resetDialogState}>
          <div>
            <div style={{fontSize: '1.5em', lineHeight: '1.5em'}}>Choose your plan</div>
            <div style={{color: '#9B9B9B'}}>move the blue bubble to change your plan details</div>
          </div>
          <div style={{paddingTop: 40}}>
            {this.renderFormNotifications()}

            <div className="row">
              <div className="col-md-24">
                <div className="row">
                  <div className="col-flex-1" style={styles.sectionTopic}>API calls</div>
                  <div className="col-flex-1" style={{color: '#9B9B9B', textAlign: 'right'}}>suggestion based on usage: $60</div>
                </div>
                <div>
                  {this.renderSlider('api')}
                </div>
                <div className="row" style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                  {this.renderOptions('api')}
                </div>
              </div>
              <div className="col-md-11" style={{paddingLeft: 35}}>
                <div>
                  <div>Total API calls</div>
                  <div><strong>{apiInfo.included}</strong></div>
                </div>
                <div>
                  <div>Overage Unit Price: API Calls</div>
                  <div><strong>${apiInfo.overage}</strong></div>
                </div>
              </div>
            </div>
            <div className="row" style={{paddingTop: 50}}>
              <div className="col-md-24">
                <div className="row">
                  <div className="col-flex-1" style={styles.sectionTopic}>API calls</div>
                  <div className="col-flex-1" style={{color: '#9B9B9B', textAlign: 'right'}}>suggestion based on usage: $60</div>
                </div>
                <div>
                  {this.renderSlider('cbx')}
                </div>
                <div className="row" style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                  {this.renderOptions('cbx')}
                </div>
              </div>
              <div className="col-md-11" style={{paddingLeft: 35}}>
                <div>
                  <div>Total CodeBox runs</div>
                  <div><strong>{cbxInfo.included}</strong></div>
                </div>
                <div>
                  <div>Overage Unit Price: CodeBox run</div>
                  <div><strong>${cbxInfo.overage}</strong></div>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: 40}}>
              <div className="col-md-24">
                <div style={styles.sectionTopic}>Summary</div>
                  <div style={styles.table}>
                    <div className="row" style={styles.tableRow}>
                      <div className="col-flex-1">API calls</div>
                      <div className="col-md-10" style={styles.tableColumnSummary}>{apiInfo.included}</div>
                      <div className="col-md-10" style={styles.tableColumnSummary}>${apiInfo.total}/Month</div>
                    </div>
                    <div className="row" style={styles.tableRow}>
                      <div className="col-flex-1">CodeBox runs</div>
                      <div className="col-md-10" style={styles.tableColumnSummary}>{cbxInfo.included}</div>
                      <div className="col-md-10" style={styles.tableColumnSummary}>${cbxInfo.total}/Month</div>
                    </div>
                  </div>
                <div style={styles.sectionComment}>
                  The new overage unit price will take effect immediately after purchase and be used
                  in cost calculations for this month. The new monthly price will start from next billing period.
                </div>
              </div>
              <div className="col-md-11" style={{paddingLeft: 35}}>
                <div style={styles.sectionTopic}>Your new plan:</div>
                <div style={styles.sectionTotalSummary}>
                  <div><strong>${sum}</strong>/month</div>
                  <div>+ overage</div>
                </div>
              </div>
            </div>
          </div>
        </MUI.Dialog>
      </Loading>
    );
  }
});