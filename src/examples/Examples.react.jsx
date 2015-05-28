var React = require('react');
var mui = require("material-ui");

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
var Field = require('material-ui/lib/text-field');
var FieldSelectMUI = require('material-ui/lib/drop-down-menu');
var FieldDatetime = require('../common/Field/FieldDatetime.react');
var FieldSelectOption = require('../common/Field/FieldSelectOption.react');
var FieldSelect = require('../common/Field/FieldSelect.react');

var InstancesListItem = require('../apps/Instances/InstancesListItem.react');


//var FlatButton = require('material-ui').FlatButton;

require('./Examples.css');

module.exports = React.createClass({

  displayName: 'Examples',

  getInitialState: function () {
    return {
      errorText: null,  
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
      accent1Color: Colors.deepOrange500
    });
  },

  getDefaultProps: function () {
  },

  componentWillMount: function () {
  },

  componentDidMount: function () {
  },

  dummyDisplayError: function(e) {
    if (e.target.value.length > 5) {
      this.setState({
        errorText: "(DummyError) This field is 5 chars only",
      })
    } else {
      this.setState({
        errorText: null,
      })
    }
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
    }

    var fieldSelect = {
      displayName: "Codebox",
      name: "codebox",
      options: [{
        displayName: "CodeBox1",
        name: 1,
      }, {
        displayName: "CodeBox2",
        name: 2,
      }, {
        displayName: "CodeBox3", 
        name: 3,
      }],
      type: "select",
    }

    var fieldSelectMUI = [{ 
      payload: '1', 
      text: 'Never', 
    }, { 
      payload: '2', 
      text: 'Every Night', 
    }, { 
      payload: '3', 
      text: 'Weeknights', 
    }, { 
      payload: '4', 
      text: 'Weekends', 
    }, { 
      payload: '5', 
      text: 'Weekly', 
    }];

    var fieldDatetime = {
      displayName: "Date",
      name: "date",
      type: "datetime",
      value: "",
    };

    var fieldSelectOption = {
      displayName: "Option display name",
      name: 5,
    }

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
          <h2>Field (material UI)</h2>
          <Field
            hintText="(Hint text) Your name - 5 chars only"
            errorText={this.state.errorText}
            onChange={this.dummyDisplayError}
            floatingLabelText="Your name"
            style={{width: "100%", borderBottomColor: "0091EA"}} />
        </div>

        <div className="exampleBox">
          <h2>FieldDatetime</h2>
          <FieldDatetime 
            dateFormat="YYYY-MM-DDThh:mm:ss.uuuuuuZ"
            labelText="Date"
            iconColor="red"
            fieldStyle={{width: "100%"}} />
        </div>

        <div className="exampleBox">
          <h2>FieldPassword (Material UI)</h2>
          <mui.TextField
            name="password"
            type="password"
            floatingLabelText="Password" />
        </div>

        <div className="exampleBox">
          <h2>FieldReadonly</h2>
          <FieldReadonly field={someField}/>
        </div>

        <div className="exampleBox">
          <h2>FieldReadonly (material UI)</h2>
          <Field
            defaultValue="Your name - 5 chars only"
            disabled={true}
            style={{width: "100%"}} />
        </div>

        <div className="exampleBox">
          <h2>FieldSelect</h2>
          <FieldSelect field={fieldSelect}
             />
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

        


      </div>
    );
  }

});