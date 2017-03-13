import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
// import * as listActions from '../actions/__name__ListActions';
// import { listActions as __name__ListActions } from '../actions';
import * as __name__Actions from '../__name__Actions';

// import components
import __Proper__ListItem from './__Proper__ListItem.js.jsx';

class __Proper__List extends Base {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // console.log("list mounting");
    this.props.dispatch(__name__Actions.fetchListIfNeeded());
    //MORE LIST EXAMPLES
    // this.props.dispatch(__name__Actions.fetchListIfNeeded("all"));
    // this.props.dispatch(__name__Actions.fetchListIfNeeded()).then((data) => {
    //   console.log("DATA", data);
    // });
    // this.props.dispatch(__name__Actions.fetchListIfNeeded("workout"));
    // this.props.dispatch(__name__Actions.fetchListIfNeeded("section", "1234"));
    // this.props.dispatch(__name__Actions.fetchList("section", "3456", "78910")).then(() => {
    //   this.props.dispatch(__name__Actions.invaldiateList("section", "3456", "78910"));
    // });
    // this.props.dispatch(__name__Actions.setFilter({test: 2}));
    // this.props.dispatch(__name__Actions.setFilter({test: 2}, "section", "1234"));
    // this.props.dispatch(__name__Actions.setPagination({test: 1}, "section", "1234"));
  }

  render() {
    const { __name__List, __name__Map } = this.props;
    //note the new isEmpty. when the app loads, all "__name__ lists" are null objects; they exist only after we created them
    const isEmpty = !__name__List || __name__List.items.length === 0 || __name__List.didInvalidate;
    console.log("isEmpty", isEmpty);
    return(
      <div className="flex">
        <section className="section">
          <div className="yt-container">
            <h1> __Proper__ List
              <Link className="yt-btn small u-pullRight" to={'/__name__s/new'}> NEW __allCaps__ </Link>
            </h1>
            <hr/>
            { isEmpty
              ? (__name__List && __name__List.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              : <div style={{ opacity: __name__List.isFetching ? 0.5 : 1 }}>
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
  return {
    __name__List: store.__name__.lists.all
    , __name__Map: store.__name__.byId
  }
}

export default connect(
  mapStoreToProps
)(__Proper__List);
