let React                = require('react');
let mui                  = require('material-ui');
let gravatar             = require('gravatar');

let ThemeManager         = new mui.Styles.ThemeManager();
let TextField            = mui.TextField;
let DatePicker           = mui.DatePicker;
let TimePicker           = mui.TimePicker;
let Colors               = mui.Styles.Colors;
let LinearProgress       = mui.LinearProgress;
let Dialog               = mui.Dialog;
let Snackbar             = mui.Snackbar;
let FlatButton           = mui.FlatButton;
let ListItem             = mui.ListItem;
let ListDivider          = mui.ListDivider;
let Avatar               = mui.Avatar;
let Toggle               = mui.Toggle;
let IconButton           = mui.IconButton;
let FontIcon             = mui.FontIcon;
let IconMenu             = mui.IconMenu;
let Menu                 = mui.Menu;       // this menu is from lib/menu/menu
let MenuItem             = mui.MenuItem;   // this menu item is from lib/menu/menu-items
let SelectField          = mui.SelectField;
let ArrowDropRight       = require('material-ui/lib/svg-icons/navigation-arrow-drop-right');
let MenuNew              = require('material-ui/lib/menus/menu');
let MenuItemNew          = require('material-ui/lib/menus/menu-item');

let Dropdown             = require('../common/Dropdown/Dropdown.react');
let MaterialDropdown     = require('../common/Dropdown/MaterialDropdown.react');
let CheckIcon            = require('../common/CheckIcon/CheckIcon.react');
let ProgressBar          = require('../common/ProgressBar/ProgressBar.react');
let Label                = require('../common/Label/Label.react');
let Editor               = require('../common/Editor/Editor.react');
let EditorPanel          = require('../common/Editor/EditorPanel.react');
let FabList              = require('../common/Fab/FabList.react');
let UsageBar             = require('../common/UsageBar/UsageBar.react');

let SwitchField          = require('../common/SwitchField/SwitchField.react');
let SwitchFieldList      = require('../common/SwitchField/SwitchFieldList.react');
let SwitchInput          = require('../common/SwitchField/SwitchInput.react');
let SocialAuthButtonsList = require('../common/SocialAuthButtonsList');
let List                 = require('../common/Lists/List.react');
let Trace                = require('../common/Trace/TraceResult.react');
let TraceResultWithMeta  = require('../common/Trace/TraceResultWithMeta.react');
let Loading              = require('../common/Loading/Loading.react');
let Slider               = require('../common/Slider/Slider.react');

let ColumnListItem       = require('../common/ColumnList/Item.react');
let ColumnListItemColumn = require('../common/ColumnList/ItemColumn.react');
let ColumnNameDesc       = require('../common/ColumnList/ColNameDesc.react');


//var FlatButton = require('material-ui').FlatButton;

require('./Examples.css');

