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
      actions: []
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
        width: '100%',
        maxWidth: 998
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

  render() {
    let styles = this.getStyles();
    let {children, open, actions, isLoading, onRequestClose, ...other} = this.props;

    return (
      <Dialog
        {...other}
        open={_.isBoolean(open) ? open : this.state.open}
        style={styles.style}
        overlayStyle={styles.overlay}
        contentStyle={Utils.Styles.mergeStyles(styles.content, this.props.contentStyle)}
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
          iconClassName="synicon-close" />

        {children}
        <Loading
          type="linear"
          position="top"
          style={styles.loading}
          show={isLoading} />
      </Dialog>
    );
  }
});
