import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
// import * as listActions from '../actions/__name__ListActions';
import { listActions as __name__ListActions } from '../actions';

// import components
import __Proper__ListItem from './__Proper__ListItem.js.jsx';

class __Proper__List extends Base {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // console.log("list mounting");
    this.props.dispatch(__name__ListActions.fetchListIfNeeded());
  }

  render() {
    const { list } = this.props;
    const isEmpty = list.items.length === 0;
    return(
      <div className="flex ">
        <section className="section ">
          <div className="yt-container">
            <h1> __Proper__ List
              <Link className="yt-btn small u-pullRight" to={'/__name__s/new'}> New __Proper__ </Link>
            </h1>
            <hr/>
            {isEmpty
              ? (list.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: list.isFetching ? 0.5 : 1 }}>
                  <ul>
                    {Object.keys(list.itemMap).map((id, i) =>
                      <__Proper__ListItem key={i} __name__={list.itemMap[id]} />
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
  return {
    list: store.__name__.list
  }
}

export default connect(
  mapStoreToProps
)(__Proper__List);
