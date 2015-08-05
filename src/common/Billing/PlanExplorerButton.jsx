import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'PlanExplorerButton',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    plan: React.PropTypes.string,
    isNewSubscription: React.PropTypes.bool,
    onDeleteSubscription: React.PropTypes.func,
    onPlanDialog: React.PropTypes.func
  },

  getStyles() {
    let styles = {
    };

    return this.mergeStyles(styles, this.props.style);
  },

  handleDeleteSubscription() {
    this.props.onDeleteSubscription();
  },

  handleShowPlanDialog() {
    this.props.onPlanDialog();
  },

  renderExplorerButtonLabel() {

    if (this.props.plan === 'builder') {
      return 'Open Plans Explorer';
    } else if (this.props.plan  === 'paid-commitment') {
      if (this.props.isNewSubscription) {
        return 'Change your next commitment';
      }
      return 'Upgrade your plan';
    }
  },

  render() {

    let styles = this.getStyles();

    if (this.props.isNewSubscription) {
      return (
        <div className="row" style={{flexDirection: 'column'}}>
          <div style={styles.explorerButton}>
            <MUI.FlatButton
              primary={true}
              label={'Cancel Change'}
              onTouchTap={this.handleDeleteSubscription}
              />
            <MUI.FlatButton
              primary={true}
              style={{marginLeft: 8}}
              label={'Upgrade'}
              onTouchTap={this.handleShowPlanDialog}
              />
          </div>
        </div>
      )
    }

    return (
      <MUI.FlatButton
        primary={true}
        label={this.renderExplorerButtonLabel() || ''}
        onTouchTap={this.handleShowPlanDialog}
        />
    )
  }
}));
