var React    = require('react'),

    mui      = require('material-ui'),
    FontIcon = mui.FontIcon;


module.exports = React.createClass({

  displayName: 'ListItemEmpty',

  getDefaultProps: function(){
    return {
      icon: 'cart',
      text: 'empty',
    }
  },

  render: function() {

    console.log('Rendering EmptyList element');
    return (
      <div className="list-item list-item-empty">
        <div className="card-header">
          <div className="list-item-details card-details">
            <div className="list-item-icon card-icon">
              <FontIcon className={this.props.icon} />
            </div>
            <div className="list-item-text card-text">
              <div className="list-item-title card-title"><span>{this.props.text}</span></div>
              <div className="list-item-description card-description"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
