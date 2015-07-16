var React            = require('react'),
    Radium           = require('radium'),
    MUI              = require('material-ui'),

    SolutionsActions = require('../../apps/Solutions/SolutionsActions');

module.exports = Radium(React.createClass({

  displayName: 'SolutionStar',

  getStyles: function() {
    return {
      container: {
        display    : '-webkit-flex; display: flex',
        AlignItems : 'center'
      },
      icon: {
        color      : 'rgba(0, 0, 0, 0.24)'
      },
      starred: {
        color      : MUI.Styles.Colors.blue500
      },
      starsCount: {
        fontSize   : 13,
        color      : MUI.Styles.Colors.grey500
      }
    }
  },

  isStarred: function() {
    return this.props.solution.starred_by_me;
  },

  handleIconClick: function(solutionId) {
    var isStarred = this.isStarred();
    return isStarred ? SolutionsActions.unstarSolution(solutionId) : SolutionsActions.starSolution(solutionId);
  },

  render: function() {
    var styles        = this.getStyles(),
        isStarred     = this.isStarred(),
        iconStyle     = isStarred ? styles.starred : styles.icon,
        iconClassName = isStarred ? 'synicon-star' : 'synicon-star-outline';

    return (
      <div style={styles.container}>
        <MUI.IconButton
          onClick       = {this.handleIconClick.bind(null, this.props.solution.id)}
          iconClassName = {iconClassName}
          iconStyle     = {iconStyle}
        />
        <div style={styles.starsCount}>
          {this.props.solution.stars_count.toString()}
        </div>
      </div>
    )
  }
}));
