import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import { singleActions } from '../actions';

class Single__Proper__ extends Base {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // console.log("Single item mounting");
    const { dispatch, params } = this.props;
    dispatch(singleActions.fetchSingle__Proper__ById(params.__name__Id, true ))
  }

  render() {
    const { item } = this.props;
    const isEmpty = !item;
    console.log("isEmpty", isEmpty);
    return  (
      <div className="yt-container">
        <h3> Single __Proper__ Item </h3>
        {isEmpty
          ? (item.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: item.isFetching ? 0.5 : 1 }}>

              <h1> { item.title }
                <Link className="yt-btn small u-pullRight" to={`/__name__s/${item._id}/update`}> Update __Proper__ </Link>
              </h1>
              <hr/>
              <p> {item.description }</p>
            </div>
          }
      </div>
    )
  }
}

Single__Proper__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    item: store.__name__.single.item
  }
}

export default connect(
  mapStoreToProps
)(Single__Proper__);
