import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

import * as __name__Actions from '../__name__Actions';

// import components
import __Proper__Form from './__Proper__Form.js.jsx';

class Update__Proper__ extends Base {
  constructor(props) {
    super(props);
    const { selected__Proper__, __name__Map } = this.props;
    this.state = {
      item: __name__Map[selected__Proper__.id] ? JSON.parse(JSON.stringify(__name__Map[selected__Proper__.id])) : {}      
      //we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    console.log("Single item mounting");
    const { dispatch, params } = this.props;
    dispatch(__name__Actions.fetchSingleIfNeeded(params.__name__Id))
  }

  componentWillReceiveProps(nextProps) {
    const { selected__Proper__, __name__Map } = nextProps;
    this.state = {
      item: __name__Map[selected__Proper__.id] ? JSON.parse(JSON.stringify(__name__Map[selected__Proper__.id])) : {}
      //we don't want to actually change the store's item, just use a copy
    }
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
    this.props.dispatch(__name__Actions.sendUpdate__Proper__(this.state.item)).then((action) => {
      console.log(action);
      if(action.success) {
        browserHistory.push(`/__name__s/${action.item._id}`)
      } else {
        console.log("Response Error:");
        console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selected__Proper__, __name__Map } = this.props;
    const { item } = this.state;
    const isEmpty = (!item || item.title === null || item.title === undefined);
    return  (
      <div >
        {isEmpty
          ? (selected__Proper__.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
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
  return {
    selected__Proper__: store.__name__.selected
    , __name__Map: store.__name__.byId
  }
}

export default connect(
  mapStoreToProps
)(Update__Proper__);
