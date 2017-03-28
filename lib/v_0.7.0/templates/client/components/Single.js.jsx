/**
 * Displays a single __name__ from the 'byId' map in the __name__ reducer
 * as defined by the 'selected' property
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as __name__Actions from '../__name__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

class Single__Proper__ extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(__name__Actions.fetchSingleIfNeeded(params.__name__Id));
  }

  render() {
    const { selected__Proper__, __name__Map } = this.props;
    const isEmpty = (!selected__Proper__.id || !__name__Map[selected__Proper__.id] || __name__Map[selected__Proper__.id].title === undefined || selected__Proper__.didInvalidate);
    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h3> Single __Proper__ </h3>
            {isEmpty ?
              (selected__Proper__.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: selected__Proper__.isFetching ? 0.5 : 1 }}>
                <h1> { __name__Map[selected__Proper__.id].title }
                  <Link className="yt-btn small u-pullRight" to={`/__name__s/${__name__Map[selected__Proper__.id]._id}/update`}> UPDATE PRODUCT </Link>
                </h1>
                <hr/>
                <p> {__name__Map[selected__Proper__.id].description }</p>
              </div>
            }
          </div>
        </section>
      </div>
    )
  }
}

Single__Proper__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    selected__Proper__: store.__name__.selected
    , __name__Map: store.__name__.byId
  }
}

export default connect(
  mapStoreToProps
)(Single__Proper__);
