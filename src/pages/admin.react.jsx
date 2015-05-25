var React = require('react');

var AuthStore = require('../apps/Auth/store');
var Header = require('../apps/Header/Header.react');


module.exports = React.createClass({

  displayName: 'AdminPageWrapper',

  componentWillMount: function () {

    //debugger;
    console.log('Checking Syncano connection');
    var token = AuthStore.getToken();
    if (token) {
      if (!Syncano.getInfo().account.account_key) {
        console.log('Connecting to Syncnao!');
        Syncano.connect(token);
      }
    }
  },

  handleBackClick: function () {
    window.location = "#instances";
  },


  render: function () {
    //var currentInstanceName = "XXX";
    return (
      <div className="instance-view">
        <Header title={this.props.title} handleTabClick={this.handleTabClick}/>
        {this.props.children}
      </div>
    );
  }
});



