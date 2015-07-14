var React                 = require('react'),
    Moment                = require('moment'),
    Radium                = require('radium'),
    Router                = require('react-router'),

    mui                   = require('material-ui'),
    FlatButton            = mui.FlatButton,
    Avatar                = mui.Avatar,
    Card                  = mui.Card,
    CardMedia             = mui.CardMedia,
    CardTitle             = mui.CardTitle,
    CardActions           = mui.CardActions,
    CardText              = mui.CardText,
    CardHeader            = mui.CardHeader,
    IconButton            = mui.IconButton,

    SolutionStar          = require('../../common/SolutionStar/SolutionStar.react');

module.exports = React.createClass({

  displayName: 'SolutionsListItem',

  mixins: [
    Router.State,
    Router.Navigation,
  ],

  getStyles: function() {
    return {
      cardTitleContainer: {
        display: 'flex',
        position: 'relative'
      },
      starContainer: {
        position: 'absolute',
        top: 4,
        right: 4
      },
      cardMedia: {
        height: 198,
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        backgroundImage: 'url(http://lorempixel.com/600/337/nature/)'
      },
      cardTitle: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 20,
        fontWeight: 500,
        lineHeight: '24px',
        height: 48,
        overflow: 'hidden',
        marginBottom: 16,
        paddingRight: 36,
        display: 'block'
        //textOverflow: 'ellipsis',
        //whiteSpace: 'nowrap'
      },
      cardSubtitle: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
        fontWeight: 400,
        lineHeight: '20px',
        height: 60,
        overflow: 'hidden',
        display: 'block'
        //textOverflow: 'ellipsis',
        //whiteSpace: 'nowrap'
      },
      cardTextList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: 12,
        lineHeight: '14px',
        color: 'rgba(0, 0, 0, 0.54)'
      },
      cardFooter: {
        borderTop: '1px solid #ddd',
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      activationsCount: {
        padding: 8,
        margin: '0 auto 0 0'
      }
    }
  },

  handleSeeMoreClick: function() {
    this.transitionTo('solutions-edit', {solutionId: this.props.data.id});
  },

  render: function() {
    var styles          = this.getStyles(),
        item            = this.props.data,
        itemTags        = item.tags.join(', '),
        itemUpdatedDate = Moment(item.updated_at).format('DD.MM.YYYY'),
        itemImageURL    = item.metadata.screenshots ? item.metadata.screenshots[0] : null;

    if (itemImageURL) {
      styles.cardMedia.backgroundImage = 'url(' + itemImageURL + ')';
    }

    return (
      <Card>
        <CardMedia mediaStyle={styles.cardMedia}></CardMedia>
        <div style={styles.cardTitleContainer}>
          <CardTitle title         = {item.label}
                     titleStyle    = {styles.cardTitle}
                     subtitle      = {item.description}
                     subtitleStyle = {styles.cardSubtitle}
          />
          <div style={styles.starContainer}>
            <SolutionStar solution={item} />
          </div>
        </div>
        <CardText>
          <div className="row">
            <div className="col-flex-1" style={{padding: 0}}>
              <ul style={styles.cardTextList}>
                <li>Last Version: 4.1</li>
                <li>Updated: {itemUpdatedDate}</li>
                <li>Tags: {itemTags}</li>
              </ul>
            </div>
            <div className="col-flex-1" style={{padding: 0, display: 'flex', flexDirection: 'row-reverse'}}>
              <Avatar>A</Avatar>
            </div>
          </div>
        </CardText>
        <div style={styles.cardFooter}>
          <CardActions>
            <FlatButton label="SEE MORE" onClick={this.handleSeeMoreClick} />
          </CardActions>
        </div>
      </Card>
    )
  }
});


          //<div style={styles.activationsCount}>
          //  <strong>245 </strong> activations
          //</div>
