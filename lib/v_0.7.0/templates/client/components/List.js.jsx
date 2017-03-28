/**
 * Generic __name__ list view. Defaults to 'all' with:
 * this.props.dispatch(__name__Actions.fetchListIfNeeded());
 *
 * NOTE: See ProductList.js.jsx for more examples
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as __name__Actions from '../__name__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import __name__ components
import __Proper__ListItem from './__Proper__ListItem.js.jsx';

class __Proper__List extends Base {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // fetch a list of your choice
    this.props.dispatch(__name__Actions.fetchListIfNeeded()); // defaults to 'all'
  }

  render() {
    const { __name__List, __name__Map } = this.props;

    /**
     * NOTE: Regarding isEmpty, when the app loads, all "__name__ lists"
     * are null objects. Lists exist in memory and only after we deliberately
     * create them.
     */
    const isEmpty = !__name__List || !__name__List.items || __name__List.items.length === 0 || __name__List.didInvalidate;

    return (
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h1> __Proper__ List
              <Link className="yt-btn small u-pullRight" to={'/__name__s/new'}> NEW __allCaps__ </Link>
            </h1>
            <hr/>
            { isEmpty ?
              (__name__List && __name__List.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <div style={{ opacity: __name__List.isFetching ? 0.5 : 1 }}>
                <ul>
                  {__name__List.items.map((id, i) =>
                    <__Proper__ListItem key={id} __name__={__name__Map[id]} />
                  )}
                </ul>
              </div>
            }
          </div>
        </section>
      </div>
    )
  }
}

__Proper__List.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    __name__List: store.__name__.lists.all
    , __name__Map: store.__name__.byId
  }
}

export default connect(
  mapStoreToProps
)(__Proper__List);
