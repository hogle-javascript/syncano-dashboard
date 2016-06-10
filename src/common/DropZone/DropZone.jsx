import React from 'react';
import Dropzone from 'react-dropzone';

import {FontIcon} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';
import {Loading} from '../';
import UploadFileButton from './UploadFileButton';

const DropZone = ({
  isLoading,
  disableClick,
  onDrop,
  containerStyle,
  styles,
  withButton,
  handleButtonClick,
  uploadButtonLabel,
  certificateType,
  children
}) => {
  const dropZoneStyles = {
    dropZone: {
      display: 'webkit-flex; display: flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 210,
      width: '100%',
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: Colors.grey300,
      backgroundColor: Colors.grey100,
      color: Colors.grey400,
      ':hover': {
        borderColor: Colors.blue500,
        backgroundColor: Colors.blue200,
        color: Colors.blue500
      }
    },
    dropZoneDescription: {
      lineHeight: '36px',
      maxWidth: 350,
      textAlign: 'center',
      fontSize: '24px'
    },
    uploadIcon: {
      color: Colors.grey300,
      fontSize: '70px'
    }
  };

  const renderUploadButton = () => {
    if (withButton) {
      return (
        <UploadFileButton
          getFile={handleButtonClick}
          uploadButtonLabel={uploadButtonLabel}/>
      );
    }
  };

  const renderDescription = () => {
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

  return (
    <div style={containerStyle}>
      <Loading show={isLoading}>
        {renderUploadButton()}
        <Dropzone
          multiple={false}
          disableClick={disableClick}
          onDrop={onDrop}
          style={{...dropZoneStyles.dropZone, ...styles}}>
          {renderDescription()}
        </Dropzone>
      </Loading>
    </div>
  );
};

DropZone.defaultProps = {disableClick: false};

export default DropZone;
