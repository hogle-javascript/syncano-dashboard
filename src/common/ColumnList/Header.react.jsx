let React = require('react');
let Radium = require('radium');


export default Radium(React.createClass({

  displayName: 'Header',

  render() {

    let headerStyle = {
      root: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 14,
        lineHeight: '24px',
        color: 'rgba(0,0,0,.54)',
        marginBottom: 16
      }
    };

    return (
      <div style={headerStyle.root}>
        {this.props.children}
      </div>
    )
  }

}));
