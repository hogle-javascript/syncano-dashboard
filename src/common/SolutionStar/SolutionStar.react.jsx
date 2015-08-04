import React from 'react';
import Radium from 'radium';
import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'SolutionStar',

  getInitialState() {
    return {
      starred_by_me: this.props.solution.starred_by_me || false,
      stars_count: this.props.solution.stars_count || 0
    };
  },

  getStyles() {
    return {
      container: {
        display: '-webkit-flex; display: flex',
        alignItems: 'center'
      },
      icon: {
        color: 'rgba(0, 0, 0, 0.24)'
      },
      starred: {
        color: MUI.Styles.Colors.blue500
      },
      starsCount: {
        fontSize: 13,
        color: MUI.Styles.Colors.grey500
      }
    }
  },

  isStarred() {
    return this.state.starred_by_me;
  },

  handleIconClick(solutionId) {
    let isStarred = this.isStarred();

    this.setState({
      starred_by_me: !this.state.starred_by_me,
      stars_count: isStarred ? this.state.stars_count - 1 : this.state.stars_count + 1
    });

    return isStarred ? this.props.unstar(solutionId) : this.props.star(solutionId);
  },

  render() {
    let styles = this.getStyles();
    let isStarred = this.isStarred();
    let iconStyle = isStarred ? styles.starred : styles.icon;
    let iconClassName = isStarred ? 'synicon-star' : 'synicon-star-outline';

    return (
      <div style={styles.container}>
        <MUI.IconButton
          onClick={this.handleIconClick.bind(null, this.props.solution.id)}
          iconClassName={iconClassName}
          iconStyle={iconStyle}/>

        <div style={styles.starsCount}>
          {this.state.stars_count.toString()}
        </div>
      </div>
    )
  }
}));
