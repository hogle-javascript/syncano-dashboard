import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import Helmet from 'react-helmet';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

// Components
import {RaisedButton} from 'syncano-material-ui';
import {Container, Loading} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ClassDialog from './ClassDialog';
import ClassesList from './ClassesList';

export default React.createClass({
  displayName: 'Classes',

  mixins: [
    State,
    Navigation,
    Reflux.connect(Store),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Classes::componentDidMount');
    Actions.fetch();
  },

  componentWillUpdate() {
    const {action, className} = this.getParams();
    const classObject = Store.getClassByName(className);

    if (action === 'edit' && classObject) {
      Actions.showDialog(classObject);
    }
  },

  render() {
    const {items, triggers, hideDialogs, isLoading} = this.state;
    const title = 'Classes';

    return (
      <div>
        <Helmet title={title} />
        <ClassDialog/>

        <InnerToolbar title={title}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </InnerToolbar>

        <Container>
          <Loading show={isLoading}>
            <ClassesList
              items={items}
              triggers={triggers}
              hideDialogs={hideDialogs} />
          </Loading>
        </Container>
      </div>
    );
  }
});
