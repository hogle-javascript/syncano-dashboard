import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'SwitchSection',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    plan: React.PropTypes.string,
    planCanceled: React.PropTypes.string,
    onPlanDialog: React.PropTypes.func,
    onCancelPlanDialog: React.PropTypes.func
  },

  getStyles() {
    return {
      leftSide: {
        marginRight: 8,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center'
      },
      center: {
        width: 44,
        position: 'relative'
      },
      toggle: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
      },
      rightSide: {
        marginLeft: 16,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center'
      }
    }
  },

  handleCancelPlanDialog() {
    this.props.onCancelPlanDialog();
  },

  handlePlanDialog() {
    this.setToggled(true);
    this.props.onPlanDialog()
  },

  setToggled(value) {
    this.refs.toggle.setToggled(value);
  },

  renderLeftSide() {
    if (this.props.plan === 'builder') {
      return (
        <div style={{textAlign: 'right'}}>
          <div style={{fontSize: '1.1rem', lineHeight: '1.1rem'}}><strong>Builder</strong></div>
          <div>We pick your bill</div>
        </div>
      )
    }

    if (this.props.planCanceled) {
      return (
        <div style={{textAlign: 'right'}}>
          <div>
            Your plan will expire on <span style={{color: 'red'}}>{this.props.planCanceled}</span>
          </div>

          <div>Click <a onClick={this.handlePlanDialog}> here </a> to extend.</div>
        </div>
      )
    }
    return (
      <div>
        <a onClick={this.handleCancelPlanDialog}>Cancel Production plan</a>
      </div>
    );
  },

  renderRightSide() {
    if (this.props.plan === 'builder') {
      return (
        <div>
          <div style={{marginTop: 0, fontSize: '1.1rem', lineHeight: '1.1rem', padding: 0}}>
            From <strong>$25</strong>/month
          </div>
          <div style={{marginTop: 0}}>
            <a onClick={this.handlePlanDialog}>Switch to Production</a>
          </div>
        </div>
      )
    }
    return (
      <div>
        Production
      </div>
    )
  },

  renderToggle() {
    let toggleHandler = this.handleCancelPlanDialog;
    let defaultToggled = true;

    if (this.props.plan === 'builder') {
      toggleHandler = this.props.onPlanDialog;
      defaultToggled = false;
    }

    if (this.props.planCanceled) {
      defaultToggled = false;
      toggleHandler = this.props.onPlanDialog;
    }

    return (
      <MUI.Toggle
        ref="toggle"
        defaultToggled={defaultToggled}
        onToggle={toggleHandler}/>
    )
  },

  render() {
    let styles = this.getStyles();

    return (
      <div className="row align-center vp-3-t vp-3-b">
        <div style={styles.leftSide}>
          <div>
            {this.renderLeftSide()}
          </div>
        </div>
        <div style={styles.center}>
          <div style={styles.toggle}>
            {this.renderToggle()}
          </div>
        </div>
        <div style={styles.rightSide}>
          {this.renderRightSide()}
        </div>
      </div>
    )
  }
}));
