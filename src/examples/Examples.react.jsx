var React                = require('react'),

    ThemeManager         = require('material-ui/lib/styles/theme-manager')(),
    LinearProgress       = require('material-ui/lib/linear-progress'),
    Dialog               = require('material-ui/lib/dialog'),
    Snackbar             = require('material-ui/lib/snackbar'),
    FlatButton           = require('material-ui/lib/flat-button'),

    Dropdown             = require('../common/Dropdown/Dropdown.react'),
    Icon                 = require('../common/Icon/Icon.react'),
    ProgressBar          = require('../common/ProgressBar/ProgressBar.react'),
    Label                = require('../common/Label/Label.react'),
    ListItemEmpty        = require('../common/Lists/ListItemEmpty.react'),
    Editor               = require('../common/Editor/Editor.react'),
    Fab                  = require('../common/Fab/Fab.react'),
    FabList              = require('../common/Fab/FabList.react'),
    ColorPicker          = require('../common/Color/ColorPicker.react'),
    ColorPickerItem      = require('../common/Color/ColorPickerItem.react'),
    UsageBar             = require('../common/UsageBar/UsageBar.react'),

    FieldPassword        = require('../common/Field/FieldPassword.react'),
    FieldReadonly        = require('../common/Field/FieldReadonly.react'),
    FieldSelect          = require('../common/Field/FieldSelect.react'),
    AvatarInitials       = require('../common/AvatarInitials/AvatarInitials.react'),
    ButtonSocialAuth     = require('../common/SocialButton/ButtonSocialAuth.react'),
    ButtonSocialAuthList = require('../common/SocialButton/ButtonSocialAuthList.react'),

    InstancesListItem    = require('../apps/Instances/InstancesListItem.react');

<<<<<<< HEAD
var ThemeManager = require('material-ui/lib/styles/theme-manager')();

var LinearProgress = require('material-ui/lib/linear-progress');

var Dropdown = require('../common/Dropdown/Dropdown.react');
var Icon = require('../common/Icon/Icon.react');
var ProgressBar = require('../common/ProgressBar/ProgressBar.react');
var Label = require('../common/Label/Label.react');
var ListItemEmpty = require('../common/Lists/ListItemEmpty.react');
var Editor = require('../common/Editor/Editor.react');
var Fab = require('../common/Fab/Fab.react');
var FabList = require('../common/Fab/FabList.react');

var FieldPassword = require('../common/Field/FieldPassword.react');
var FieldReadonly = require('../common/Field/FieldReadonly.react');
var FieldSelect = require('../common/Field/FieldSelect.react');

var SwitchField = require('../common/SwitchField/SwitchField.react');
var SwitchFieldList = require('../common/SwitchField/SwitchFieldList.react');
var SwitchInput = require('../common/SwitchField/SwitchInput.react');

var InstancesListItem = require('../apps/Instances/InstancesListItem.react');


//var FlatButton = require('material-ui').FlatButton;
=======
>>>>>>> f41f6b2246635e3a5e85b9669c17d5d205d5dc9d

require('./Examples.css');

