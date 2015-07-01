var React                 = require('react'),
    Moment                = require('moment'),
    Radium                = require('radium'),

    mui                   = require('material-ui'),
    FlatButton            = mui.FlatButton,
    Card                  = mui.Card,
    CardMedia             = mui.CardMedia,
    CardTitle             = mui.CardTitle,
    CardActions           = mui.CardActions,
    CardText              = mui.CardText,
    CardHeader            = mui.CardHeader,
    IconButton            = mui.IconButton;

module.exports = React.createClass({

  displayName: 'SolutionsListItem',

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
      star: {
        color: 'rgba(0, 0, 0, 0.24)'
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

  render: function() {
    var styles = this.getStyles(),
        item = this.props.data,
        itemTags = item.tags.join(', '),
        itemUpdatedDate = Moment(item.updated_at).format('DD.MM.YYYY'),
        itemImageURL = item.metadata.screenshots ? item.metadata.screenshots[0] : null;

    if (itemImageURL) {
      styles.cardMedia.backgroundImage = 'url(' + itemImageURL + ')';
    }

    console.log(styles.star);

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
            <IconButton
              iconClassName = "synicon-star-outline"
              iconStyle     = {styles.star}
            />
          </div>
        </div>
        <CardText>
          <ul style={styles.cardTextList}>
            <li>Version: 4.1</li>
            <li>Updated: {itemUpdatedDate}</li>
            <li>Tags: {itemTags}</li>
          </ul>
        </CardText>
        <div style={styles.cardFooter}>
          <div style={styles.activationsCount}>
            <strong>245 </strong> activations
          </div>
          <CardActions>
            <FlatButton label="SEE MORE"/>
          </CardActions>
        </div>
      </Card>
    )
  }
});
