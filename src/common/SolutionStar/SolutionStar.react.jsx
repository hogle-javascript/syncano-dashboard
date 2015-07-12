var React            = require('react'),
    Reflux           = require('reflux'),
    Radium           = require('radium'),
    mui              = require('material-ui'),

    Colors           = mui.Styles.Colors,

    SolutionsActions = require('../../apps/Solutions/SolutionsActions'),
    SolutionsStore   = require('../../apps/Solutions/SolutionsStore'),

    IconButton       = mui.IconButton;


module.exports = Radium(React.createClass({

  displayName: 'SolutionStar',

  mixins: [
    Reflux.connect(SolutionsStore)
  ],

  getInitialState: function() {
    return {
      solution: {}
    }
  },

  componentDidMount: function() {
    this.setState({solution: this.props.solution});
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({solution : nextProps.solution})
  },

  getStyles: function() {
    return {
      root: {
        color: 'rgba(0, 0, 0, 0.24)'
      },
      starred: {
        color: Colors.blue500
      }
    }
  },

  isStarred: function() {
    return this.state.solution.starred_by_me;
  },

  handleIconClick: function() {
    if (this.isStarred()) {
      SolutionsActions.unstarSolution(this.props.solution.id);
    } else {
      SolutionsActions.starSolution(this.props.solution.id);
    }
  },

  render: function() {
    var styles        = this.getStyles(),
        iconStyle     = styles.root,
        iconClassName = 'synicon-star-outline';

    if (this.isStarred()) {
      iconClassName = 'synicon-star';
      iconStyle     = styles.starred;
    }

    return (
      <div className='row' style={{width: 120}}>
        <div className='col-flex-1' style={{marginTop: 17, textAlign: 'right'}}>
          {this.props.solution.stars_count.toString()}
        </div>
        <div className='col-xs-15' style={{paddingRight: 0}}>
        <IconButton
          onClick       = {this.handleIconClick}
          iconClassName = {iconClassName}
          iconStyle     = {iconStyle} />
        </div>
      </div>
    )
  }
}));
