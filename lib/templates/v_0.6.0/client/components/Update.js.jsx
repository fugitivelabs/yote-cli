import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import _ from 'lodash';

// import actions
import { singleActions } from '../actions';

// import components
import __Proper__Form from './__Proper__Form.js.jsx';

class Update__Proper__ extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = false;
    // const populate = false;
    const { dispatch, params } = this.props;
    if(params.__name__Id) {
      dispatch(singleActions.fetchSingle__Proper__ById(params.__name__Id, populate ))
    } else {
      dispatch(singleActions.fetchSingle__Proper__BySlug(params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }


  _handleFormChange(e) {
    var newState = _.update( this.state.item, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }


  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendUpdate__Proper__(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
        : <__Proper__Form
            __name__={item}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/__name__s/${item._id}`}
            formTitle="Update __Proper__"
          />
        }
      </div>
    )
  }
}

Update__Proper__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  // console.log("State");
  // console.log(state);
  return {
    item: store.__name__.single.item
  }
}

export default connect(
  mapStoreToProps
)(Update__Proper__);
