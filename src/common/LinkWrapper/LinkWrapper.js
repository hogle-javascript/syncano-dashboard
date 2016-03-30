import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {Styles, Utils} from 'syncano-material-ui';

const RadiumLink = Radium(Link);

export default Radium(React.createClass({
  displayName: 'LinkWrapper',

  mixins: [Utils.Styles],

  getStyles() {
    return {
      color: '#444',
      cursor: 'pointer',
      ':hover': {
        color: Styles.Colors.blue400
      }
    };
  },

  render() {
    const {style, children, ...other} = this.props;

    return (
      <RadiumLink
      style={this.mergeStyles(this.getStyles(), style)}
      {...other}>
      {children}
      </RadiumLink>
    );
  }
}));
