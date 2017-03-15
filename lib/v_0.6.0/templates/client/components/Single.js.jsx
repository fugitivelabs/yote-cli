import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import * as __name__Actions from '../__name__Actions';


class Single__Proper__ extends Base {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    // console.log("Single item mounting");
    const { dispatch, params } = this.props;
    dispatch(__name__Actions.fetchSingleIfNeeded(params.__name__Id))
  }

  render() {
    const { selected, map } = this.props;
    const isEmpty = (!selected.id || !map[selected.id] || map[selected.id].title === undefined);
    console.log("isEmpty", isEmpty);
    return  (
      <div className="flex ">
        <section className="section ">
          <div className="yt-container">
            <h3> Single __Proper__ Item </h3>
            {isEmpty
              ? (selected.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div style={{ opacity: selected.isFetching ? 0.5 : 1 }}>

                  <h1> { map[selected.id].title }
                    <Link className="yt-btn small u-pullRight" to={`/__name__s/${map[selected.id]._id}/update`}> Update __Proper__ </Link>
                  </h1>
                  <hr/>
                  <p> {map[selected.id].description }</p>
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
  return {
    selected: store.__name__.selected
    , map: store.__name__.map
  }
}

export default connect(
  mapStoreToProps
)(Single__Proper__);
