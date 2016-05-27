import React from 'react';
import {withRouter} from 'react-router';
import {DropDownMenu} from 'material-ui';

const InnerToolbarDropdown = React.createClass({
  displayName: 'InnerToolbarDropdown',

  contextTypes: {
    routes: React.PropTypes.array,
    params: React.PropTypes.object
  },

  getActiveItem() {
    const {routes} = this.context;

    const lastItem = routes[routes.length - 1].name;
    const notLastItem = routes[routes.length - 2].name;

    return lastItem ? lastItem : notLastItem;
  },

  render() {
    const {children, router} = this.props;
    const {params} = this.context;

    return (
      <DropDownMenu
        value={this.getActiveItem()}
        labelStyle={{fontSize: 20, color: 'rgba(0, 0, 0, 0.4)'}}
        iconStyle={{fill: 'rgba(0, 0, 0, 0.4)'}}
        onChange={(event, index, value) => router.push({name: value, params})}
        underlineStyle={{display: 'none'}}>
        {children}
      </DropDownMenu>
    );
  }
});

export default withRouter(InnerToolbarDropdown);
