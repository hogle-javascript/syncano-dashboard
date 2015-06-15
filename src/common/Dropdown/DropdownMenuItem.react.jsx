var React = require('react');
var classNames = require('classnames');

//var ViewActions = require('../actions/ViewActions');
var Constants = require('../../constants/Constants');

var Icon = require('../Icon/Icon.react');
var Mixins = require('../../mixins/mixins');


module.exports = React.createClass({

  displayName: 'DropdownMenuItem',

  //mixins: [Mixins.dropdownClickMixin],

  propTypes: {
    action: React.PropTypes.object.isRequired,
    handleItemClick: React.PropTypes.func.isRequired,
  },


  handleItemClick: function(e) {
    this.props.handleItemClick(this.props.action);
    e.stopPropagation();
  },


  render: function () {
    //console.log("Action", this.props.action);
    return (
      <div className="dropdown-menu-item clickable" onClick={this.handleItemClick}>{this.props.action.content}</div>
    );
  }
});
