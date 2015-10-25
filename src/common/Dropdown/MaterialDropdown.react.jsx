import React from 'react';
import classNames from 'classnames';

import MaterialDropdownItem from './MaterialDropdownItem.react';
import DropdownNotifiItem from './DropdownNotifiItem.react';

import './Dropdown.sass';

export default React.createClass({

  displayName: 'MaterialDropdown',

  propTypes: {
    type: React.PropTypes.string,
    icon: React.PropTypes.string,
    items: React.PropTypes.array,
    isOpen: React.PropTypes.bool,
    headerContent: React.PropTypes.shape({
      userFullName: React.PropTypes.string,
      userEmail: React.PropTypes.string,
      handleItemClick: React.PropTypes.func,
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
    };
  },

  getInitialState() {
    return {
      isOpen: this.props.isOpen
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  toggleOpenClose() {
    this.setState({
      isOpen: (!this.state.isOpen && this.props.clickable)
    }, () => {
      if (this.state.isOpen && this.props.handleOnClick) {
        this.props.handleOnClick();
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
      );
    }
    return (
      <MaterialDropdownItem
        items={this.props.items}
        headerContent={this.props.headerContent}/>
    );
  },

  render() {
    let cssClasses = classNames({
      'dropdown-menu': true,
      'dropdown-menu-visible': this.state.isOpen
    });

    return (
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
    );
  }
});
