import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

// import actions
// import { singleActions, listActions } from '../actions';

import * as __name__Actions from '../__name__Actions';

// import components
import __Proper__Form from './__Proper__Form.js.jsx';

class Create__Proper__ extends Base {
  constructor(props) {
    super(props);
    this.state = {
      item: JSON.parse(JSON.stringify(this.props.default__Proper__))
      //don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {

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
    this.props.dispatch(__name__Actions.sendCreate__Proper__(this.state.item)).then((action) => {
      // console.log("HANDLE SUBMIT");
      // console.log(action);
      if(action.success) {
        // this.props.dispatch(listActions.invaldiateList());
        browserHistory.push(`/__name__s/${action.item._id}`)
      } else {
        console.log("Response Error:");
        console.log(action.error);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { item } = this.state;
    const isEmpty = (item.title === null || item.title === undefined);
    return (
      <div>

        {isEmpty
          ? <h2> Loading...</h2>
        : <__Proper__Form
            __name__={item}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink="/__name__s"
            formTitle="Create __Proper__"
            />
        }
      </div>
    )
  }
}

Create__Proper__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  return {
    default__Proper__: store.__name__.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(Create__Proper__);
