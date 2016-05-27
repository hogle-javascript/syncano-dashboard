import React from 'react';
import _ from 'lodash';
import DialogMixin from '../../mixins/DialogMixin';
import {Dialog, IconButton} from 'material-ui';
import {Loading} from '../';
import DialogSidebar from './DialogSidebar';

export default React.createClass({
  displayName: 'FullPageDialog',

  mixins: [DialogMixin],

  getDefaultProps() {
    return {
      actions: [],
      contentSize: 'large'
    };
  },

  getStyles() {
    const {sidebar} = this.props;

    return {
      style: {
        paddingBottom: 16,
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
        zIndex: -1
      },
      content: {
        transform: 'none',
        width: '100%',
        maxWidth: 'none',
        background: 'red'
      },
      title: {
        paddingTop: 0
      },
      body: {
        paddingTop: 35
      },
      actionsContainer: {
        padding: '0 24px',
        margin: 0
      },
      actionsContainerWhenSidebar: {
        paddingLeft: 238 * React.Children.count(sidebar) + 24
      },
      loading: {
        position: 'fixed'
      }
    };
  },

  getContentConfig(size) {
    const config = {
      small: {
        maxWidth: 500
      },
      medium: {
        maxWidth: 840
      },
      large: {
        maxWidth: 998
      }
    };

    return config[size];
  },

  render() {
    const styles = this.getStyles();
    const {
      style,
      titleStyle,
      contentSize,
      contentStyle,
      children,
      open,
      actions,
      isLoading,
      onRequestClose,
      sidebar,
      ...other
    } = this.props;

    return (
      <Dialog
        {...other}
        open={_.isBoolean(open) ? open : this.state.open}
        style={{...styles.style, ...style}}
        overlayStyle={styles.overlay}
        contentClassName="full-page-dialog__content"
        contentStyle={{...styles.content, ...this.getContentConfig(contentSize), contentStyle}}
        actions={actions}
        modal={true}
        autoDetectWindowHeight={false}
        titleStyle={{...styles.title, ...titleStyle}}
        bodyStyle={styles.body}
        actionsContainerStyle={{...styles.actionsContainer, ...(sidebar && styles.actionsContainerWhenSidebar)}}
        onRequestClose={onRequestClose}>
        <IconButton
          style={styles.closeButton}
          iconStyle={styles.closeButtonIcon}
          onTouchTap={onRequestClose}
          iconClassName="synicon-close"/>

        <div className="row">
          {sidebar ? <DialogSidebar>{sidebar}</DialogSidebar> : null}
          <div className="col-flex-1">
            {children}
          </div>
        </div>

        <Loading
          type="linear"
          position="top"
          style={styles.loading}
          show={isLoading}/>
      </Dialog>
    );
  }
});
