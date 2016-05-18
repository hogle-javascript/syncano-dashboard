import React from 'react';
import Dropzone from 'react-dropzone';

import {FontIcon, Styles, Utils} from 'syncano-material-ui';
import {Loading} from '../';
import UploadFileButton from './UploadFileButton';

const DropZone = (props) => {
  const dropZoneStyles = {
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
      lineHeight: '36px',
      maxWidth: 350,
      textAlign: 'center',
      fontSize: '24px'
    },
    uploadIcon: {
      color: Styles.Colors.grey300,
      fontSize: '70px'
    }
  };

  const renderUploadButton = () => {
    const {withButton, handleButtonClick, uploadButtonLabel} = props;

    if (withButton) {
      return (
        <UploadFileButton
          getFile={handleButtonClick}
          uploadButtonLabel={uploadButtonLabel}/>
      );
    }
  };

  const renderDescription = () => {
    const {children, certificateType} = props;

    if (children) {
      return children;
    }

    return (
      <div style={dropZoneStyles.dropZoneDescription}>
        <FontIcon
          style={dropZoneStyles.uploadIcon}
          className="synicon-cloud-upload"/>
        <div>
          {`Drag & Drop to upload ${certificateType} certificate`}
        </div>
      </div>
    );
  };

  const {isLoading, disableClick, onDrop, containerStyle, styles} = props;

  return (
    <div style={Utils.Styles.mergeStyles({}, containerStyle)}>
      <Loading show={isLoading}>
        {renderUploadButton()}
        <Dropzone
          multiple={false}
          disableClick={disableClick}
          onDrop={onDrop}
          style={Utils.Styles.mergeStyles(dropZoneStyles.dropZone, styles)}>
          {renderDescription()}
        </Dropzone>
      </Loading>
    </div>
  );
};

DropZone.defaultProps = {disableClick: false};

export default DropZone;
