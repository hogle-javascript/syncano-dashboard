import React from 'react';
import _ from 'lodash';
import DialogMixin from '../../mixins/DialogMixin';
import {Dialog, Utils} from 'syncano-material-ui';
import {Loading} from 'syncano-components';

export default React.createClass({
  displayName: 'FullPageDialog',

  mixins: [
    Utils.Styles,
    DialogMixin
  ],

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
        top: 40,
        right: 40,
        fontSize: 40,
        color: '#b8c0c9',
        cursor: 'pointer'
      },
      overlay: {
        background: '#fff'
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

  renderCloseButton() {
    const styles = this.getStyles();
    const {onRequestClose} = this.props;

    return (
      <div
        style={styles.closeButton}
        onClick={onRequestClose}>
        <i className="synicon-close" />
      </div>
    );
  },

  render() {
    let styles = this.getStyles();
    let {children, open, actions, isLoading, ...other} = this.props;

    return (
      <Dialog
        {...other}
        open={_.isBoolean(open) ? open : this.state.open}
        style={styles.style}
        overlayStyle={styles.overlay}
        contentStyle={styles.content}
        actions={actions}
        modal={true}
        autoDetectWindowHeight={false}
        repositionOnUpdate={false}
        titleStyle={styles.title}
        bodyStyle={styles.body}
        actionsContainerStyle={styles.actionsContainer}
        zDepth={0}>
        {this.renderCloseButton()}
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
