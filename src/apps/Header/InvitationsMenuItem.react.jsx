var React         = require('react');

//var ServerActions = require('../actions/ServerActions');

var ButtonGroup   = require('../../common/Button/ButtonGroup.react');


module.exports = React.createClass({

  displayName: 'InvitationsMenuItem',

  getDefaultProps: function() {
    return {
      buttons: [{
        type: "flat",
        isDefault: false,
        name: "declined",
        displayName: "Decline"
      },{
        type: "flat",
        isDefault: false,
        name: "accepted",
        displayName: "Accept"
      }]
    }
  },

  handleButtonClick: function(action) {
    //ServerActions.respondToInvitation(action, this.props.invitation);
  },

  render: function() {
    return (
      <div className="invitations-menu-item">
        <div className="invitations-menu-text">
          You're invited by <b>{this.props.invitation.inviter}</b> to the instance <b>{this.props.invitation.instance}</b>.
        </div>
        <ButtonGroup buttons={this.props.buttons} handleClick={this.handleButtonClick} />
      </div>
    );
  }

});