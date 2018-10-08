/**
 * View component for /__kebabNamePlural__/:__camelName__Id
 *
 * Displays a single __camelName__ from the 'byId' map in the __camelName__ reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as __camelName__Actions from '../__camelName__Actions';

// import global components
import Binder from '../../../global/Binder.js.jsx';

// import __camelName__ components
import __PascalName__Layout from '../components/__PascalName__Layout.js.jsx';


class Single__PascalName__ extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(__camelName__Actions.fetchSingleIfNeeded(match.params.__camelName__Id));
  }

  render() {
    const { __camelName__Store } = this.props;

    /**
     * use the selected.getItem() utility to pull the actual __camelName__ object from the map
     */
    const selected__PascalName__ = __camelName__Store.selected.getItem();

    const isEmpty = (
      !selected__PascalName__
      || !selected__PascalName__._id
      || __camelName__Store.selected.didInvalidate
    );

    const isFetching = (
      __camelName__Store.selected.isFetching
    )

    return (
      <__PascalName__Layout>
        <h3> Single __startName__ </h3>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <h1> { selected__PascalName__.name }
            </h1>
            <hr/>
            <p> <em>Other characteristics about the __PascalName__ would go here.</em></p>
            <br/>
            <Link to={`${this.props.match.url}/update`}> Update __startName__ </Link>
          </div>
        }
      </__PascalName__Layout>
    )
  }
}

Single__PascalName__.propTypes = {
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
  )(Single__PascalName__)
);
