import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { singleActions } from '../actions';


// import components
import __Proper__Form from './__Proper__Form.js.jsx';

class Create__Proper__ extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(singleActions.setupNew__Proper__())
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    // console.log("NExt PROPs");
    // console.log(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
    }
  }

  _handleFormChange(e) {
    // console.log("_handleFormChange");
    // console.log(e);
    var new__Proper__State = this.state.item;
    new__Proper__State[e.target.name] = e.target.value;
    this.setState(new__Proper__State);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendCreate__Proper__(this.state.item));
  }

  render() {
    const { item } = this.state;
    const isEmpty = !item;
    return  (
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
  // console.log("State");
  // console.log(state);
  return {
    item: store.__name__.single.item
    , status: store.__name__.single.status
  }
}

export default connect(
  mapStoreToProps
)(Create__Proper__);
