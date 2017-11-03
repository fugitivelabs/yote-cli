/**
 * Displays a single __name__ from the 'byId' map in the __name__ reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// import actions
import * as __name__Actions from '../__name__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import __camelName__ css modules
import __camelName__Styles from '../__camelName__ModuleStyles.css';


class Single__PascalName__ extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(__name__Actions.fetchSingleIfNeeded(match.params.__name__Id));
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

    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single __PascalName__ </h3>
            {isEmpty ?
              (__camelName__Store.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: __camelName__Store.isFetching ? 0.5 : 1 }}>
                <h1> { selected__PascalName__.name }
                  <Link className="yt-btn small u-pullRight" to={`${this.props.match.url}/update`}> UPDATE __allCaps__ </Link>
                </h1>
                <hr/>
                <p> <em>Other characteristics about the __PascalName__ would go here.</em></p>
              </div>
            }
          </div>
        </section>
      </div>
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
    __camelName__Store: store.__name__
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(Single__PascalName__)
);
