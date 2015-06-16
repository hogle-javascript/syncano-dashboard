var React                = require('react'),
    mui                  = require('material-ui'),

    ThemeManager         = require('material-ui/lib/styles/theme-manager')(),
    Colors               = require('material-ui/lib/styles/colors'),
    LinearProgress       = require('material-ui/lib/linear-progress'),
    Dialog               = require('material-ui/lib/dialog'),
    Snackbar             = require('material-ui/lib/snackbar'),
    FlatButton           = require('material-ui/lib/flat-button'),

    Dropdown             = require('../common/Dropdown/Dropdown.react'),
    Icon                 = require('../common/Icon/Icon.react'),
    CheckIcon            = require('../common/CheckIcon/CheckIcon.react'),
    ProgressBar          = require('../common/ProgressBar/ProgressBar.react'),
    Label                = require('../common/Label/Label.react'),
    ListItemEmpty        = require('../common/Lists/ListItemEmpty.react'),
    Editor               = require('../common/Editor/Editor.react'),
    EditorPanel          = require('../common/Editor/EditorPanel.react'),
    Fab                  = require('../common/Fab/Fab.react'),
    FabList              = require('../common/Fab/FabList.react'),
    UsageBar             = require('../common/UsageBar/UsageBar.react'),

    FieldPassword        = require('../common/Field/FieldPassword.react'),
    FieldReadonly        = require('../common/Field/FieldReadonly.react'),
    TextField            = mui.TextField,
    FieldSelectMUI       = require('material-ui/lib/drop-down-menu'),
    FieldDatetime        = require('../common/Field/FieldDatetime.react'),
    FieldSelectOption    = require('../common/Field/FieldSelectOption.react'),
    FieldSelect          = require('../common/Field/FieldSelect.react'),
    SwitchField          = require('../common/SwitchField/SwitchField.react'),
    SwitchFieldList      = require('../common/SwitchField/SwitchFieldList.react'),
    SwitchInput          = require('../common/SwitchField/SwitchInput.react'),
    AvatarInitials       = require('../common/AvatarInitials/AvatarInitials.react'),
    SocialAuthButton     = require('../common/SocialAuthButton/SocialAuthButton.react'),
    SocialAuthButtonList = require('../common/SocialAuthButton/SocialAuthButtonList.react'),
    Icon                 = require('../common/Icon/Icon.react'),
    ListItem             = require('../common/Lists/ListItem.react'),
    List                 = require('../common/Lists/List.react'),
    MaterialIcon         = require('../common/Icon/MaterialIcon.react'),
    Trace                = require('../common/Trace/TraceResult.react'),
    TraceResultWithMeta  = require('../common/Trace/TraceResultWithMeta.react'),

    ColumnListItem       = require('../common/ColumnList/Item.react'),
    ColumnListItemColumn = require('../common/ColumnList/ItemColumn.react'),
    ColumnNameDesc       = require('../common/ColumnList/ColNameDesc.react');


//var FlatButton = require('material-ui').FlatButton;

require('./Examples.css');