export default React.createClass({

  displayName: 'Examples',

  getInitialState: function() {
    return {
      errorText: null
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function() {
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

  getDefaultProps: function() {
  },

  componentDidMount: function() {
  },

  dummyDisplayError: function(e) {
    if (e.target.value.length > 5) {
      this.setState({
        errorText: "(DummyError) This field is 5 chars only"
      })
    } else {
      this.setState({
        errorText: null
      })
    }
  },

  getDateNow: function() {
    var date = new Date();
    return date;
  },

  getDateFormat: function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '-' + month + '-' + year;
  },

  logDate: function() {
    console.debug(this.refs.modifiedDatePicker.getDate())
  },

  logTime: function() {
    console.debug(this.refs.modifiedTimePicker.getTime());
  },

  getMinDate: function(minYear) {
    var date = new Date();
    date.setFullYear(minYear);
    return date;
  },

  getMaxDate: function(maxYear) {
    return new Date().setFullYear(maxYear);
  },

  render: function() {


    var dummyClick = function(action) {
      console.log('Click!', action);
    };

    var dropdownItems = [{
      content: "Account",
      name: "account",
      handleItemClick: dummyClick
    }, {
      content: "Logout",
      name: "logout",
      handleItemClick: dummyClick
    }];

    var dropdownHeader = {
      icon: "synicon-account-circle",
      userFullName: "Name LastName",
      userEmail: "hubert.wesolowski@syncano.com",
    };

    var actions = [{
      displayName: 'Sort by name',
      name: 'sortByName'
    }, {
      displayName: 'Sort by date',
      name: 'sortByDate'
    }, {
      displayName: 'Switch to list view',
      name: 'switchToListView',
      iconType: 'view-stream'
    }, {
      displayName: 'Switch to card view',
      name: 'switchToCardView',
      iconType: 'view-module'
    }];

    var text = "Dummy text";

    var item = {
      name: "Dummy name",
      description: "Very long dummy description",
      metadata: {color: 'blue', icon: 'google'}
    };

    var style = {
      'color': 'red'
    };

    var source = "import os\n" +
      "import requests\n" +
      "\n" +
      "print 'hello world!\n";

    var runtime = 'python';

    var fabButtons = [
      {
        name: "menuButton",
        label: "Menu button dummy label",
        icon: 'menu',
        color: '#FFC52D'
      },
      {
        name: "plusButton",
        label: "Plus button dummy label",
        icon: 'plus',
        color: 'red'
      }
    ];

    var passwordField = {
      displayName: "Password",
      name: "password",
      largeText: false,
      fieldGroup: 'menu',
      color: '#FFC52D'
    };

    var someField = {
      displayName: "Some Field",
      value: "Some readonly value",
      name: "somefield",
      largeText: false,
      fieldGroup: 'menu',
      color: '#FFC52D'
    };

    var handleSnackbarClick = function() {
      this.refs.snackbar.show()
    }.bind(this);

    var handleSnackbarAction = function() {
      console.log("Bum!");
    };

    var dialogStandardActions = [
      {text: 'Cancel'},
      {text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit'}
    ];

    var modalState = true;
    var handleStandardDialogTouchTap = function() {
      this.refs.standardDialog.show();
    }.bind(this);

    var socialAuthButtons = [{
      icon: 'github',
      text: 'Login with Github'
    }, {
      icon: 'google',
      text: 'Login with Google'
    }, {
      icon: 'facebook',
      text: 'Login with Facebook'
    }];

    var billingProfile = {
      soft_limit: 3000,
      hard_limit: 5000,
      balance: {
        total: 4000
      }
    };

    var switchFields = [{
        name: 'limit',
        enabled: true,
        heading: 'Limit',
        textEnabled: 'Hard limit is currently enabled. Your account will stop working when the limit is reached.',
        textDisabled: 'Hard limit is currently disabled. Your account will stop working when the limit is reached.',
      }, {
        name: 'alert',
        enabled: false,
        heading: 'Alert',
        textEnabled: 'Alert is currently enabled. Your account will stop working when the limit is reached.',
        textDisabled: 'Alert is currently disabled. Your account will stop working when the limit is reached.',
      }];

    var payload = '{test: "testvalue"}';

    var fieldSelect = {
      displayName: "Codebox",
      name: "codebox",
      options: [{
        displayName: "CodeBox1",
        name: 1
      }, {
        displayName: "CodeBox2",
        name: 2
      }, {
        displayName: "CodeBox3",
        name: 3
      }],
      type: "select"
    };

    var fieldSelectMUI = [{
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

    var fieldDatetime = {
      displayName: "Date",
      name: "date",
      type: "datetime",
      value: ""
    };

    var columns = [
      {
        name: 'CodeBox',
        columnType: 'icon'
      }, {
        name: 'ID',
        columnType: 'integer'
      }
    ];

    var accordionItems = [{
      id: "allUsers",
      uuid: "allUsers",
      displayName: "All users",
      isNavigationElement: true
    }, {
      id: "groups",
      uuid: "groups",
      displayName: "Groups",
      isNavigationElement: true
      //payload: this.state.groups,
    }];

    var avatarUrl = gravatar.url("hubert.wesolowski@syncano.com", {}, true);

    var notifications = [{
      type     : "normal-link",
      leftIcon : {
        name   : "synicon-alert",
        style  : {
          color: "#ff9800"
        }
      },
      content: {
        text          : "You email address is not yet verified.",
        secondaryText : "Resend activation email",
        style         : {}
      },
      name            : "activation",
      handleLinkClick : dummyClick
    }, {
      type     : "invitation",
      leftIcon : {
        name   : "synicon-share-variant",
        style  : {
          color: "#8bc34a"
        }
      },
      content  : {
        text   : <div><b>Somebody</b><span> invited you to his instance </span><b>Kolaborecka Puwucatu</b></div>,
        style  : {}
      },
      buttonsText   : ["Accept", "Decline"],
      name          : "billing",
      handleAccept  : dummyClick.bind(this, [item]),
      handleDecline : dummyClick.bind(this, [item])
    }];

    var icon = <FontIcon className = "synicon-delete" />;

    return (

      <div className="examplesContainer">
        <h4>Examples</h4>

        <div className="exampleBox">
          <h2>Dropdown</h2>
          <Dropdown
              items={dropdownItems}
              headerContent={dropdownHeader} />
        </div>

        <div className="exampleBox">
          <h2>Material dropdown</h2>
          <div style={{
                 display        : 'flex',
                 float          : 'none',
                 alignItems     : 'center',
                 justifyContent : 'center'
               }}>
          <MaterialDropdown
              type      = "notification"
              icon      = {"bell"}
              items     = {notifications}
              iconStyle = {{padding: "0 4px"}}
              isLoading = {false} />
          <MaterialDropdown
              type      = "notification"
              icon      = {"bell"}
              items     = {[]}
              iconStyle = {{padding: "0 4px"}}
              isLoading = {false} />
          <MaterialDropdown
              type      = "notification"
              icon      = {"bell"}
              items     = {[]}
              iconStyle = {{padding: "0 4px"}}
              isLoading = {true} />
            </div>
        </div>

        <div className="exampleBox">
          <h4>Material List items</h4>
          <List>
            <ListItem
              leftAvatar={<Avatar src={avatarUrl} />}
              secondaryText="email@domain.com"
              secondaryTextLines={1}
              onClick={dummyClick} >
              Name LastName
            </ListItem>
            <ListItem leftIcon={<FontIcon className="synicon-heart" />}>Item with left icon</ListItem>
            <ListItem rightIcon={<FontIcon className="synicon-heart" />}>item with right icon</ListItem>
            <ListDivider />
            <ListItem leftAvatar={<Avatar src={avatarUrl} />}>item with gravatar</ListItem>
            <ListItem>item empty</ListItem>
            <ListItem
              leftAvatar={<Avatar src={avatarUrl} />}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                  I&apos;ll be in your neighborhood doing errands this weekend.
                  Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2} >item with gravatar and text
            </ListItem>
            <ListDivider inset={true} />
          </List>
        </div>

        <div className="exampleBox">
          <h4>Icon 1</h4>
          <FontIcon
            className  = "synicon-bell"
            color      = "#0091EA"
            hoverColor = "#1a237e"  />
        </div>

        <div className="exampleBox">
          <h4>CheckIcon</h4>
          <CheckIcon icon="beta" background="blue" />
        </div>

        <div className="exampleBox">
          <h4>ProgressBar</h4>
          <ProgressBar visible={true}/>
        </div>

        <div className="exampleBox">
          <h4>Label</h4>
          <Label text={text}/>
        </div>

        <div className="exampleBox">
          <h2>Editor</h2>
          <Editor
            source={source}
            runtime={runtime}/>
          <h4>ListColumnItem </h4>
          <ColumnListItem>
            <ColumnListItemColumn grid="1">
              <CheckIcon icon="notifications" background="blue" width='40px' />
            </ColumnListItemColumn>
            <ColumnListItemColumn grid="5">
              <ColumnNameDesc name="My Codebox" description="Description of my codebox" />
            </ColumnListItemColumn>
            <ColumnListItemColumn grid="2">
              <span><strong>2345</strong></span>
            </ColumnListItemColumn>
            <ColumnListItemColumn grid="2">
              <span><strong>2345</strong></span>
            </ColumnListItemColumn>
            <ColumnListItemColumn grid="2">
              <span><strong>2345</strong></span>
            </ColumnListItemColumn>
          </ColumnListItem>
        </div>

        <div className="exampleBox">
          <h4>Editor</h4>
          <Editor
            mode="python"
            theme="github"
            onChange={dummyClick}
            name="UNIQUE_ID_OF_DIV"
            value={source}/>
        </div>

        <div className="exampleBox">
          <h2>EditorPanel</h2>
          <EditorPanel trace={source} payload={payload}/>
        </div>

        <div className="exampleBox">
          <h2>FabList</h2>
          <FabList
            buttons={fabButtons}
            handleFABClick={dummyClick}/>
        </div>

        <div className="exampleBox">
          <h4>Field (material UI)</h4>
          <TextField
            hintText="(Hint text) Your name - 5 chars only"
            errorText={this.state.errorText}
            onChange={this.dummyDisplayError}
            floatingLabelText="Your name"
            fullWidth={true}
            style={{borderBottomColor: "0091EA"}} />
        </div>

        <div className="exampleBox">
          <h2>SelectField (Drop Down from material UI)</h2>
          <SelectField
            menuItems={fieldSelectMUI} />
        </div>

        <div className="exampleBox">
          <h2>material-ui</h2>
          <LinearProgress mode="indeterminate" />
        </div>

        <div className="exampleBox">
          <h2>SwitchFieldList</h2>
          <SwitchFieldList
            handleSwitchClick={dummyClick.bind(this, "handleSwitchCilck")}
            handleFieldLinkClick={dummyClick.bind(this, "handleFieldLinkClick")}
            fields={switchFields} />
        </div>

        <div className="exampleBox">
          <h2>SwitchField</h2>
          <SwitchField
            handleSwitchClick={dummyClick.bind(this, "handleSwitchCilck")}
            handleFieldLinkClick={dummyClick.bind(this, "handleFieldLinkClick")}
            name="react skills"
            heading="React skills"
            toggled={true}
            textEnabled="Dummy text enabled"
            textDisabled="dummy text disabled" />
        </div>

        <div className="exampleBox">
          <h2>SwitchInput</h2>
          <SwitchInput
            handleClick={dummyClick.bind(this, "handleClick")}
            enabled={true} />
        </div>

        <div className="exampleBox">
          <h2>Toggle (Material UI)</h2>
          <Toggle
            name="ToggleButton"
            value="ValueToggle"
            label="tempomat"
            onToggle={dummyClick.bind(this, "Mui Toggle")} />
          </div>

        <div className="exampleBox">
          <h4>material-ui - Snackbar</h4>

          <FlatButton
            onClick={handleSnackbarClick}
            label="Bum!"/>

          <Snackbar
            ref="snackbar"
            message="Bum! Bum! Bum!"
            action="undo"
            onActionTouchTap={handleSnackbarAction}/>
        </div>

        <div className="exampleBox">
          <h2>material-ui Dialog</h2>
          <FlatButton
            label="Bum!"
            onClick={handleStandardDialogTouchTap}  />
          <Dialog
            ref="standardDialog"
            title="Dialog With Standard Actions"
            actions={dialogStandardActions}
            actionFocus="submit"
            modal={modalState}>
            Based on JSON
          </Dialog>
        </div>

        <div className="exampleBox">
          <h4>UsageBar</h4>
          <UsageBar billingProfile={billingProfile}/>
        </div>

        <div className="exampleBox">
          <h2>Trace</h2>
          <Trace result={"Some not very long result: " + source} />
        </div>

        <div className="exampleBox">
          <h2>TraceResultWithMeta</h2>
          <TraceResultWithMeta
            meta={{'test': 'Some meta'}}
            args={{'arg1': 'Arg1', 'arg2': 'Arg2'}}
            result={"Some not very long result: " + source} />
        </div>

        <div className="exampleBox">
          <h2>Loading</h2>
          <Loading
            type    = "linear"
            show    = {true} />
          <Loading show={true}/>
        </div>

        <div className="exampleBox">
          <h2>DatePicker</h2>
          <DatePicker hintText="Portrait Dialog" />
          <DatePicker
            hintText = "Landscape Dialog"
            mode     = "landscape" />
          <DatePicker
            maxDate          = {this.getMaxDate(2020)}
            minDate          = {this.getMinDate(1990)}
            formatDate       = {this.getDateFormat}
            defaultDate      = {this.getDateNow()}
            ref              = "modifiedDatePicker"
            hintText         = "Ranged Date Picker"
            showYearSelector = {true}
            onChange         = {this.logDate} />
        </div>

        <div className="exampleBox">
          <h2>TimePicker</h2>
          <TimePicker
            format="ampm" />
          <TimePicker
            ref      = "modifiedTimePicker"
            format   = "24hr"
            onChange = {this.logTime}/>
        </div>

        <div className="exampleBox">
          <h2>Slider</h2>
          <Slider legendItems={["$0", "$30", "$100", "$400", "$1000", "$2000"]}/>
        </div>

        <div className="exampleBox">
          <h2>Slider</h2>
          <mui.Slider step={0.1}/>
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

          <IconMenu iconButtonElement={<IconButton>{icon}</IconButton>} openDirection="top-right">
            <MenuItemNew
              insetChildren = {true}
              leftIcon      = {icon}>Refresh</MenuItemNew>
            <MenuItemNew>Send Feedback More</MenuItemNew>
            <MenuItemNew checked={true}>Settings</MenuItemNew>
            <MenuItemNew checked={true}>Help</MenuItemNew>
            <MenuItemNew>Sign out</MenuItemNew>
          </IconMenu>


          <MenuNew
            desktop = {true}
            width   = {320}
            style   = {{
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
          <Menu style ={{
                  marginRight: 32,
                  marginBottom: 32,
                  float: 'left',
                  position: 'relative',
                  zIndex: 0}}
                  menuItems={[
                  {text: <MenuItem>ASDASD</MenuItem>},
                  {text: <MenuItem>ASDASD</MenuItem>},
                  {text: <MenuItem>ASDASD</MenuItem>}
                  ]} />
        </div>

      </div>
    );
  }

});
