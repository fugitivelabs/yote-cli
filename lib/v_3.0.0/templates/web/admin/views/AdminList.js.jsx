/**
 * View component for /admin/__kebabNamePlural__
 *
 * Generic __camelName__ list view. Defaults to 'all' with:
 * this.props.dispatch(__camelName__Actions.fetchListIfNeeded());
 *
 * NOTE: See /product/views/ProductList.js.jsx for more examples
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as __camelName__Actions from '../../__camelName__Actions';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../../global/components/navigation/Breadcrumbs.js.jsx';

// import resource components
import Admin__PascalName__Layout from '../components/Admin__PascalName__Layout.js.jsx';
import Admin__PascalName__ListItem from '../components/Admin__PascalName__ListItem.js.jsx';

class __PascalName__List extends Binder {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(__camelName__Actions.fetchListIfNeeded('all')); // defaults to 'all'
  }

  render() {
    const { location, __camelName__Store } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the __camelName__List meta info here so we can reference 'isFetching'
    const __camelName__List = __camelName__Store.util.getListInfo("all");

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual __camelName__ objetcs
     */
    const __camelName__ListItems = __camelName__Store.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = (
      !__camelName__ListItems
      || !__camelName__List
    );

    const isFetching = (
      !__camelName__ListItems
      || !__camelName__List
      || __camelName__List.isFetching
    )

    return (
      <Admin__PascalName__Layout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        <h1> __startName__ List </h1>
        <hr/>
        <br/>
        { isEmpty ?
          (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          :
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div className="admin-table-wrapper">
              <Link to={'/admin/__kebabNamePlural__/new'}> New __startName__</Link>
              <table className="yt-table striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Last modified</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {__camelName__ListItems.map((__camelName__, i) =>
                    <Admin__PascalName__ListItem key={__camelName__._id + i} __camelName__={__camelName__} />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        }
      </Admin__PascalName__Layout>
    )
  }
}

__PascalName__List.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
   * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
   * differentiated from the React component's internal state
   */

  // manipulate store items here

  return {
    __camelName__Store: store.__camelName__
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(__PascalName__List)
);
