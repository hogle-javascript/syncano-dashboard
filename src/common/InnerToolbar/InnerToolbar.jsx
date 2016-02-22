import React from 'react';
import Radium from 'radium';
import {History} from 'react-router';
import Sticky from 'react-stickydiv';

import {Store as SessionStore} from '../../apps/Session';
import {Toolbar, ToolbarGroup, ToolbarTitle, IconButton} from 'syncano-material-ui';

export default Radium(React.createClass({
  displayName: 'InnerToolbar',

  propTypes: {
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      backButtonTooltipPosition: 'bottom-right',
      forceBackFallback: false
    };
  },

  getStyles() {
    return {
      toolbar: {
        background: 'rgba(243,243,243,0.90)',
        padding: '0px 24px 0 24px',
        zIndex: 6
      },
      toolbarRight: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }
    };
  },

  isHistory() {
    return History.length > 1;
  },

  handleBackButtonTouchTap() {
    if (this.isHistory() && !this.props.forceBackFallback) {
      return SessionStore.getRouter().goBack();
    }

    return this.props.backFallback();
  },

  renderBackButton() {
    return (
      <ToolbarGroup style={{paddingRight: 24}}>
        <IconButton
          iconClassName="synicon-arrow-left"
          tooltip={this.props.backButtonTooltip}
          tooltipPosition={this.props.backButtonTooltipPosition}
          onClick={this.handleBackButtonTouchTap}
          touch={true}
          style={{marginTop: 4}}
          iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
      </ToolbarGroup>
    );
  },

  renderTitle(title) {
    return (
      <ToolbarGroup>
        <ToolbarTitle text={title}/>
      </ToolbarGroup>
    );
  },

  renderChildren(children) {
    const styles = this.getStyles();

    return (
      <ToolbarGroup float="right" style={styles.toolbarRight}>
        {children}
      </ToolbarGroup>
    );
  },

  render() {
    const styles = this.getStyles();
    let {children, title, ...other} = this.props;

    return (
      <Sticky offsetTop={50} zIndex={12}>
        <Toolbar style={styles.toolbar}>
          {this.isHistory() || this.props.backFallback ? this.renderBackButton() : null}
          {title ? this.renderTitle(title) : null}
          {children ? this.renderChildren(children) : null}
        </Toolbar>
      </Sticky>
    );
  }
}));
