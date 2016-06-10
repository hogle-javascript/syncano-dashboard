import React from 'react';
import {FontIcon} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';

export default React.createClass({
  displayName: 'DialogtitleWithIcon',

  propTypes: {
    iconClassName: React.PropTypes.string.isRequired
  },

  getStyles() {
    return {
      title: {
        fontSize: 25,
        fontWeight: 500
      },
      titleIconContainer: {
        marginRight: 10,
        padding: '7px 7px 1px 7px',
        backgroundColor: Colors.grey50,
        border: '1px solid ' + Colors.grey200,
        borderRadius: '6px'
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div className="vp-3-t hp-3-l">
        <span style={styles.title}>
          <span style={styles.titleIconContainer}>
            <FontIcon className={this.props.iconClassName}/>
          </span>
          {this.props.children}
        </span>
      </div>
    );
  }
});