module.exports = React.createClass({

  displayName: 'Examples',

  getInitialState: function () {
    return {
      errorText: null
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function () {
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

  getDefaultProps: function () {
  },

  componentDidMount: function () {
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

  render: function () {
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

    var dummyClick = function (action) {
      console.log('Click!', action);
    };

    console.log(Icon.propTypes);

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

    var handleSnackbarClick = function () {
      this.refs.snackbar.show()
    }.bind(this);

    var handleSnackbarAction = function () {
      window.alert("Bum!");
    };

    var dialogStandardActions = [
      {text: 'Cancel'},
      {text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit'}
    ];

    var modalState = true;
    var handleStandardDialogTouchTap = function () {
      this.refs.standardDialog.show();
    }.bind(this);

    var socialAuthButtons = [{
      icon: 'github',
      text: 'Log in with Github'
    }, {
      icon: 'google',
      text: 'Log in with Google'
    }, {
      icon: 'facebook',
      text: 'Log in with Facebook'
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

    var fieldSelectOption = {
      displayName: "Option display name",
      name: 5
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

    return (

      <div className="examplesContainer">
        <h4>Examples</h4>

        <div className="exampleBox">
          <h2>Dropdown</h2>
          <Dropdown
            icon="menu"
            actions={actions}
            handleItemClick={dummyClick}/>
        </div>

        <div className="exampleBox">
          <h4>Icon</h4>
          <Icon icon="notifications" style={{width: '40px'}}/>
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
          <h4>ListItem (card)</h4>
          <ListItem
            handleClick={dummyClick}
            item={item}
            style={"cards"}
            dropdownVisible={false}
            avatarStyle={"icon"}
            actions={actions}/>
        </div>

        <div className="exampleBox">
          <h4>ListItem (stream)</h4>
          <ListItem
            handleClick={dummyClick}
            item={item}
            style={"stream"}
            dropdownVisible={false}
            avatarStyle={"icon"}
            actions={actions}/>
        </div>

        <div className="exampleBox">
          <h2>ListItemEmpty</h2>
          <ListItemEmpty
            icon={"inbox"}
            text={text}/>
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
          <h4>ListItemEmpty</h4>
          <ListItemEmpty icon={"inbox"} text={text}/>
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
          <h4>Fab</h4>
          <Fab handleClick={dummyClick}/>
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
          <h4>FieldDatetime</h4>
          <FieldDatetime
            dateFormat="YYYY-MM-DDThh:mm:ss.uuuuuuZ"
            labelText="Date"
            iconColor="red"
            fieldStyle={{width: "100%"}} />
        </div>

        <div className="exampleBox">
          <h4>FieldPassword (Material UI)</h4>
          <TextField
            name="password"
            type="password"
            floatingLabelText="Password" />
        </div>

        <div className="exampleBox">
          <h4>FieldReadonly</h4>
          <FieldReadonly field={someField}/>
        </div>

        <div className="exampleBox">
          <h2>FieldReadonly (material UI)</h2>
          <Textield
            defaultValue="Your name - 5 chars only"
            disabled={true}
            fullWidth={true} />
        </div>

        <div className="exampleBox">
          <h2>FieldSelect</h2>
          <FieldSelect field={fieldSelect}/>
        </div>

        <div className="exampleBox">
          <h2>FieldSelect (Drop Down from material UI)</h2>
          <FieldSelectMUI
            menuItems={fieldSelectMUI} />
        </div>

        <div className="exampleBox">
          <h2>FieldSelectOption</h2>
          <FieldSelectOption
            option={fieldSelectOption}
            handleClick={this.dummyClick} />
            <FieldSelectOption
            option={fieldSelectOption}
            handleClick={this.dummyClick} />
            <FieldSelectOption
            option={fieldSelectOption}
            handleClick={this.dummyClick} />
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
          <mui.Toggle
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
          <h4>AvatarInitials</h4>
          <AvatarInitials name="George R. R. Martin" />
        </div>

        <div className="exampleBox">
          <h2>ButtonSocialAuth</h2>
          <SocialAuthButton
            icon="facebook"
            text="Log in with Facebook" />
        </div>

        <div className="exampleBox">
          <h4>UsageBar</h4>
          <UsageBar billingProfile={billingProfile}/>
        </div>

        <div className="exampleBox">
          <h2>Icon</h2>
          <Icon
            icon="warning"
            handleClick={dummyClick.bind(this, "Icon")}
            style={{fill: "#0091EA"}}
            glowing={true} />
        </div>

        <div className="exampleBox">
          <h2>MaterialIcon - from google font</h2>
          <MaterialIcon name="favorite" />
        </div>

        <div className="exampleBox">
          <h2>Trace</h2>
          <Trace result={"Some not very long result: " + source} />
        </div>

        <div className="exampleBox">
          <h2>TraceResultWithMeta</h2>
          <TraceResultWithMeta meta={{'test': 'Some meta'}} args={{'arg1': 'Arg1', 'arg2': 'Arg2'}}  result={"Some not very long result: " + source} />
        </div>

      </div>
    );
  }

});