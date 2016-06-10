import React from 'react';
import Radium from 'radium';
import {FlatButton} from 'material-ui';

export default Radium(React.createClass({
  displayName: 'PlanExplorerButton',

  propTypes: {
    plan: React.PropTypes.string,
    isNewSubscription: React.PropTypes.bool,
    onDeleteSubscription: React.PropTypes.func,
    onPlanDialog: React.PropTypes.func
  },

  renderExplorerButtonLabel() {
    const {plan, isNewSubscription} = this.props;

    if (plan === 'builder') {
      return 'Open Plans Explorer';
    } else if (plan === 'paid-commitment') {
      if (isNewSubscription) {
        return 'Change your next commitment';
      }
      return 'Upgrade your plan';
    }
  },

  render() {
    const {style, isNewSubscription, onDeleteSubscription, onPlanDialog} = this.props;

    if (isNewSubscription) {
      return (
        <div className="row" style={{flexDirection: 'column'}}>
          <div style={style.explorerButton}>
            <FlatButton
              primary={true}
              label={'Cancel Change'}
              onTouchTap={onDeleteSubscription} />
            <FlatButton
              primary={true}
              style={{marginLeft: 8}}
              label={'Upgrade'}
              onTouchTap={onPlanDialog} />
          </div>
        </div>
      );
    }

    return (
      <FlatButton
        primary={true}
        label={this.renderExplorerButtonLabel() || ''}
        onTouchTap={this.handleShowPlanDialog} />
    );
  }
}));
