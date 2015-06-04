var React         = require('react'),
    Reflux        = require('reflux'),
    classNames    = require('classnames'),
    Router        = require('react-router'),
    Link          = Router.Link,
    mui           = require('material-ui'),
    Tabs          = mui.Tabs,
    Tab           = mui.Tab,
    MaterialIcon  = require('../../common/Icon/MaterialIcon.react'),
    HeaderActions = require('./HeaderActions'),
    HeaderStore   = require('./HeaderStore');


require('./Header.css');


module.exports = React.createClass({

  displayName: 'Header',
  mixins: [Reflux.connect(HeaderStore)],

  contextTypes: {
      router: React.PropTypes.func.isRequired
  },

  render: function () {

    return (
      <div className="row header">
      xxxx
      </div>
    )
  }

});