var React = require('react'),
  Paper = require('material-ui/lib/paper');


module.exports = React.createClass({

  displayName: 'Item',

  //propTypes: {
  //  item: React.PropTypes.object.isRequired,
  //},

  render: function () {

    var style = {
      height: '100px',
      display: 'flex',
      marginBottom: '0px',
      justifyContent: 'center',

    };

    return (
      <Paper className={'row'} style={style} rounded={false}>
        {this.props.children}
      </Paper>
    )


  }
});