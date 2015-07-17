var React                 = require('react'),
    Radium                = require('radium'),
    Router                = require('react-router'),

    MUI                   = require('material-ui'),
    SolutionStar          = require('../../common/SolutionStar');

module.exports = React.createClass({

  displayName: 'SolutionsListItem',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  getStyles: function() {
    return {
      cardTitleContainer: {
        display  : '-webkit-flex; display: flex',
        position : 'relative'
      },
      cardTitleRoot: {
        flex       : 1,
        display    : '-webkit-flex; display: flex',
        AlignItems : 'center'
      },
      cardTitle: {
        color      : '#4a4a4a',
        fontSize   : 18,
        lineHeight : '24px',
        height     : 48,
        overflow   : 'hidden',
        display    : 'block'
      },
      cardSubtitle: {
        color      : 'rgba(74, 74, 74, 0.64)',
        fontSize   : 14,
        fontWeight : 400,
        lineHeight : '20px',
        height     : 80,
        overflow   : 'hidden',
        display    : 'block',
        padding    : '0 16px'
      },
      cardTextList: {
        color      : '#9b9b9b',
        display    : '-webkit-flex; display: flex',
        AlignItems : 'center',
        fontSize   : 12, 
        padding    : '4px 0'
      },
      cardTextListIcon: {
        fontSize    : 15,
        marginRight : 8
      },
      cardFooter: {
        borderTop      : '1px solid #ddd',
        padding        : 8,
        display        : '-webkit-flex; display: flex',
        alignItems     : 'center',
        justifyContent : 'space-between'
      },
      cardAvatarContainer: {
        padding : 16
      },
      installIcon: {
        color : MUI.Styles.Colors.blue500
      },
      seeDetailsButton: {
        color         : MUI.Styles.Colors.blue500,
        letterSpacing : 0.5
      }
    }
  },

  handleSeeMoreClick: function(solutionId) {
    this.transitionTo('solutions-edit', {solutionId: solutionId});
  },

  render: function() {
    var styles          = this.getStyles(),
        item            = this.props.data,
        itemTags        = item.tags.join(' ');

    return (
      <MUI.Card>
        <div style={styles.cardTitleContainer}>
          <MUI.CardTitle
            style         = {styles.cardTitleRoot}
            title         = {item.label}
            titleStyle    = {styles.cardTitle}
          />
          <div style={styles.cardAvatarContainer}>
            <MUI.Avatar>A</MUI.Avatar>
          </div>
        </div>
        <MUI.CardText style={styles.cardSubtitle}>
          {item.description}
        </MUI.CardText>
        <MUI.CardText>
          <div style={styles.cardTextList}>
            <MUI.FontIcon
              style     = {styles.cardTextListIcon}
              className = "synicon-tag"
              color     = "rgba(222, 222, 222, 0.54)"
            />
            {itemTags}
          </div>
          <div style={styles.cardTextList}>
            <MUI.FontIcon
              style     = {styles.cardTextListIcon}
              className = "synicon-information-outline"
              color     = "#f5a623"
            />
            devel
          </div>
        </MUI.CardText>
        <div style={styles.cardFooter}>
          <SolutionStar solution={item} />
          <MUI.FlatButton
            label      = "SEE DETAILS"
            labelStyle = {styles.seeDetailsButton}
            onClick    = {this.handleSeeMoreClick.bind(null, item.id)}
          />
          <MUI.IconButton
            iconClassName = "synicon-download"
            iconStyle     = {styles.installIcon}
            onClick       = {this.handleSeeMoreClick.bind(null, item.id)}
            touch         = {true}
          />
        </div>
      </MUI.Card>
    )
  }
});
