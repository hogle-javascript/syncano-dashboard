var React      = require('react'),
    Radium     = require('radium'),

    ColorStore = require('../Color/ColorStore'),
    IconStore  = require('../Icon/IconStore'),

    mui        = require('material-ui'),
    FontIcon   = mui.FontIcon,
    Paper      = mui.Paper;


module.exports = Radium(React.createClass({

  displayName: 'ColorIconPicker',

  propTypes: {
    selectedColor: React.PropTypes.string,
    selectedIcon: React.PropTypes.string,
    pickerType: React.PropTypes.oneOf(['color', 'icon']),
    handleChange: React.PropTypes.func
  },

  getStyles: function() {
    return {
      container: {
        display        : 'flex',
        flexWrap       : 'wrap',
        justifyContent : 'center',
        height         : '100%',
        cursor         : 'pointer'
      },
      item : {
        margin         : 12,
        height         : 50,
        width          : 50,
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center'
      }
    }
  },

  getInitialState: function() {
    return {
      selectedColor: this.props.selectedColor,
      selectedIcon: this.props.selectedIcon
    }
  },

  componentWillReceiveProps: function (nextProps) {
    console.info('ColorIconPicker::componentWillReceiveProps');
    this.setState({
      selectedColor: nextProps.selectedColor,
      selectedIcon: nextProps.selectedIcon
    })
  },

  handleSetColor: function(event) {
    console.info('IconPicker::handleSetColor', event.target.id);
    event.preventDefault();
    this.setState({selectedColor: event.target.id});
    this.props.handleChange({'color': event.target.id});
  },

  handleSetIcon: function(event) {
    console.info('IconPicker::handleSetIcon', event.target.id);
    event.preventDefault();
    this.setState({selectedIcon: event.target.id});
    this.props.handleChange({'icon': event.target.id});
  },

  genIconItem: function(icon) {
    var style = this.getStyles().item,
        zDepth = 0,
        iconColor = '#000';

    if (icon === this.state.selectedIcon) {
      zDepth = 3;
      style.background= this.state.selectedColor;
      iconColor = '#fff';
    }

    return (
      <Paper
        zDepth = {zDepth}
        key    = {icon}
        circle = {true}
        style  = {style}>
          <FontIcon
            id        = {icon}
            className = {"synicon-" + icon}
            style     = {{color: iconColor}}
            onClick   = {this.handleSetIcon} />
      </Paper>
    )
  },

  genColorItem: function(color) {
    var icon,
        style = this.getStyles().item,
        zDepth = 0;

    style.background = color;

    if (color === this.state.selectedColor) {
      zDepth = 3;
      icon = <FontIcon
               className = {"synicon-" + this.state.selectedIcon}
               style     = {{color: 'white'}} />;
    }
    return (
      <Paper
        id      = {color}
        zDepth  = {zDepth}
        key     = {color}
        circle  = {true}
        style   = {style}
        onClick = {this.handleSetColor}>
          {icon}
      </Paper>
    );
  },

  render: function () {
    var items = null,
        styles = this.getStyles();

    if (this.props.pickerType === "color") {
      items = ColorStore.getColorPickerPalette().map(function (color) {
        return this.genColorItem(color)}.bind(this));
    } else {
      items = IconStore.getIconPickerIcons().map(function (icon) {
        return this.genIconItem(icon)}.bind(this));
    }

    return (
      <div style={styles.container}>
        {items}
      </div>
    );
  }
}));
