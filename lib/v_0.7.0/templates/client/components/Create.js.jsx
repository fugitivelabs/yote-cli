/**
 * Creates a new __name__ from a copy of the defaultItem in the __name__ reducer
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as __name__Actions from '../__name__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import __name__ components
import __Proper__Form from './__Proper__Form.js.jsx';

class Create__Proper__ extends Base {
  constructor(props) {
    super(props);
    this.state = {
      __name__: JSON.parse(JSON.stringify(this.props.default__Proper__))
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newState = _.update( this.state.__name__, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }


  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(__name__Actions.sendCreate__Proper__(this.state.__name__)).then((action) => {
      if(action.success) {
        this.props.dispatch(__name__Actions.invaldiateList());
        browserHistory.push(`/__name__s/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { __name__ } = this.state;
    const isEmpty = (__name__.title === null || __name__.title === undefined);
    return (
      <div>
        {isEmpty ?
          <h2> Loading...</h2>
          :
          <__Proper__Form
            __name__={__name__}
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
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    default__Proper__: store.__name__.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(Create__Proper__);
