import React from 'react';
import _ from 'lodash';
import {DialogMixin, MousetrapMixin} from '../../mixins/';
import {Dialog, IconButton} from 'material-ui';
import {Loading} from '../';
import DialogSidebar from './DialogSidebar';

export default React.createClass({
  displayName: 'FullPageDialog',

  mixins: [
    DialogMixin,
    MousetrapMixin
  ],

  getDefaultProps() {
    return {
      actions: [],
      contentSize: 'large',
      showCloseButton: true
    };
  },

  componentDidUpdate(prevProps) {
    const {onRequestClose, actions} = this.props;

    if (!prevProps.open && this.props.open) {
      this.bindShortcut('esc', () => {
        onRequestClose();
        return false;
      });

      if (actions.props.handleConfirm) {
        this.bindShortcut('enter', () => {
          actions.props.handleConfirm();
          return false;
        });
      }
    }

    if (prevProps.open && !this.props.open) {
      this.unbindShortcut('esc');
      this.unbindShortcut('enter');
    }
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

  renderCloseButton() {
    const styles = this.getStyles();
    const {onRequestClose} = this.props;

    return (
      <IconButton
        style={styles.closeButton}
        iconStyle={styles.closeButtonIcon}
        onTouchTap={onRequestClose}
        iconClassName="synicon-close"/>
    );
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
      showCloseButton,
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

        {showCloseButton && this.renderCloseButton()}

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
