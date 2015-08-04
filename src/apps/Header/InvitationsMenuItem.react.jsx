import React from 'react';

//import ServerActions from '../actions/ServerActions';

import ButtonGroup from '../../common/Button/ButtonGroup.react';

export default React.createClass({

  displayName: 'InvitationsMenuItem',

  getDefaultProps() {
    return {
      buttons: [{
        type: 'flat',
        isDefault: false,
        name: 'declined',
        displayName: 'Decline'
      }, {
        type: 'flat',
        isDefault: false,
        name: 'accepted',
        displayName: 'Accept'
      }]
    }
  },

  handleButtonClick(action) {
    //ServerActions.respondToInvitation(action, this.props.invitation);
  },

  render() {
    return (
      <div className="invitations-menu-item">
        <div className="invitations-menu-text">
          You're invited by <b>{this.props.invitation.inviter}</b> to the instance
          <b>{this.props.invitation.instance}</b>.
        </div>
        <ButtonGroup
          buttons={this.props.buttons}
          handleClick={this.handleButtonClick}/>
      </div>
    );
  }
});
