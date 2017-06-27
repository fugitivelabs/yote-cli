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
import __PascalName__Form from './__PascalName__Form.js.jsx';

class Create__PascalName__ extends Base {
  constructor(props) {
    super(props);
    this.state = {
      __name__: JSON.parse(JSON.stringify(this.props.default__PascalName__))
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
    this.props.dispatch(__name__Actions.sendCreate__PascalName__(this.state.__name__)).then((action) => {
      if(action.success) {
        this.props.dispatch(__name__Actions.invalidateList());
        browserHistory.push(`/__kebabName__s/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { __name__ } = this.state;
    const isEmpty = (__name__.name === null || __name__.name === undefined);
    return (
      <div className="flex">
        <section className="section">
          {isEmpty ?
            <h2> Loading...</h2>
            :
            <__PascalName__Form
              __name__={__name__}
              cancelLink="/__kebabName__s"
              formTitle="Create __PascalName__"
              formType="create"
              handleFormChange={this._handleFormChange}
              handleFormSubmit={this._handleFormSubmit}
            />
          }
        </section>
      </div>
    )
  }
}

Create__PascalName__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    default__PascalName__: store.__name__.defaultItem
  }
}

export default connect(
  mapStoreToProps
)(Create__PascalName__);
