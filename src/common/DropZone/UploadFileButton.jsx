import React from 'react';

import {RaisedButton, FontIcon, Styles} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'UploadFileButton',

  getStyles() {
    return {
      uploadButton: {
        marginBottom: 20,
        fontWeight: 600,
        color: Styles.Colors.grey500
      },
      uploadButtonIcon: {
        color: Styles.Colors.grey500,
        fontSize: 18,
        paddingRight: 8
      }
    };
  },

  handleClickIpnut() {
    this.refs.hiddenInput.click();
  },

  handleOpenFile(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (this.props.getFile) {
        this.props.getFile(file);
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <input
          name="hiddenInput"
          ref="hiddenInput"
          style={{display: 'none', visibility: 'hidden'}}
          type="file"
          onChange={this.handleOpenFile}/>
        <RaisedButton
          style={styles.uploadButton}
          backgroundColor={Styles.Colors.grey200}
          labelColor={Styles.Colors.grey500}
          onTouchTap={this.handleClickIpnut}>
          <div className="row align-center align-middle hp-2-l hp-2-r">
            <FontIcon
              style={styles.uploadButtonIcon}
              className="synicon-cloud-upload"/>
            <div>{this.props.uploadButtonLabel}</div>
          </div>
        </RaisedButton>
      </div>
    );
  }
});
