import React from 'react';
import Dropzone from 'react-dropzone';

import {Styles, FontIcon, Utils} from 'syncano-material-ui';
import {Loading} from 'syncano-components';
import UploadFileButton from './UploadFileButton';

export default React.createClass({
  displayName: 'DropZone',

  getDefaultProps() {
    return {
      disableClick: false
    };
  },

  getStyles() {
    return {
      dropZone: {
        display: 'webkit-flex; display: flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 210,
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Styles.Colors.grey300,
        backgroundColor: Styles.Colors.grey100,
        color: Styles.Colors.grey400,
        ':hover': {
          borderColor: Styles.Colors.blue500,
          backgroundColor: Styles.Colors.blue200,
          color: Styles.Colors.blue500
        }
      },
      dropZoneDescription: {
        lineHeight: '24px',
        maxWidth: 150,
        textAlign: 'center',
        fontSize: '24px'
      },
      uploadIcon: {
        color: Styles.Colors.grey300,
        fontSize: '70px'
      }
    };
  },

  renderUploadButton() {
    if (this.props.withButton) {
      return (
        <UploadFileButton
          getFile={this.props.handleButtonClick}
          uploadButtonLabel={this.props.uploadButtonLabel}/>
      );
    }
  },

  renderDescription() {
    const styles = this.getStyles();

    if (this.props.children) {
      return this.props.children;
    }

    return (
      <div style={styles.dropZoneDescription}>
        <FontIcon
          style={styles.uploadIcon}
          className="synicon-cloud-upload"/>
        <div>
          Drag & Drop to upload
        </div>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={Utils.Styles.mergeStyles({}, this.props.containerStyle)}>
        <Loading show={this.props.isLoading}>
          {this.renderUploadButton()}
          <Dropzone
            multiple={false}
            disableClick={this.props.disableClick}
            onDrop={this.props.onDrop}
            style={Utils.Styles.mergeStyles(styles.dropZone, this.props.styles)}>
            {this.renderDescription()}
          </Dropzone>
        </Loading>
      </div>
    );
  }
});
