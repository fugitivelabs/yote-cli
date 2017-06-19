import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';

// import actions
import * as __name__Actions from '../__name__Actions';

// import components
import __Proper__Form from './__Proper__Form.js.jsx';

class Update__Proper__ extends Base {
  constructor(props) {
    super(props);
    const { selected, map } = this.props;
    this.state = {
      item: map[selected.id] ? JSON.parse(JSON.stringify(map[selected.id])) : {}      
      //we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentDidMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = false;
    // const populate = false;
    const { dispatch, params } = this.props;
    dispatch(__name__Actions.fetchSingle__Proper__ById(params.__name__Id))
  }

  componentWillReceiveProps(nextProps) {
    const { selected, map } = nextProps;
    this.state = {
      item: map[selected.id] ? JSON.parse(JSON.stringify(map[selected.id])) : {}
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
    this.props.dispatch(__name__Actions.sendUpdate__Proper__(this.state.item)).then((res) => {
      if(res.success) {
        this.props.dispatch(__name__Actions.invalidateList('all'));
        browserHistory.push(`/__name__s/${res.item._id}`)
      } else {
        console.log("Response Error:");
        console.log(res);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selected, map } = this.props;
    const { item } = this.state;
    const isEmpty = (item.title === null || item.title === undefined);
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
  return {
    selected: store.__name__.selected
    , map: store.__name__.map
  }
}

export default connect(
  mapStoreToProps
)(Update__Proper__);
