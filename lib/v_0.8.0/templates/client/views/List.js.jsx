/**
 * View component for /__kebabName__s
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
import * as __camelName__Actions from '../__camelName__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import __camelName__ components
import __PascalName__Layout from '../components/__PascalName__Layout.js.jsx';
import __PascalName__ListItem from '../components/__PascalName__ListItem.js.jsx';

// import __camelName__ css modules
import __camelName__Styles from '../__camelName__ModuleStyles.css';

class __PascalName__List extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(__camelName__Actions.fetchListIfNeeded()); // defaults to 'all'
  }

  render() {
    const { __camelName__Store } = this.props;

    /**
     * Retrieve the list information and the list items for the component here.
     *
     * NOTE: if the list is deeply nested and/or filtered, you'll want to handle
     * these steps within the mapStoreToProps method prior to delivering the
     * props to the component.  Othwerwise, the render() action gets convoluted
     * and potentially severely bogged down.
     */

    // get the __camelName__List meta info here so we can reference 'isFetching'
    const __camelName__List = __camelName__Store.lists ? __camelName__Store.lists.all : null;

    /**
     * use the reducer getList utility to convert the all.items array of ids
     * to the actual __camelName__ objetcs
     */
    const __camelName__ListItems = __camelName__Store.util.getList("all");

    /**
     * NOTE: isEmpty is is usefull when the component references more than one
     * resource list.
     */
    const isEmpty = !__camelName__ListItems || !__camelName__List;

    return (
      <__PascalName__Layout>
        <div className="flex">
          <section className="section">
            <div className="yt-container">
              <h1> __startName__ List
                <Link className="yt-btn small u-pullRight" to={'/__kebabName__s/new'}> NEW __startName__ </Link>
              </h1>
              <hr/>
              { isEmpty ?
                (__camelName__ListItems && __camelName__List.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                :
                <div style={{ opacity: __camelName__List.isFetching ? 0.5 : 1 }}>
                  <ul>
                    {__camelName__ListItems.map((__camelName__, i) =>
                      <__PascalName__ListItem key={__camelName__.id + i} __camelName__={__camelName__} />
                    )}
                  </ul>
                </div>
              }
            </div>
          </section>
        </div>
      </__PascalName__Layout>
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
  return {
    __camelName__Store: store.__camelName__
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(__PascalName__List)
);
