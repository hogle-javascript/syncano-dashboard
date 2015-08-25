import React from 'react';
import gravatar from 'gravatar';

import MUI from 'material-ui';
import ArrowDropRight from 'material-ui/lib/svg-icons/navigation-arrow-drop-right';
import MenuNew from 'material-ui/lib/menus/menu';
import MenuItemNew from 'material-ui/lib/menus/menu-item';
import Common from '../common';

let ThemeManager = new MUI.Styles.ThemeManager();
let Colors = MUI.Styles.Colors;

import './Examples.css';

export default React.createClass({

  displayName: 'Examples',

  getInitialState() {
    return {
      errorText: null
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    ThemeManager.setPalette({
      primary1Color: Colors.blueA700,
      primary2Color: Colors.lightBlueA700,
      primary3Color: Colors.cyanA700,
      accent1Color: Colors.pink500
      // accent1Color: Colors.pinkA200,
      // accent2Color: Colors.pinkA400,
      // accent3Color: Colors.pinkA100,
      // textColor: Colors.darkBlack,
      // canvasColor: Colors.white,
      // borderColor: Colors.grey300,
      // disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    });
  },

  getDefaultProps() {
  },

  componentDidMount() {
  },

  dummyDisplayError(e) {
    if (e.target.value.length > 5) {
      this.setState({
        errorText: '(DummyError) This field is 5 chars only'
      })
    } else {
      this.setState({
        errorText: null
      })
    }
  },

  getDateNow() {
    let date = new Date();

    return date;
  },

  getDateFormat(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return day + '-' + month + '-' + year;
  },

  logDate() {
    console.debug(this.refs.modifiedDatePicker.getDate())
  },

  logTime() {
    console.debug(this.refs.modifiedTimePicker.getTime());
  },

  getMinDate(minYear) {
    let date = new Date();

    date.setFullYear(minYear);
    return date;
  },

  getMaxDate(maxYear) {
    return new Date().setFullYear(maxYear);
  },

  render() {
    let dummyClick = (action) => {
      console.log('Click!', action);
    };

    let item = {
      name: 'Dummy name',
      description: 'Very long dummy description',
      metadata: {color: 'blue', icon: 'google'}
    };

    let source =
      `import os
       import requests

       print 'hello world!`;

    let runtime = 'python';

    let fabButtons = [
      {
        name: 'menuButton',
        label: 'Menu button dummy label',
        icon: 'menu',
        color: '#FFC52D'
      },
      {
        name: 'plusButton',
        label: 'Plus button dummy label',
        icon: 'plus',
        color: 'red'
      }
    ];

    let handleSnackbarClick = () => {
      this.refs.snackbar.show()
    };

    let handleSnackbarAction = () => {
      console.log('Bum!');
    };

    let dialogStandardActions = [
      {text: 'Cancel'},
      {text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit'}
    ];

    let modalState = true;
    let handleStandardDialogTouchTap = () => {
      this.refs.standardDialog.show();
    };

    let payload = '{test: "testvalue"}';

    let fieldSelectMUI = [{
      payload: '1',
      text: 'Never'
    }, {
      payload: '2',
      text: 'Every Night'
    }, {
      payload: '3',
      text: 'Weeknights'
    }, {
      payload: '4',
      text: 'Weekends'
    }, {
      payload: '5',
      text: 'Weekly'
    }];

    let avatarUrl = gravatar.url('hubert.wesolowski@syncano.com', {}, true);

    let notifications = [{
      type: 'normal-link',
      leftIcon: {
        name: 'synicon-alert',
        style: {
          color: '#ff9800'
        }
      },
      content: {
        text: 'You email address is not yet verified.',
        secondaryText: 'Resend activation email',
        style: {}
      },
      name: 'activation',
      handleLinkClick: dummyClick
    }, {
      type: 'invitation',
      leftIcon: {
        name: 'synicon-share-letiant',
        style: {
          color: '#8bc34a'
        }
      },
      content: {
        text: <div><b>Somebody</b><span> invited you to his instance </span><b>Kolaborecka Puwucatu</b></div>,
        style: {}
      },
      buttonsText: ['Accept', 'Decline'],
      name: 'billing',
      handleAccept: dummyClick.bind(this, [item]),
      handleDecline: dummyClick.bind(this, [item])
    }];

    let icon = <MUI.FontIcon className = "synicon-delete" />;

    return (

      <div className="examplesContainer">
        <h4>Examples</h4>

        <div className="exampleBox">
          <h2>Material dropdown</h2>
          <div style={{
            display: 'flex',
            float: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Common.Dropdown.Material
              type = "notification"
              icon = {"bell"}
              items = {notifications}
              iconStyle = {{padding: '0 4px'}}
              isLoading = {false} />
          <Common.Dropdown.Material
              type = "notification"
              icon = {"bell"}
              items = {[]}
              iconStyle = {{padding: '0 4px'}}
              isLoading = {false} />
          <Common.Dropdown.Material
              type = "notification"
              icon = {"bell"}
              items = {[]}
              iconStyle = {{padding: '0 4px'}}
              isLoading = {true} />
            </div>
        </div>

        <div className="exampleBox">
          <h4>Material List items</h4>
          <Common.Lists.List>
            <MUI.ListItem
              leftAvatar={<MUI.Avatar src={avatarUrl} />}
              secondaryText="email@domain.com"
              secondaryTextLines={1}
              onClick={dummyClick}>
              Name LastName
            </MUI.ListItem>
            <MUI.ListItem leftIcon={<MUI.FontIcon className="synicon-heart" />}>Item with left icon</MUI.ListItem>
            <MUI.ListItem rightIcon={<MUI.FontIcon className="synicon-heart" />}>item with right icon</MUI.ListItem>
            <MUI.ListDivider />
            <MUI.ListItem leftAvatar={<MUI.Avatar src={avatarUrl} />}>item with gravatar</MUI.ListItem>
            <MUI.ListItem>item empty</MUI.ListItem>
            <MUI.ListItem
              leftAvatar={<MUI.Avatar src={avatarUrl} />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                  I&apos;ll be in your neighborhood doing errands this weekend.
                  Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2} >item with gravatar and text
            </MUI.ListItem>
            <MUI.ListDivider inset={true} />
          </Common.Lists.List>
        </div>

        <div className="exampleBox">
          <h4>Icon 1</h4>
          <MUI.FontIcon
            className = "synicon-bell"
            color = "#0091EA"
            hoverColor = "#1a237e" />
        </div>

        <div className="exampleBox">
          <h4>CheckIcon</h4>
          <Common.CheckIcon icon="beta" background="blue" />
        </div>

        <div className="exampleBox">
          <h2>Editor</h2>
          <Common.Editor
            source={source}
            runtime={runtime}/>
          <h4>ListColumnItem </h4>
          <Common.ColumnList.Item>
            <Common.ColumnList.ItemColumn grid="1">
              <Common.CheckIcon icon="notifications" background="blue" width='40px' />
            </Common.ColumnList.ItemColumn>
            <Common.ColumnList.ItemColumn grid="5">
              <Common.ColumnList.ColNameDesc name="My Codebox" description="Description of my codebox" />
            </Common.ColumnList.ItemColumn>
            <Common.ColumnList.ItemColumn grid="2">
              <span><strong>2345</strong></span>
            </Common.ColumnList.ItemColumn>
            <Common.ColumnList.ItemColumn grid="2">
              <span><strong>2345</strong></span>
            </Common.ColumnList.ItemColumn>
            <Common.ColumnList.ItemColumn grid="2">
              <span><strong>2345</strong></span>
            </Common.ColumnList.ItemColumn>
          </Common.ColumnList.Item>
        </div>

        <div className="exampleBox">
          <h4>Editor</h4>
          <Common.Editor
            mode="python"
            theme="github"
            onChange={dummyClick}
            name="UNIQUE_ID_OF_DIV"
            value={source}/>
        </div>

        <div className="exampleBox">
          <h2>EditorPanel</h2>
          <Common.Editor.Panel trace={source} payload={payload}/>
        </div>

        <div className="exampleBox">
          <h2>FabList</h2>
          <Common.Fab
            buttons={fabButtons}
            handleFABClick={dummyClick}/>
        </div>

        <div className="exampleBox">
          <h4>Field (material UI)</h4>
          <MUI.TextField
            hintText="(Hint text) Your name - 5 chars only"
            errorText={this.state.errorText}
            onChange={this.dummyDisplayError}
            floatingLabelText="Your name"
            fullWidth={true}
            style={{borderBottomColor: '0091EA'}} />
        </div>

        <div className="exampleBox">
          <h2>SelectField (Drop Down from material UI)</h2>
          <MUI.SelectField menuItems={fieldSelectMUI} />
        </div>

        <div className="exampleBox">
          <h2>material-ui</h2>
          <MUI.LinearProgress mode="indeterminate" />
        </div>

        <div className="exampleBox">
          <h2>Toggle (Material UI)</h2>
          <MUI.Toggle
            name="ToggleButton"
            value="ValueToggle"
            label="tempomat"
            onToggle={dummyClick.bind(this, 'Mui Toggle')} />
          </div>

        <div className="exampleBox">
          <h4>material-ui - Snackbar</h4>

          <MUI.FlatButton
            onClick={handleSnackbarClick}
            label="Bum!"/>

          <MUI.Snackbar
            ref="snackbar"
            message="Bum! Bum! Bum!"
            action="undo"
            onActionTouchTap={handleSnackbarAction}/>
        </div>

        <div className="exampleBox">
          <h2>material-ui Dialog</h2>
          <MUI.FlatButton
            label="Bum!"
            onClick={handleStandardDialogTouchTap} />
          <MUI.Dialog
            ref="standardDialog"
            title="Dialog With Standard Actions"
            actions={dialogStandardActions}
            actionFocus="submit"
            modal={modalState}>
            Based on JSON
          </MUI.Dialog>
        </div>

        <div className="exampleBox">
          <h2>Trace</h2>
          <Common.Trace.Result result={`Some not very long result: ${source}`} />
        </div>

        <div className="exampleBox">
          <h2>Loading</h2>
          <Common.Loading
            type = "linear"
            show = {true} />
          <Common.Loading show={true}/>
        </div>

        <div className="exampleBox">
          <h2>DatePicker</h2>
          <MUI.DatePicker hintText="Portrait Dialog" />
          <MUI.DatePicker
            hintText = "Landscape Dialog"
            mode = "landscape" />
          <MUI.DatePicker
            maxDate = {this.getMaxDate(2020)}
            minDate = {this.getMinDate(1990)}
            formatDate = {this.getDateFormat}
            defaultDate = {this.getDateNow()}
            ref = "modifiedDatePicker"
            hintText = "Ranged Date Picker"
            showYearSelector = {true}
            onChange = {this.logDate} />
        </div>

        <div className="exampleBox">
          <h2>TimePicker</h2>
          <MUI.TimePicker
            format="ampm" />
          <MUI.TimePicker
            ref = "modifiedTimePicker"
            format = "24hr"
            onChange = {this.logTime}/>
        </div>

        <div className="exampleBox">
          <h2>Slider</h2>
          <Common.Slider legendItems={['$0', '$30', '$100', '$400', '$1000', '$2000']}/>
        </div>

        <div className="exampleBox">
          <h2>Slider</h2>
          <MUI.Slider step={0.1}/>
        </div>

        <div className="exampleBox">
          <h2>Menu (component build in progress)</h2>
          <MenuNew style ={{
            marginRight: 32,
            marginBottom: 32,
            float: 'left',
            position: 'relative',
            zIndex: 0}}>
            <MenuItemNew>Maps</MenuItemNew>
            <MenuItemNew>Books</MenuItemNew>
            <MenuItemNew>Flights</MenuItemNew>
            <MenuItemNew>Apps</MenuItemNew>
          </MenuNew>

          <MUI.IconMenu iconButtonElement={<MUI.IconButton>{icon}</MUI.IconButton>} openDirection="top-right">
            <MenuItemNew
              insetChildren = {true}
              leftIcon = {icon}>Refresh</MenuItemNew>
            <MenuItemNew>Send Feedback More</MenuItemNew>
            <MenuItemNew checked={true}>Settings</MenuItemNew>
            <MenuItemNew checked={true}>Help</MenuItemNew>
            <MenuItemNew>Sign out</MenuItemNew>
          </MUI.IconMenu>


          <MenuNew
            desktop = {true}
            width = {320}
            style = {{
              marginRight: 32,
              marginBottom: 32,
              float: 'left',
              position: 'relative',
              zIndex: 0}}>
            <MenuItemNew>Refresh</MenuItemNew>
            <MenuItemNew >Send Feedback More</MenuItemNew>
            <MenuItemNew checked={true}>Settings</MenuItemNew>
            <MenuItemNew checked={true}>Help</MenuItemNew>
            <MenuItemNew>Sign out</MenuItemNew>
            <MenuItemNew secondaryText="&#8984;B">Bold</MenuItemNew>
            <MenuItemNew secondaryText="&#8984;I">Italic</MenuItemNew>
            <MenuItemNew secondaryText="&#8984;U">Underline</MenuItemNew>
            <MenuItemNew secondaryText="Alt+Shift+5">Strikethrough</MenuItemNew>
            <MenuItemNew secondaryText="&#8984;.">Superscript</MenuItemNew>
            <MenuItemNew secondaryText="&#8984;,">Subscript</MenuItemNew>
            <MenuItemNew rightIcon={<ArrowDropRight />}>Paragraph styles</MenuItemNew>
            <MenuItemNew rightIcon={<ArrowDropRight />}>Align</MenuItemNew>
            <MenuItemNew rightIcon={<ArrowDropRight />}>Line spacing</MenuItemNew>
            <MenuItemNew rightIcon={<ArrowDropRight />}>Numbered list</MenuItemNew>
            <MenuItemNew rightIcon={<ArrowDropRight />}>List options</MenuItemNew>
            <MenuItemNew secondaryText="&#8984;/">Clear formatting</MenuItemNew>
          </MenuNew>
        </div>

        <div className="exampleBox">
          <h2>Menu</h2>
          <MUI.Menu style ={{
            marginRight: 32,
            marginBottom: 32,
            float: 'left',
            position: 'relative',
            zIndex: 0}}
            menuItems={[
              {text: <MUI.MenuItem>ASDASD</MUI.MenuItem>},
              {text: <MUI.MenuItem>ASDASD</MUI.MenuItem>},
              {text: <MUI.MenuItem>ASDASD</MUI.MenuItem>}
            ]} />
        </div>
      </div>
    );
  }
});
