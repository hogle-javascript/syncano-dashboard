import React from 'react';

import ListItem from './SocialAuthButtonsListItem';
import ListItemDivider from './SocialAuthButtonsListItemDivider';
import {Styles, List} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'SocialAuthButtonsList',

  getDefaultProps() {
    return {
      mode: 'login'
    };
  },

  getStyles() {
    return {
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 24,
      border: `1px solid ${Styles.Colors.blue700}`
    };
  },

  renderSocialButtons() {
    let {networks, mode, onSocialLogin} = this.props;
    let lastListItemIndex = networks.length - 1;
    let buttons = [];

    networks.map((network, index) => {
      buttons.push(
        <ListItem
          key={`network-${network}`}
          network={network}
          mode={mode}
          onTouchTap={() => onSocialLogin(network)} />
      );
      if (index < lastListItemIndex) {
        buttons.push(<ListItemDivider key={`divider-${index}`} />);
      }
    });

    return buttons;
  },

  render() {
    let styles = this.getStyles();

    return (
      <List style={styles}>{this.renderSocialButtons()}</List>
    );
  }
});
