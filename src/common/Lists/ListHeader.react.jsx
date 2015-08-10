let React = require('react');
let Radium = require('radium');

export default Radium(React.createClass({

  displayName: 'ListHeader',

  propTypes: {
    topic: React.PropTypes.string
  },

  render() {

    let headerStyle = {
      root: {
        'display': 'flex',
        'justify-content': 'flex-end',
        'margin-bottom': '25px',
        'font-size': '16px',
        'line-height': '1em',
        'color': '#929292'
      },
      'dropdown': {
        'display': 'flex',
        'padding': '0 10px 0 5px',
        'justify-content': 'flex-end',
        'flex': '1'
      }
    };

    return (
      <div style={headerStyle.root}>
        <span>{this.props.topic}</span>

        <div style={headerStyle.dropdown}>
          {this.props.children}
        </div>
      </div>
    )
  }

}));
