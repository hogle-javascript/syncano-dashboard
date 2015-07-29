import React from 'react';
import Radium from 'radium';
import MUI from 'material-ui';

import SolutionStar from '../SolutionStar';

export default React.createClass({

  displayName: 'SolutionsListItem',

  getStyles() {
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
        borderTop            : '1px solid #ddd',
        padding              : 8,
        display              : '-webkit-flex; display: flex',
        WebkitAlignItems     : 'center',
        alignItems           : 'center',
        WebkitJustifyContent : 'space-between',
        justifyContent       : 'space-between'
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
      },
      tag: {
        color : '#9b9b9b',
        paddingRight : 3
      }
    }
  },

  handleSeeMoreClick(solutionId) {
    console.log("YYY", this.props)
    this.props.onSeeMore(solutionId);
    //this.transitionTo('solutions-edit', {solutionId: solutionId});
  },

  handleInstallClick(solutionId) {
    this.props.onInstall(solutionId);
    //SolutionInstallDialogActions.showDialogWithPreFetch(solutionId);
  },

  handleTagClick(tag) {
    this.props.onTagClick(solutionId);
    //SolutionsActions.selectOneTag.bind(null, tag)
  },

  renderVersion() {
    let styles = this.getStyles();
    let item = this.props.data;
    let name = null;
    let color = null;

    if (item.versions.stable) {
      name = `stable (${item.versions.stable})`;
      color = '#7ED321';
    } else {
      name = `development (${item.versions.devel || 'no versions'})`;
      color = '#f5a623';
    }

    return (
      <div style={styles.cardTextList}>
        <MUI.FontIcon
          style     = {styles.cardTextListIcon}
          className = "synicon-information-outline"
          color     = {color} />
        {name}
      </div>
    )
  },

  renderItemTags() {
    let styles = this.getStyles();
    return this.props.data.tags.map(tag => {
      return (
        <a
          key     = {tag}
          style   = {styles.tag}
          onClick = {this.handleTagClick.bind(null, tag)}>
          {tag}
        </a>
      )
    });
  },

  render() {
    let styles = this.getStyles();
    let item = this.props.data;

    return (
      <MUI.Card>

        <div style={styles.cardTitleContainer}>
          <MUI.CardTitle
            style      = {styles.cardTitleRoot}
            title      = {item.label}
            titleStyle = {styles.cardTitle}
          />
          <div style={styles.cardAvatarContainer}>
            <MUI.Avatar
              size  = {55}
              src   = {item.author ? item.author.avatar_url : null}
            />
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
            {this.renderItemTags()}
          </div>
          {this.renderVersion()}
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
            onClick       = {this.handleInstallClick.bind(null, item.id)}
            touch         = {true}
          />
        </div>

      </MUI.Card>
    )
  }
});
