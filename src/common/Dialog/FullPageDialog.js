import React from 'react';
import _ from 'lodash';
import DialogMixin from '../../mixins/DialogMixin';
import {Dialog, IconButton, Utils} from 'syncano-material-ui';
import {Loading} from 'syncano-components';

export default React.createClass({
  displayName: 'FullPageDialog',

  mixins: [DialogMixin],

  getDefaultProps() {
    return {
      actions: [],
      contentWidth: 'large'
    };
  },

  getStyles() {
    return {
      style: {
        padding: '136px 0 0px',
        overflowY: 'auto'
      },
      closeButton: {
        position: 'fixed',
        top: 20,
        right: 20,
        width: 64,
        height: 64
      },
      closeButtonIcon: {
        fontSize: 40,
        color: '#b8c0c9'
      },
      overlay: {
        background: '#fff',
        zIndex: 0
      },
      content: {
        transform: 'none',
        width: '100%'
      },
      title: {
        paddingTop: 0
      },
      body: {
        paddingTop: 35
      },
      actionsContainer: {
        padding: '0 24px'
      },
      loading: {
        position: 'fixed'
      }
    };
  },

  getContentSize(width) {
    const contentSizes = {
      small: {
        paddingTop: 120,
        maxWidth: 500
      },
      medium: {
        maxWidth: 840
      },
      large: {
        maxWidth: 998
      }
    };

    return contentSizes[width];
  },

  render() {
    const styles = this.getStyles();
    const {contentSize, contentStyle, children, open, actions, isLoading, onRequestClose, ...other} = this.props;

    return (
      <Dialog
        {...other}
        open={_.isBoolean(open) ? open : this.state.open}
        style={styles.style}
        overlayStyle={styles.overlay}
        contentStyle={Utils.Styles.mergeStyles(styles.content, this.getContentSize(contentSize), contentStyle)}
        actions={actions}
        modal={true}
        autoDetectWindowHeight={false}
        repositionOnUpdate={false}
        titleStyle={styles.title}
        bodyStyle={styles.body}
        actionsContainerStyle={styles.actionsContainer}
        onRequestClose={onRequestClose}
        zDepth={0}>

        <IconButton
          style={styles.closeButton}
          iconStyle={styles.closeButtonIcon}
          onTouchTap={onRequestClose}
          iconClassName="synicon-close"/>

        {children}
        <Loading
          type="linear"
          position="top"
          style={styles.loading}
          show={isLoading}/>
      </Dialog>
    );
  }
});