module.exports = React.createClass({

  displayName: 'Examples',

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
      accent1Color: Colors.deepOrange500
    });
  },

  getDefaultProps: function () {
  },

  componentWillMount: function () {
  },

  componentDidMount: function () {
  },

  render: function () {
    var actions = [{
      displayName: 'Sort by name',
      name: 'sortByName',
    }, {
      displayName: 'Sort by date',
      name: 'sortByDate',
    }, {
      displayName: 'Switch to list view',
      name: 'switchToListView',
      iconType: 'view-stream',
    }, {
      displayName: 'Switch to card view',
      name: 'switchToCardView',
      iconType: 'view-module',
    }]

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
      'color': 'red',
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
        color: '#FFC52D',
      },
      {
        name: "plusButton",
        label: "Plus button dummy label",
        icon: 'plus',
        color: 'red',
      }
    ];

    var passwordField = {
      displayName: "Password",
      name: "password",
      largeText: false,
      fieldGroup: 'menu',
      color: '#FFC52D',
    }

    var someField = {
      displayName: "Some Field",
      value: "Some readonly value",
      name: "somefield",
      largeText: false,
      fieldGroup: 'menu',
      color: '#FFC52D',
    };

    var handleSnackbarClick = function() {
      this.refs.snackbar.show()
    }.bind(this);

    var handleSnackbarAction = function() {
      window.alert("Bum!");
    };

    var dialogStandardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit, ref: 'submit' }
    ];

    var modalState = true;
    var handleStandardDialogTouchTap = function() {
      this.refs.standardDialog.show();
    }.bind(this);

    var socialAuthButtons = [{
      icon: 'github',
      text: 'Log in with Github',
    }, {
      icon: 'google',
      text: 'Log in with Google',
    }, {
      icon: 'facebook',
      text: 'Log in with Facebook',
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
      }]

    return (

      <div className="examplesContainer">
        <h1>Examples</h1>

        <div className="exampleBox">
          <h2>Dropdown</h2>
          <Dropdown icon="menu" actions={actions} handleItemClick={dummyClick}/>
        </div>

        <div className="exampleBox">
          <h2>Icon</h2>
          <Icon icon="notifications" style={{width: '40px'}}/>
        </div>

        <div className="exampleBox">
          <h2>ProgressBar</h2>
          <ProgressBar visible={true}/>
        </div>

        <div className="exampleBox">
          <h2>Label</h2>
          <Label text={text}/>
        </div>

        <div className="exampleBox">
          <h2>InstancesListItem (card)</h2>
          <InstancesListItem
            handleClick={dummyClick}
            item={item}
            style={"cards"}
            dropdownVisible={false}
            avatarStyle={"icon"}
            actions={actions}/>
        </div>

        <div className="exampleBox">
          <h2>InstancesListItem (stream)</h2>
          <InstancesListItem
            handleClick={dummyClick}
            item={item}
            style={"stream"}
            dropdownVisible={false}
            avatarStyle={"icon"}
            actions={actions}/>
        </div>

        <div className="exampleBox">
          <h2>ListItemEmpty</h2>
          <ListItemEmpty icon={"inbox"} text={text}/>
        </div>

        <div className="exampleBox">
          <h2>Editor</h2>
          <Editor source={source} runtime={runtime}/>
        </div>

        <div className="exampleBox">
          <h2>Fab</h2>
          <Fab />
        </div>

        <div className="exampleBox">
          <h2>FabList</h2>
          <FabList buttons={fabButtons} handleFABClick={dummyClick}/>
        </div>

        <div className="exampleBox">
          <h2>FieldPassword</h2>
          <FieldPassword field={passwordField}/>
        </div>

        <div className="exampleBox">
          <h2>FieldReadonly</h2>
          <FieldReadonly field={someField}/>
        </div>

        <div className="exampleBox">
          <h2>material-ui LinearProgress</h2>
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
            field={switchFields[0]} 
            name="react skills" 
            heading="React skills" 
            enabled={true} 
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
          <h2>material-ui - Snackbar</h2>

          <FlatButton
            onClick={handleSnackbarClick}
            label="Bum!" />

          <Snackbar
            ref="snackbar"
            message="Bum! Bum! Bum!"
            action="undo"
            onActionTouchTap={handleSnackbarAction} />
        </div>

        <div className="exampleBox">
          <h2>material-ui Dialog</h2>
          <FlatButton label="Bum!" onClick={handleStandardDialogTouchTap}  />
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
          <h2>AvatarInitials</h2>
          <AvatarInitials name="George R. R. Martin" />
        </div>

        <div className="exampleBox">
          <h2>ButtonSocialAuth</h2>
          <ButtonSocialAuth icon="facebook" text="Log in with Facebook" />
        </div>

        <div className="exampleBox">
          <h2>ColorPicker</h2>
          <ColorPicker />
        </div>

        <div className="exampleBox">
          <h2>ColorPicker (selected)</h2>
          <ColorPicker selectedColor={'#EF5350'} />
        </div>

        <div className="exampleBox">
          <h2>ColorPickerItem (selected)</h2>
          <ColorPickerItem color={'#EF5350'} selected={true} />
        </div>

        <div className="exampleBox">
          <h2>ColorPickerItem</h2>
          <ColorPickerItem color={'#EF5350'} selected={false} />
        </div>

        <div className="exampleBox">
          <h2>UsageBar</h2>
          <UsageBar billingProfile={billingProfile} />
        </div>


      </div>
    );
  }

});