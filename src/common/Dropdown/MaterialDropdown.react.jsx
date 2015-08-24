import React from 'react';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outsideclickhandler';

import MaterialDropdownItem from './MaterialDropdownItem.react';
import DropdownNotifiItem from './DropdownNotifiItem.react';

import './Dropdown.sass';

export default React.createClass({

  displayName: 'MaterialDropdown',

  propTypes: {
    type: React.PropTypes.string,
    icon: React.PropTypes.string,
    items: React.PropTypes.array,
    headerContent: React.PropTypes.shape({
      userFullName: React.PropTypes.string,
      userEmail: React.PropTypes.string,
      // if "clickable" props is defined as false or
      handleItemClick: React.PropTypes.func,
      // is not defined function will not be triggered
      clickable: React.PropTypes.bool
    }),
    iconStyle: React.PropTypes.object,
    isLoading: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      icon: 'dots-vertical',
      iconStyle: {
        width: '18px',
        height: '18px',
        fill: '#FFF'
      },
      type: 'normal-link',
      clickable: true
    }
  },

  getInitialState() {
    return {
      isOpen: false
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  toggleOpenClose() {
    this.setState({
      isOpen: (!this.state.isOpen && this.props.clickable)
    }, function() {
      if (this.state.isOpen && this.props.handleOnClick) {
        this.props.handleOnClick()
      }
    });
  },

  close() {
    this.setState({isOpen: false});
  },

  renderItems() {
    if (this.props.type === 'notification') {
      return (
        <DropdownNotifiItem
          items={this.props.items}
          isLoading={this.props.isLoading}/>
      )
    }
    return (
      <MaterialDropdownItem
        items={this.props.items}
        headerContent={this.props.headerContent}/>
    )
  },

  render() {
    let cssClasses = classNames({
      'dropdown-menu': true,
      'dropdown-menu-visible': this.state.isOpen
    });

    return (
      <OutsideClickHandler onOutsideClick={this.close}>
        <div className="dropdown">
          <div
            className="dropdown-button clickable"
            onClick={this.toggleOpenClose}>
            {this.props.children}
          </div>
          <div className={cssClasses}>
            <div className="dropdown-menu-section">
              {this.renderItems()}
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }
});
