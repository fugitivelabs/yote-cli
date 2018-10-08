/**
 * View component for /admin/__kebabNamePlural__/:__camelName__Id/update
 *
 * Updates a single __camelName__ from a copy of the selcted __camelName__
 * as defined in the __camelName__ reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as __camelName__Actions from '../../__camelName__Actions';

// import global components
import Binder from '../../../../global/Binder.js.jsx';
import Breadcrumbs from '../../../../global/navigation/Breadcrumbs.js.jsx';

// import module components
import Admin__PascalName__Form from '../components/Admin__PascalName__Form.js.jsx';
import Admin__PascalName__Layout from '../components/Admin__PascalName__Layout.js.jsx';

class AdminUpdate__PascalName__ extends Binder {
  constructor(props) {
    super(props);
    const { match, __camelName__Store } = this.props;
    this.state = {
      __camelName__: __camelName__Store.byId[match.params.__camelName__Id] ?  _.cloneDeep(__camelName__Store.byId[match.params.__camelName__Id]) : {}
      // NOTE: ^ we don't want to change the store, just make changes to a copy
      , formHelpers: {}
      /**
       * NOTE: formHelpers are useful for things like radio controls and other
       * things that manipulate the form, but don't directly effect the state of
       * the __camelName__
       */
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(__camelName__Actions.fetchSingleIfNeeded(match.params.__camelName__Id))
  }

  componentWillReceiveProps(nextProps) {
    const { match, __camelName__Store } = nextProps;
    this.setState({
      __camelName__: __camelName__Store.byId[match.params.__camelName__Id] ?  _.cloneDeep(__camelName__Store.byId[match.params.__camelName__Id]) : {}
      // NOTE: ^ we don't want to actually change the store's __camelName__, just use a copy
    })
  }

  _handleFormChange(e) {
    let newState = _.update(this.state, e.target.name, () => {
      return e.target.value;
    });
    this.setState({newState});
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(__camelName__Actions.sendUpdate__PascalName__(this.state.__camelName__)).then(__camelName__Res => {
      if(__camelName__Res.success) {
        history.push(`/admin/__kebabNamePlural__/${__camelName__Res.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const {
      location
      , match
      , __camelName__Store
    } = this.props;
    const { __camelName__, formHelpers } = this.state;

    const selected__PascalName__ = __camelName__Store.selected.getItem();

    const isEmpty = (
      !__camelName__
      || !__camelName__._id
    );

    const isFetching = (
      !__camelName__Store.selected.id
      || __camelName__Store.selected.isFetching
    )

    return  (
      <Admin__PascalName__Layout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <Admin__PascalName__Form
            __camelName__={__camelName__}
            cancelLink={`/admin/__kebabNamePlural__/${__camelName__._id}`}
            formHelpers={formHelpers}
            formTitle="Update __startName__"
            formType="update"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </Admin__PascalName__Layout>
    )
  }
}

AdminUpdate__PascalName__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */

  return {
    __camelName__Store: store.__camelName__
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(AdminUpdate__PascalName__)
);
